import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './reviews.css'; 
import wav from './left-wave.png'
import '../Home.css'

const reviews = [
  { id: 1, rating: 5, comment: "Excellent product! Highly recommended." },
  { id: 2, rating: 4, comment: "Good quality. Happy with my purchase." },
  { id: 3, rating: 3, comment: "Average product. Could be better, But Good deal at this price" },
  { id: 4, rating: 4, comment: "Thanks for the amazing products !! i will suggest to my family friends" },
  { id: 5, rating: 3, comment: "I would suggest these Products to my peers" }
];

const Reviews = () => {
  return (
    <div >
      <div className='wave'>
      <h2 style={{"marginLeft":"36rem", "marginTop":"1rem", "marginLeft":"1rem"}}><img src={wav} />CUSTOMER REVIEWS <img src={wav} /></h2>
      </div>
      <Row  className="g-4">
        {reviews.map(review => (
          <Col key={review.id}>
            <Card className="review-card">
              <Card.Body>
                <Card.Title>
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <FaStar key={index} className="star-icon" />
                  ))}
                </Card.Title>
                <Card.Text>{review.comment}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reviews;
