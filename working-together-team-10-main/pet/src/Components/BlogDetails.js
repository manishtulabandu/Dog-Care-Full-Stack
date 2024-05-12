import React from 'react';
import Header from './TopHeader/Header';
import './BlogDetails.css'
const BlogDetails = ( props ) => {
    const {product,setProduct,cartItems,addItemToCart,showCart,setShowCart,blog}=props
    
    const addToCart = (product) => {
      addItemToCart([...cartItems, product]);
    };
  return (
    <div >        <Header cartItems={cartItems} addItemToCart={addItemToCart} product={product} setProduct={setProduct} setShowCart={setShowCart} showCart={showCart}/>
   <div className="blog-details-container">
  <center> <h2 className="blog-details-title">{blog.title}</h2></center>
  <center><p style={{fontFamily:"cursive",margin:"10px"}}> September 30,2023 . Pawsonality Team</p></center>
      
      <center><img src={blog.image} alt={blog.title} className="blog-details-image" /></center>
      <div className="blog-details-header">
      <div className="blog-details-info">
          
          <p className="blog-details-description">{blog.description}</p>
          <p className="blog-details-introduction">{blog.introduction}</p>
        </div>
        
        
      </div>
      <div className="blog-details-content">
        {Object.keys(blog.headingsAndParas).map(sectionTitle => (
          <div key={sectionTitle} className="blog-details-section">
            <h3 className="section-title">{sectionTitle}</h3>
            
              {blog.headingsAndParas[sectionTitle].map((para, index) => (
                <p style={{textIndent:0}} key={index}>{para}</p>
              ))}
            
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BlogDetails;
