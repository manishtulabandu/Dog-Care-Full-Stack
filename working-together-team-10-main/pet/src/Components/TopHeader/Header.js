import React, {useContext, useState} from 'react';
import { Navbar, NavbarBrand, Nav, NavDropdown ,Button , Form, Modal,InputGroup} from 'react-bootstrap';
import logo from '../TopHeader/Dog-Logo.png';
import './Header.css';
import Login from "./Login";
import Signup from './Signup';
import { BrowserRouter as Router, Routes, Route, Link ,useNavigate} from 'react-router-dom';
import Cart from '../Cart';
import '@fortawesome/fontawesome-free/css/all.css';
import Pawsonality from '../Pawsonality/Pawsonality';
import MarqueeText from '../Marquee/marqueeText';
const Header = (props) => {
  const {product,setProduct,cartItems,addItemToCart,showCart,setShowCart,User}=props;

  const navigate=useNavigate();
    //const { setAuthData } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
const handleRoute = (e) => {
  navigate(e);
};

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };


const handleCart=()=>{
    setShowCart(true);
}
const handleClose=()=>{
  setShowCart(false);
}
  return (
    <>
<div className='marquee-header' > 
<MarqueeText/>
</div>

      <Navbar bg='dark' variant="dark" sticky='top'>
        <NavbarBrand>
          <img src={logo} className='Logo-style' />
          Dog Care
        </NavbarBrand>
        <div class ="nav-content">
      
        <Nav>
          <Nav.Link onClick={()=>handleRoute('/home')}>HOME</Nav.Link>
          <Nav.Link onClick={()=>handleRoute('/breeds')}>BREEDS </Nav.Link>
          <Nav.Link onClick={()=>handleRoute('/Pawsonality')}>PAWSONALITY</Nav.Link>
          
          <Nav.Link onClick={()=>handleRoute('/Memorials')}>PET MEMORIALS</Nav.Link>
          
          <Nav.Link onClick={()=>handleRoute('/ImageClassification')}>RETRIEVE BREED</Nav.Link>
          <Nav.Link onClick={()=>handleRoute('/Wikipedia')}>SEARCH ENGINE</Nav.Link>
          <Nav.Link onClick={()=>handleRoute('/BlogPage')}>BLOGS</Nav.Link>
          <Nav.Link onClick={()=>handleRoute('/ContactUs')}>CONTACT US</Nav.Link>

         
          {/* <InputGroup >
        <Form.Control type="text" placeholder="Search"  />
        <InputGroup.Text id="basic-addon1"><i className="fas fa-search" /></InputGroup.Text>
      </InputGroup> */}
     
      <i className="fas fa-shopping-cart cart" onClick={handleCart}>Cart</i>
            {User !== "" ? (
                <Nav.Link onClick={() => {  handleRoute('/'); }}>
                    <b>Welcome, {User}</b>
                    <button onClick={handleLogout}>Logout</button>
                </Nav.Link>
            ) : null}

            <div className='logSign'>
          <Signup/> {""}
          <b style={{fontSize:'28px',marginLeft:"-15px"}}>/</b>
          <Login />
          </div>
        </Nav>
        <Modal show={showCart} onHide={handleClose} >
        <Modal.Header closeButton >
                    <Modal.Title>Pawsonality Cart</Modal.Title>
                </Modal.Header>
            <Cart cartItems={cartItems} addItemToCart={addItemToCart} handleClose={handleClose}/>
        </Modal>
        </div>

      </Navbar>
    </>
  );
}

export default Header;
