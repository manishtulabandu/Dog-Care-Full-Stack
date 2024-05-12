import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { DropdownButton } from 'react-bootstrap'
import { Dropdown } from 'bootstrap'
import {useState,useEffect} from 'react';
import logo from '../Components/TopHeader/Dog-Logo.png';
import c1 from '../images/c1.jpeg';
import c2 from '../images/c2.jpg';
import p1 from '../images/product-img/p1.webp';
import p2 from '../images/product-img/p2.png';
import p3 from '../images/product-img/p3.webp';
import p4 from '../images/product-img/p4.png';
import p5 from '../images/product-img/p5.webp';
import p6 from '../images/product-img/p6.png';
import p7 from '../images/product-img/p7.png';
import axios from 'axios';
import Header from './TopHeader/Header';
import ImageCarousel from './ImageCaurosel';
import ProductList from './ProductList';
import {projectUrl} from "./configure";
function Products(props) {
    const {product,setProduct,cartItems,addItemToCart,showCart,setShowCart,productCat}=props
      const [products, setProducts] = useState([]);

    const addToCart = (product) => {
      addItemToCart([...cartItems, product]);
    };
    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${projectUrl}`+'/category?keyword='+productCat);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
    // const products = [
    //   {
    //     id: 1,
    //     name: 'Hills Science Diet Adult Large Breed Dry Dog Food',
    //     description: 'Real chicken is the very first ingredient in this highly-digestible, flavorful recipe that’s scientifically formulated to provide complete and balanced nutrition.Natural sources of glucosamine and chondroitin support the development of healthy cartilage and joints.Clinically proven antioxidant blend including vitamins C and E supports strong immunity and overall good health.Omega-6 fatty acids and other added nutrients nourish the skin and promote a noticeably shiny coat.Made in Hill’s U.S. facilities using high-quality ingredients and no artificial colors, flavors or preservatives.',
    //     price: 46.99,
    //     image: p1,
    //     quantity:1
    //   },
    //   {     id: 2,
    //     name: 'Royal Canin Breed Health Nutrition Labrador Retriever Adult Dry Dog Food',
    //     description: 'Royal Canin Breed Health Nutrition Labrador Retriever Adult Dog Food Dry Formula designed for purebred Labrador retrievers 15 months and older.Specialized donut-shaped kibble is designed for a Labrador retriever’s fast eating habits.A precise amount of calories and fat in this dry dog food helps maintain your Lab at a healthy weight.Royal Canin dog food with EPA, DHA, and glucosamine helps support bone and joint health.Healthy dog food with exclusive nutrients helps support the skin barrier to maintain skin health and a beautiful coat.',
    //     price: 79.99,
    //     image: p2,
    //     quantity:1
    //   },
    //   {
    //     id: 3,
    //     name: 'Purina Pro Plan High Protein Shredded Blend Chicken & Rice Formula with Probiotics Dry Dog Food',
    //     description: 'Hard kibble combined with tender, shredded pieces for taste and texture dogs love.High protein formula, with real chicken as the first ingredient.Fortified with guaranteed live probiotics for digestive and immune health.Used to be known as SAVOR Shredded Blend Chicken and Rice Formula.Vitamin A and omega-6 fatty acids to nourish skin and coat.',
    //     price: 69.48,
    //     image: p3
    //   },
    //   {
    //     id: 4,
    //     name: 'Blue Buffalo Life Protection Formula Adult Chicken & Brown Rice Recipe Dry Dog Food',
    //     description: 'Essential, high-quality protein for healthy muscle development, and carbs for energy for an active life.Calcium, phosphorus and essential vitamins for strong bones and teeth.Glucosamine is added for joint health and mobility support.Vitamins, chelated minerals and antioxidants contribute to your pups immune system health.The packaging may vary, but each bag contains the same BLUE Life Protection Formula Adult Dry Dog Food your pal knows and loves.',
    //     price: 51.98,
    //     image: p4
    //   },
    //   {
    //     id: 5,
    //     name: 'Merrick Real Chicken + Sweet Potato Recipe Grain-Free Adult Dry Dog Food',
    //     description: 'This Merrick Grain Free recipe is specially formulated to help meet your adult dogs unique dietary needs.Real, deboned chicken is the first ingredient in this recipe—the grain-free kibble is made with real food ingredients to deliver balanced nutrition.Features a holistic blend of 57% protein and healthy fat ingredients to help maintain lean muscle mass and energy levels plus 43% produce, fiber, vitamins, minerals, and other natural ingredients.Delivers 81% of protein from animal sources and contains no artificial colors, flavors, or preservatives.Contains omega-3 and -6 fatty acids to nourish the skin and coat plus glucosamine and chondroitin for healthy hips and joints.',
    //     price: 72.98,
    //     image: p5
    //   },
    //   {
    //     id: 6,
    //     name: 'Nutro Ultra Large Breed High Protein Adult Dry Dog Food',
    //     description: 'Made with high-quality ingredients plus 14 superfoods for abundant flavor and gourmet nutrition.​Specially formulated to meet your large-breed dog’s unique nutritional needs.Real chicken is the number one ingredient to support strong muscles and a lean figure.Omega-3 and -6 fatty acids nourish your furbaby’s skin and coat.Natural sources of glucosamine and chondroitin promote healthy joints.',
    //     price: 89.98,
    //     image: p6
    //   },
    //   {
    //     id: 7,
    //     name: 'Wellness CORE Grain-Free Original Deboned Turkey, Turkey Meal & Chicken Meal Recipe Dry Dog Food',
    //     description: 'Specially formulated to be packed with protein to help optimize overall health.Fortified with omega fatty acids, antioxidants, glucosamine, probiotics, taurine, vitamins and minerals.Crafted using carefully chosen ingredients that include premium proteins, fruits and vegetables.Developed without any meat by-products, fillers, corn, soy, wheat-gluten or artificial preservatives, colors or flavors.Designed to encourage lean body mass and muscle tone, support a healthy coat and skin, and promote whole body health.',
    //     price: 10.99,
    //     image: p7
    //   }
     
    // ];
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
const images=[c1,c2];
  return (
    
    <div  >
        <Header cartItems={cartItems} addItemToCart={addItemToCart} product={product} setProduct={setProduct} setShowCart={setShowCart} showCart={showCart}/>
       <h1 style={{marginLeft:"20px"}}>Products</h1>
      <ProductList products={products} addToCart={addToCart} setProduct={setProduct} />
    </div>
  );
}
export default Products;