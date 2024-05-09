import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/items.css';  // Ensure this path is correct based on your project structure

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                        price: itemDetails.data.cost || 'N/A'
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

    const columns = [
        { field: 'name', headerName: 'Item Name', width: 150 },
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'price', headerName: 'Price', width: 90, type: 'number' }
    ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="datagrid-container">
            <DataGrid
                rows={items}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

export default ItemsPage;
