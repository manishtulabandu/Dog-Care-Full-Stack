import React, { useState } from 'react';
import Header from './TopHeader/Header';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import { Scrollbars } from 'react-custom-scrollbars';
import MemorialCard from './MemorialCard';


const Memorials = () => {
  const [memorials, setMemorials] = useState([]);
  const [formData, setFormData] = useState({
    petName: '',
    photo: null,
    story: '',
    memories: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique ID for the uploaded memorial
    const id = Math.floor(Math.random() * 1000000);

    // Create a new memorial object with the form data and generated ID
    const newMemorial = {
      id,
      petName: formData.petName,
      photo: URL.createObjectURL(formData.photo), // Convert uploaded file to a URL
      story: formData.story,
      memories: formData.memories,
      comments: [] // Initialize comments array
    };

    // Add the new memorial to the memorials array
    setMemorials([...memorials, newMemorial]);

    // Reset the form data
    setFormData({
      petName: '',
      photo: null,
      story: '',
      memories: ''
    });
  };

  const handleCommentSubmit = (memorialId, comment) => {
    setMemorials(prevMemorials => {
      return prevMemorials.map(memorial => {
        if (memorial.id === memorialId) {
          return {
            ...memorial,
            comments: [...memorial.comments, comment]
          };
        }
        return memorial;
      });
    });
  };

  return (
    <div className='Memorials-bgm'>
      <Header />
      <div className="background-image">
        <div className="auth-wrapper">
          <Row>
            <Col md={6}>
              <Scrollbars style={{ width: '100%', height: 'calc(100vh - 80px)' }}>
                {memorials.map(memorial => (
                  <Card key={memorial.id} style={{ marginBottom: '10px' }}>
                    <MemorialCard
                      memorial={memorial}
                      onCommentSubmit={handleCommentSubmit}
                    />
                  </Card>
                ))}
              </Scrollbars>
            </Col>
            <Col md={6}>
              <div className="auth-inner">
                <h3 className="login-title">Memorials Page</h3>
                <Form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                  <Form.Group controlId="petName">
                    <Form.Label>Pet Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="petName"
                      value={formData.petName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="photo">
                    <Form.Label>Photo:</Form.Label>
                    <Form.Control
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="story">
                    <Form.Label>Story:</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="story"
                      value={formData.story}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="memories">
                    <Form.Label>Memories:</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="memories"
                      value={formData.memories}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button type="submit">Share</Button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Memorials;
