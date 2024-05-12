import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Header from './TopHeader/Header';
import Blogs from './Blogs';
import BlogPreview from './BlogPreview';
import "./BlogPage.css"
import img from "../images/blog-images/JSON4.jpeg"
import {projectUrl} from "./configure";

const BlogPage = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const targetElement = document.getElementById("drp");
  const { product, setProduct, cartItems, addItemToCart, showCart, setShowCart, setBlog, User } = props;
  const filteredBlogs = selectedCategory === "all" ? Blogs : Blogs.filter(blog => blog.category.includes(selectedCategory));
  const [dropdownActive, setDropdownActive] = useState(false);

  const addToCart = (product) => {
    addItemToCart([...cartItems, product]);
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const setSelectedCategory1 = (e) => {
    setSelectedCategory(e);
    setDropdownActive(false);
    if (targetElement !== null) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Element with id 'targetElement' not found.");
    }
  }

  // State variables for name, email, message
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Construct the comment object
    const commentData = {
      name: name,
      email: email,
      message: message
    };
    // Use Axios to send a POST request to the backend
    axios.post(`${projectUrl}`+'/api/comments', commentData)
      .then(response => {
        console.log('Comment posted:', response.data);
        setName('');
        setEmail('');
        setMessage('');
        setFeedbackMessage('Your comment has been posted successfully.');
        setIsError(false);
        setTimeout(() => setFeedbackMessage(''), 5000);
      })
      .catch(error => {
        console.error('Error posting comment:', error);
        setFeedbackMessage('Failed to post the comment. Please try again.');
        setIsError(true);
        setTimeout(() => setFeedbackMessage(''), 5000);  // Clears the feedback message after 5 seconds
      });
    // Reset form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <Header  />
      <center>
        <div className='image-container'>
          <h1 className='overlay-text1' style={{ fontSize: "40px" }}>PAWSONALITY BLOGS </h1>
          <h1 className='overlay-text' onClick={() => setSelectedCategory1("Fun")} style={{ top: "20%", left: "10%" }}>FUN</h1>
          <h1 className='overlay-text' onClick={() => setSelectedCategory1("Stories")} style={{ top: "30%", left: "20%" }}>STORIES</h1>
          <h1 className='overlay-text' onClick={() => setSelectedCategory1("Health And Beauty")} style={{ top: "40%", left: "30%" }}>HEALTH & BEAUTY</h1>
          <h1 className='overlay-text' onClick={() => setSelectedCategory1("Animal News")} style={{ top: "50%", left: "40%" }}>ANIMAL NEWS</h1>
          <h1 className='overlay-text' onClick={() => setSelectedCategory1("Tips And Tricks")} style={{ top: "60%", left: "50%" }}>TIPS & TRICKS</h1>
          <h1 className='overlay-text' onClick={() => setSelectedCategory1("Nutrition Tips")} style={{ top: "70%", left: "60%" }}>NUTRITION TIPS</h1>
          <h1 className='overlay-text' onClick={() => setSelectedCategory1("Grooming")} style={{ top: "80%", left: "70%" }}>GROOMING</h1>
          <img src={img} className='background-image'></img>
        </div>
      </center>
      <div className="dropdown" id="drp">
        <button onClick={toggleDropdown} className="dropdown-button">{selectedCategory === "all" ? "All Categories" : selectedCategory}</button>
        {dropdownActive == true ? <div className={"dropdown-content"} >
          <a onClick={() => setSelectedCategory1("all")}>All Categories</a>
          <a onClick={() => setSelectedCategory1("Fun")}>Fun</a>
          <a onClick={() => setSelectedCategory1("Health And Beauty")}>Health And Beauty</a>
          <a onClick={() => setSelectedCategory1("Recent")}>Recent</a>
          <a onClick={() => setSelectedCategory1("Tips And Tricks")}>Tips And Tricks</a>
          <a onClick={() => setSelectedCategory1("Stories")}>Stories</a>
          <a onClick={() => setSelectedCategory1("Animal News")}>Animal News</a>
          <a onClick={() => setSelectedCategory1("Nutrition Tips")}>Nutrition Tips</a>
          <a onClick={() => setSelectedCategory1("Grooming")}>Grooming</a>
        </div> : null}
      </div>
      <div className="blog-container">
        {filteredBlogs.map(blog => (
          <BlogPreview key={blog.id} blog={blog} setBlog={setBlog} />
        ))}
      </div>

      {/* Comment section */}
      <div className="comment-section" style={{ display: "flex",justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
      <h2 style={{ fontFamily: "Merat" }}>Leave a Comment</h2>
      {feedbackMessage && (
          <div style={{
            color: isError ? 'red' : 'green',
            marginTop: '20px'
          }}>
            {feedbackMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px" }}>
          <div style={{ marginBottom: "15px", width: "100%" }}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%" }} />
          </div>
          <div style={{ marginBottom: "15px", width: "100%" }}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%" }} />
          </div>
          <div style={{ marginBottom: "15px", width: "100%" }}>
            <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: "100%", minHeight: "120px" }} />
          </div>
          <button type="submit" style={{ backgroundColor: "#A24C00", color: "white", padding: "10px 20px", textAlign: "center",border: "none", borderRadius: "5px" }}>POST COMMENT</button>
        </form>
        
      </div>
    </div>
  );
};

export default BlogPage;
