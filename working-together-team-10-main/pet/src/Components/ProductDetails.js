import React, { useState } from 'react';
import './ProductDetails.css'; 
import Header from './TopHeader/Header';
const ProductDetails = ({ product ,cartItems,addItemToCart,setProduct,showCart,setShowCart}) => {
  const samp=cartItems.filter(item => item.id == product.id);
  const [inCart,setCart]=useState((samp.length>0)?true :false);
  console.log(samp);
  const [quantity, setQuantity] = useState(1);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const handleLoadMoreReviews = () => {
    setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 3);
  };
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  
  const handleAddToCart = () => {
    setCart(true);
    addItemToCart([...cartItems, product]);
  };
  const reviews = [
    {username:"abc", rating:3, text:"value for money"},
    {username:"xyz",rating:5, text:"excellent"},
    {username:"abc", rating:3, text:"value for money"},
    {username:"xyz",rating:5, text:"excellent"},
    {username:"abc", rating:3, text:"value for money"},
    {username:"xyz",rating:5, text:"excellent"},
    
  ];
  
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const handleIncreaseQuantity = () => {
    console.log(quantity);
    if(quantity<product.quantity && quantity>=1)setQuantity(quantity+1); 
  };

  const handleDecreaseQuantity = () => {
    if(quantity>1)setQuantity(quantity-1);
};

const handleShowCart=()=>{
  setShowCart(true)
}
  return (
    <div>
      <Header cartItems={cartItems} addItemToCart={addItemToCart} product={product} setProduct={setProduct} setShowCart={setShowCart} showCart={showCart}/>
    
      <div className="product-details-container">
      <div className="product-image-container">
          <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="product-image" />
        </div>
      <div className="product-info">
        
        <div style={{margin:"15px"}}>
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <div className="quantity-selector" >
          <label htmlFor="quantity">Quantity:</label>
          <div className="cart-item-quantity-controls">
                <button onClick={() => handleDecreaseQuantity()}>-</button>
                <p className="cart-item-quantity">{quantity}</p>
                <button onClick={() => handleIncreaseQuantity()}>+</button>
              </div>
        </div>
        {inCart?<button onClick={handleShowCart} className="go-to-cart-btn">Go to Cart...</button>
        :<button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>}
        </div>
        <div className="product-reviews">
        <h3 className="reviews-title">Product Reviews</h3>
        <div className="reviews-container">
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <div key={index} className="review">
              <div className="review-header">
                <span className="review-username">{review.username}</span>
                <span className="review-rating">{renderRatingStars(review.rating)}</span>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
        {visibleReviews < reviews.length && (
          <button onClick={handleLoadMoreReviews} className="load-more-btn">Load More Reviews</button>
        )}
      </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
