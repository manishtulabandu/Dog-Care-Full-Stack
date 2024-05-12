import React from 'react';
import './BreedList.css';
import { BrowserRouter as Router, Routes, Route, Link ,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import "../images/Breeds-img/AustralianShepherd/Australian_Shepherd_1.jpeg";
import '@fortawesome/fontawesome-free/css/all.css'
import { Navbar, NavbarBrand, Nav, NavDropdown ,Button , Form, Modal} from 'react-bootstrap';

const BreedList = ({ Breeds,setBreed,setShowBreed,setProductCat}) => {
    const [cart, setCart] = useState([]);
    const navigate=useNavigate();
    const handleBreed=(e)=>{

      console.log(e);
       setBreed(e);
       setShowBreed(true);
    };
const handleRoute = (e) => {
  setProductCat(e.breed);
  navigate('/ProductList');
};
  return (
    <div>
    <div className="Breed-list">
      {Breeds.map(Breed => (
        <div key={Breed.id} className="Breed-card" >
          <img src={Breed.img} alt={Breed.name} className="Breed-image" />
          <center>
          <div className="Breed-details">
            <h1 className="Breed-name">{Breed.breed}</h1>
          </div>
          <button className='paw-btn'onClick={()=>handleBreed(Breed)} ><i className="fas fa-paw"></i> Information</button>

          <Nav.Link className='product-btn'onClick={()=>handleRoute(Breed)} style={{width:"70%"}}><i className="fas fa-box-open" ></i> Products</Nav.Link>
        </center>
        </div>

      ))}
    </div>
    </div>
  );
};

export default BreedList;
