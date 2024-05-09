import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/items.css';

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
                        price: itemDetails.data.cost || 'N/A',
                        effect: itemDetails.data.effect_entries?.[0]?.effect || 'No effect'
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
        { field: 'price', headerName: 'Price', width: 90, type: 'number' },
        {
            field: 'effect',
            headerName: 'Effect',
            flex: 1,  // This column will now flex to use available space
            renderCell: (params) => (
                <div title={params.value} style={{ whiteSpace: 'normal', lineHeight: 'normal', height: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {params.value}
                </div>
            )
        }
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
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
};

export default ItemsPage;
