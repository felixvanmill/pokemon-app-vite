import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PagesStyles/ItemsPage.css';

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [minCost, setMinCost] = useState('');
    const [maxCost, setMaxCost] = useState('');
    const [sortedField, setSortedField] = useState(null);
    const [isAscending, setIsAscending] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axios.get('https://pokeapi.co/api/v2/item?limit=500');
                const itemsWithDetails = await Promise.all(data.results.map(async (item) => {
                    const itemDetails = await axios.get(item.url);
                    return {
                        id: item.name,
                        name: item.name,
                        category: itemDetails.data.category?.name || 'Unknown',
                        price: itemDetails.data.cost || 'N/A',
                        effect: itemDetails.data.effect_entries?.[0]?.effect || 'No effect',
                        sprite: itemDetails.data.sprites?.default || ''
                    };
                }));
                setItems(itemsWithDetails);
                setLoading(false);
            } catch (err) {
                setError(`Failed to fetch items: ${err.message}`);
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleSort = (field) => {
        const sortedItems = [...items].sort((a, b) => {
            if (a[field] < b[field]) return isAscending ? -1 : 1;
            if (a[field] > b[field]) return isAscending ? 1 : -1;
            return 0;
        });
        setItems(sortedItems);
        setSortedField(field);
        setIsAscending(!isAscending);
    };

    const uniqueCategories = [...new Set(items.map(item => item.category))];

    const filteredItems = items.filter(item =>
        (categoryFilter ? item.category === categoryFilter : true) &&
        (searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
        (minCost ? item.price >= minCost : true) &&
        (maxCost ? item.price <= maxCost : true)
    );

    const paginatedItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="outer-container">
            <div className="filter-panel">
                <div>
                    <label>Search</label>
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div>
                    <label>Category</label>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="">All</option>
                        {uniqueCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Min Cost</label>
                    <input type="number" value={minCost} onChange={(e) => setMinCost(e.target.value)} />
                </div>
                <div>
                    <label>Max Cost</label>
                    <input type="number" value={maxCost} onChange={(e) => setMaxCost(e.target.value)} />
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th onClick={() => handleSort('name')}>Item Name</th>
                        <th onClick={() => handleSort('category')}>Category</th>
                        <th onClick={() => handleSort('price')}>Price</th>
                        <th>Effect</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedItems.map(item => (
                        <tr key={item.id}>
                            <td><img src={item.sprite} alt={item.name} style={{ width: '40px', height: '40px' }} /></td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td title={item.effect}>{item.effect}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {Math.ceil(filteredItems.length / pageSize)}</span>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredItems.length / pageSize)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default ItemsPage;
