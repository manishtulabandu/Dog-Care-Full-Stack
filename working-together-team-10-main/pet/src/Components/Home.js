import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { DropdownButton } from 'react-bootstrap'
import { Dropdown } from 'bootstrap'
import {useState,useEffect} from 'react';
import logo from '../Components/TopHeader/Dog-Logo.png';
import c1 from '../images/c1.jpeg';
import dc1 from '../images/dc1.jpg'
import dc2 from '../images/dc2.jpg'
import c2 from '../images/c2.jpg';
import p1 from '../images/p1.webp';
import p2 from '../images/p2.webp';
import Header from './TopHeader/Header';
import ImageCarousel from './ImageCaurosel';
import ProductList from './ProductList';
import PetsGif from './PetsGifs/petsGif';
import Reviews from './Reviews/reviews';
import doghome from '../images/dog-home.png'
import wave from '../images/right-wave.png'
import '../Components/Home.css'
import cash from '../images/Cash.jpg'
import Footer from './Footer'


function Home(props) {
    const {product,setProduct,cartItems,addItemToCart,showCart,setShowCart,User}=props

    const addToCart = (product) => {
      addItemToCart([...cartItems, product]);
    };

    const products = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description of Product 1',
        price: 10.99,
        image: p1,
        quantity:2
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description of Product 2',
        price: 19.99,
        image: p2,
        quantity:3
      },
      {
        id: 1,
        name: 'Product 1',
        description: 'Description of Product 1',
        price: 10.99,
        image: p1
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description of Product 2',
        price: 19.99,
        image: p2
      },
      {
        id: 1,
        name: 'Product 1',
        description: 'Description of Product 1',
        price: 10.99,
        image: p1
      }
    ];
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
const images=[dc2,dc1];
  return (

    <div  >
        <Header User={User} cartItems={cartItems} addItemToCart={addItemToCart} product={product} setProduct={setProduct} setShowCart={setShowCart} showCart={showCart}/>
       <ImageCarousel images={images}  className='c-inner'/>
       <img src={doghome} style={{width:"100%"}}></img>

       <img src={cash} style={{width:"100%"}}/>
      <PetsGif/>
      <Reviews/>
      <Footer/>
    </div>
  );
}
export default Home;