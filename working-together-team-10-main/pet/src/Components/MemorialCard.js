import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const MemorialCard = ({ memorial, onCommentSubmit }) => {
  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit(memorial.id, comment);
    setComment('');
  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <Card.Body>
        <Card.Title>{memorial.petName}</Card.Title>
        <Card.Img src={memorial.photo} alt={memorial.petName} style={{ maxWidth: '300px', maxHeight: '300px' }} />
        <Card.Text>{memorial.story}</Card.Text>
        <Card.Text>{memorial.memories}</Card.Text>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="comment">
            <Form.Control
              type="text"
              placeholder="Leave a comment"
              value={comment}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Submit Comment</Button>
        </Form>
        {memorial.comments && memorial.comments.length > 0 && (
          <div>
            <h5>Comments:</h5>
            {memorial.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default MemorialCard;