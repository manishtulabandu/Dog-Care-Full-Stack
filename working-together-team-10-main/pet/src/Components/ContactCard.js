import React from 'react';
import './ContactCard.css'; 
import '@fortawesome/fontawesome-free/css/all.css';
const ContactCard = () => {
  return (
    <div className="contact-container">
    <div className="background-image">
      <div className="contact-card">
        <h2>Contact Details</h2>
        <div className="contact-info">
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i> Albany, United States
          </div>
          <div className="info-item">
            <i className="fas fa-phone-alt"></i> +1 (838) 217-1671
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i> pawsonality@gmail.com
          </div>
          <div className="info-item">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
            {/* Add more social media icons as needed */}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ContactCard;
