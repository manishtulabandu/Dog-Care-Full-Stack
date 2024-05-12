import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'

import Header from './TopHeader/Header';

import "./ContactCard.css"
import ContactCard from './ContactCard';
function Contact(props) {
 
    const {product,setProduct,cartItems,addItemToCart,showCart,setShowCart,setBlog}=props
    
    const addToCart = (product) => {
      addItemToCart([...cartItems, product]);
    };
   
  return (
    
    <div className='Contact-bgm' >        <Header cartItems={cartItems} addItemToCart={addItemToCart} product={product} setProduct={setProduct} setShowCart={setShowCart} showCart={showCart}/>
      <ContactCard/>
    </div>
  );
}
export default Contact;