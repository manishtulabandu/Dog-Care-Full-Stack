import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Modal, FormControl, Table } from 'react-bootstrap'; // Add Table to the imports
import { Scrollbars } from 'react-custom-scrollbars';
import Header from './TopHeader/Header';
import axios from 'axios'; // Import axios
import "./AdminPage.css"
import ImageUploader from './ImageUploader';
import ProductTable from './ProductTable';
import { Link } from 'react-router-dom';
import InventoryHeader from "./TopHeader/InventoryHeader";
import {projectUrl} from "./configure";

const InventoryManagement = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingName, setEditingName] = useState('');
    const [editingPrice, setEditingPrice] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${projectUrl}`+'/getInventoryManagmentProducts');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            if (image) {
                formData.append('file', image);
            }

            await axios.post(`${projectUrl}`+'/addInventoryManagmentProducts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            fetchProducts();
            setName('');
            setPrice('');
            setImage(null);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`${projectUrl}`+`/deleteInventoryManagment/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const updateProduct = (productId, productName, productPrice) => {
        setEditingProductId(productId);
        setEditingName(productName);
        setEditingPrice(productPrice);
    };

    const saveUpdatedProduct = async (productId) => {
        try {
            await axios.put(`${projectUrl}`+`/updateInventoryManagment/${productId}`, {
                name: editingName,
                price: editingPrice,
            });
            setEditingProductId(null);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <InventoryHeader />
            <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>Inventory Management</h1>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '0.5rem', marginRight: '1rem', flex: '1' }} />
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={{ padding: '0.5rem', marginRight: '1rem', width: '120px' }} />
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginRight: '1rem' }} />
                    <button onClick={addProduct} style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Product</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', width: '100%' }}>
                    {products.map((product) => (
                        <div key={product.id} style={{ width: 'calc(25% - 1rem)', border: '1px solid #ccc', borderRadius: '5px', padding: '1rem', position: 'relative' }}>
                            <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                            <div style={{ marginTop: '0.5rem' }}>
                                {editingProductId === product.id ? (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} style={{ padding: '0.5rem', marginBottom: '0.5rem' }} />
                                        <input type="number" value={editingPrice} onChange={(e) => setEditingPrice(e.target.value)} style={{ padding: '0.5rem', marginBottom: '0.5rem' }} />
                                        <button onClick={() => saveUpdatedProduct(product.id)} style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
                                    </div>
                                ) : (
                                    <>
                                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{product.name}</p>
                                        <p style={{ marginBottom: '0.5rem' }}>${product.price}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <button onClick={() => deleteProduct(product.id)} style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '0.5rem' }}>Delete</button>
                                            <button onClick={() => updateProduct(product.id, product.name, product.price)} style={{ padding: '0.5rem 1rem', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InventoryManagement;
