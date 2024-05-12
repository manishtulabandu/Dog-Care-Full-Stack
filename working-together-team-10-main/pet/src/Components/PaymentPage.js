import { InputText } from "primereact/inputtext";
import "./PaymentPage.css";
import React,{useState,useRef,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import '../App.css';
import '../index.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from "./TopHeader/Header";
import Stripe from "react-stripe-checkout";
import axios from 'axios';
import {projectUrl} from "./configure";

function PaymentPage(props) {
    const {User ,page,cartItems,changePage,addItemToCart,product,showCart,setShowCart,setProduct}=props;
    const toast = useRef(null);
    const navigate=useNavigate();
  const [quantity, setQuantity] = useState(1);
  const handleClick = () => {
    changePage("home");
    navigate('/home');
    };
    const [data,setData]=useState();
    const fetchStartUpData = async () => {
      try {
        // const response = await fetch('http://localhost:8080/api/totalFund/'+sData.email);
        // const data = await response.text();
        // setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    useEffect(() => {
  
      fetchStartUpData();
     
    }, []);
    const [CheckOut, setCheckOut] = useState(false);

  const handleStartUp = () => {
    navigate('/startUps');
  };
  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [purchaseBrand, setPurchaseBrand] = useState("");

  const [paymentStatus, setPaymentStatus] = useState(null);


  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }
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

  const handleCheckout=async ()=> {
    // Simulate a checkout process
    const purchasePrice = totalPrice;

    setPurchaseAmount(purchasePrice);

    try {
      const response = await fetch(`${projectUrl}`+'/api/user/payment?userEmail='+User+'&productId=1&bits='+quantity+'&amount='+totalPrice,{
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          
        });
        console.log(response);
       
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const json = await response.json();
         
          console.log(json);
          if (json.message=="success") {
            setPaymentStatus("success")
            alert(
              `Payment Successful!`
            );
            addItemToCart([]);
            navigate("/"+page);
          } else {
             alert("Payment Failed :(");
            setPaymentStatus("failure")
          }

         
        } 
    } catch (error) {
      console.error(error);
    }

    
  }
  const footerScroll=()=>{
    window.scrollTo({
      top:document.body.scrollHeight,
      behavior:"smooth"
    });
  }
  const handleSuccess=()=>{
    setPaymentStatus(null)
    navigate("/ihome")
  }

  async function handleToken(token) {
    setPaymentStatus("loading");
    console.log(token);
    await axios.post(`${projectUrl}`+"/api/payment/charge", "", {         headers: {
      token: token.id,
      amount:totalPrice,
    },}).then((data) => {
      console.log(data);
      if(data.data.amount==null){
        setPaymentStatus("failure");
      }
      else{
      handleCheckout();
      }
       }).catch((error) => {
        setPaymentStatus("failure");
       });
    }
  return (
    <div >
              <Header cartItems={cartItems} addItemToCart={addItemToCart} product={product} setProduct={setProduct} setShowCart={setShowCart} showCart={showCart}/>


  <Modal show={paymentStatus === 'success'} onHide={() => setPaymentStatus(null)} centered>
  <Modal.Body className="text-center">
    <img src="https://www.clipartmax.com/png/small/270-2707415_confirm-icon-payment-success.png" alt="Success" width="50" height="50" style={{borderRadius:"60%"}}/>
    <h5 className="mt-2">Payment Successful</h5>
    <p>Your payment was successful. Thank you for your Funding!</p>
    <button className="btn btn-primary" onClick={handleSuccess}>
      Close
    </button>
  </Modal.Body>
</Modal>
<Modal show={paymentStatus === 'loading'} onHide={() => setPaymentStatus(null)} centered>
  <Modal.Body className="text-center">
  <i className="pi pi-spin pi-sync" style={{ fontSize: '3rem',color:'lightGrey' }} ></i>    <h5 className="mt-2">Transaction in progress</h5>
    <p>Please do not close this window</p>
    <button className="btn btn-primary" onClick={handleSuccess} disabled={true}>
      Close
    </button>
  </Modal.Body>
</Modal>

<Modal show={paymentStatus === 'failure'} onHide={() => setPaymentStatus(null)} centered>
  <Modal.Body className="text-center">
    <img src="https://www.clipartmax.com/png/middle/100-1005122_cancelled-close-delete-exit-no-reject-wrong-icon-red-cross-no-entry.png" alt="Failure" width="50" height="50" style={{borderRadius:"50%"}} />
    <h5 className="mt-2">Payment Failed</h5>
    <p>Payment Failed! Try Again...</p>
    <button className="btn btn-primary" onClick={() => setPaymentStatus(null)}>
      Close
    </button>
  </Modal.Body>
</Modal>
<div className="background-image">

  <div className="auth-wrapper" >
      
      <div className="auth-inner" style={{justifyContent:"center"}}>
        <center>
      <h1 className="payment-title">Proceed with Payment</h1>
        <div className="form-group">
          <label className="form-label" htmlFor="total-amount">
            Total Amount:
          </label>
          <p className="form-text" id="total-amount">
            ${totalPrice}
          </p>
        </div>
        <div style={{marginTop:'20px'}}>
        </div>
        <div className="app" disabled={true}>
<Stripe style={{width:"250px"}} className="btn btn-success"
stripeKey="pk_test_51P2HgzP7KyAd8hVFwb42EaKG7heRpSGLN9LCRsf3RuJkmJsl5Fc7SKiFNgu2oJUmjxbE0FA4DZArUjLHk72gYmLq00plK5P7ia"
token={handleToken}
label="Check Out"
description={`Total Amount: $${totalPrice}`}
image="https://svgshare.com/i/CUi.svg"

name="Payment Summary"
/>


</div>
<p style={{color:"gray",marginTop:"10px",fontSize:"10px"}}>*all types of cards accepted</p>
<img src="https://rapidlei.com/wp-content/uploads/2018/12/visa-mastercard-amex.png" style={{height:"30px",width:"200px"}}></img>
</center>
      </div>
     
    </div>
    </div>

    </div>
    
  );
}

export default PaymentPage;
