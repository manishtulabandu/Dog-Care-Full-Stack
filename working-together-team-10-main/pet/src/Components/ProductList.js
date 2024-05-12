import React from 'react';
import './ProductList.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react';

const ProductList = ({ products, addToCart,setProduct }) => {
    const [cart, setCart] = useState([]);
   
    const navigate=useNavigate();
    const handleProduct=(e)=>{
       setProduct(e);
       navigate('/Product');
    };
  return (
    <div>
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card" onClick={()=>handleProduct(product)}>
          <div style={{backgroundColor:'white'}}>
          <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="product-image1" />
          </div>
          <div className="product-details">
            <h2 className="product-name">{product.name.substring(0,25)}...</h2>
            <p className="product-description">{product.description.substring(0,50)}...</p>
            <p className="product-price">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProductList;
