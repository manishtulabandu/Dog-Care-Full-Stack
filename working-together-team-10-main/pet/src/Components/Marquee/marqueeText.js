import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './marqueeText.css'; 

const MarqueeText = () => {
  return (
    <Container fluid className="header-container">
      <Row>
        <Col>
          <div className="marquee-container">
            <p className="marquee-text">New Products Launch Alert !! Check our Products in Breeds page</p>
          </div>
        </Col>
        <Col className="contact-details">
          <p>Customer Support: 98765 012345 | Time: 9:30AM to 7:00 PM</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MarqueeText;
