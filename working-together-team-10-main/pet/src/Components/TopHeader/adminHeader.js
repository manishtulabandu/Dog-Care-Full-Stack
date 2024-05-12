import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavDropdown, Button, Modal } from 'react-bootstrap';
import logo from '../TopHeader/Dog-Logo.png';
import './Header.css';
import Login from "./Login";
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';
import Cart from '../Cart';
import MarqueeText from '../Marquee/marqueeText';

const AdminHeader = (props) => {
    const { cartItems, addItemToCart, showCart, setShowCart, User } = props;

    const navigate = useNavigate();

    const handleCart = () => {
        setShowCart(true);
    };

    const handleClose = () => {
        setShowCart(false);
    };

    const handleLogout = () => {
        // Perform logout actions here
        navigate('/');
    };

    return (
        <>
            <div className='marquee-header'>
                <MarqueeText />
            </div>

            <Navbar bg='dark' variant="dark" sticky='top'>
                <NavbarBrand>
                    <img src={logo} className='Logo-style' alt="Logo" />
                    Dog Care
                </NavbarBrand>
                <div className="ml-auto">
                    <Nav>
                        {User !== "" ? (
                            <>
                                <Nav.Link>Welcome to Admin page</Nav.Link>
                                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : null}
                    </Nav>
                </div>
            </Navbar>
        </>
    );
};

export default AdminHeader;