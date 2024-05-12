import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './TopHeader/Header';
import AdminHeader from "./TopHeader/adminHeader";
import {projectUrl} from "./configure";

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`${projectUrl}`+'/getInventoryManagmentProducts')
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="inventory-page" style={styles.container}>
            <AdminHeader />
            <div style={styles.content}>
                <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={styles.searchBar}
                />
                <ul style={styles.itemList}>
                    <li style={styles.listHeader}>
                        <span style={styles.heading}>Name</span>
                        <span style={styles.heading}>Price</span>
                    </li>
                    {filteredItems.map(item => (
                        <li key={item.id} style={styles.listItem}>
                            <span>{item.name}</span>
                            <span>${item.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    content: {
        flex: 1,
        padding: '20px',
    },
    searchBar: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        marginBottom: '20px',
    },
    itemList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
    },
    listHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        borderBottom: '1px solid #ccc',
        padding: '10px 0',
        width: '100%',
    },
    heading: {
        flexBasis: '50%',
        textAlign: 'center',
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ccc',
        padding: '10px 0',
        width: '100%',
    },
};

export default Inventory;
