import React, { useState } from 'react';
import './Cart.css'; 
import { BrowserRouter as Router, Routes, Route, Link ,useNavigate} from 'react-router-dom';


const Cart = ({ cartItems, handleCheckout , addItemToCart,handleClose}) => {
  const navigate=useNavigate();
const handleRoute = (e) => {
  handleClose();
  navigate(e);
};
    const handleIncreaseQuantity = (itemId) => {
      const updatedCartItems = cartItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
      addItemToCart(updatedCartItems);
    };
  
    const handleDecreaseQuantity = (itemId) => {
      const updatedCartItems = cartItems.map(item => {
        if (item.id === itemId && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }
        return item;
      });
      addItemToCart(updatedCartItems);
    };
  
    const handleDeleteItem = (itemId) => {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      addItemToCart(updatedCartItems);
    };
  
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  
    return (
        <div>
      <div className="cart-container">
        
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">Price: ${item.price}</p>
                <div className="cart-item-quantity-controls">
                  <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  <p className="cart-item-quantity">{item.quantity}</p>
                  <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                </div>
                <p className="cart-item-total">Total: ${item.price * item.quantity}</p>
              </div>
              <button onClick={() => handleDeleteItem(item.id)} className="delete-item-button">🗑</button>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <h3>Total: ${totalPrice}</h3>
        </div>
      </div>
      <div className="cart-header">
      <button onClick={()=>handleRoute("/payment")} className="checkout-button">Buy Now</button>
    </div>
    </div>
    );
};

export default Cart;
