import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavDropdown ,Button , Form, Modal} from 'react-bootstrap';
import './BlogPreview.css'
import { BrowserRouter as Router, Routes, Route, Link ,useNavigate} from 'react-router-dom';
const BlogPreview = (props) => {
  const {blog,setBlog}=props;

  const navigate=useNavigate();
const handleRoute = (e) => {
  setBlog(blog);
  navigate(e);
};

  return (
    <div className="blog-preview">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-info">
        <h2 className="blog-title">{blog.title}</h2>
        <p className="blog-description">{blog.description}</p>
        <div className="blog-read"> 
        <p>{blog.introduction.substring(0,175)}...</p>
        
        </div>
        {blog.category.map(cat => (
        <button class="button">{cat}</button>
      ))}
        <Nav.Link onClick={()=>handleRoute("/Blog")} className="read-more-link">Read More...</Nav.Link>
        
      </div>
    </div>
  );
}

export default BlogPreview;
