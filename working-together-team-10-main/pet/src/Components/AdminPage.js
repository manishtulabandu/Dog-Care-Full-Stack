import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Table, Modal, FormControl } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from './TopHeader/Header';
import "./AdminPage.css"
import ImageUploader from './ImageUploader';
import ProductTable from './ProductTable';
import AdminHeader from "./TopHeader/adminHeader";
import axios from 'axios';
import {projectUrl} from "./configure";
function AdminPage(props) {
  const {product,setProduct,cartItems,addItemToCart,showCart,setShowCart}=props

  const [showProducts, setShowProducts] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editedProducts, setEditedProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editedUsers, setEditedUsers] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const mockProducts = [
    { id: 1, name: 'Product 1', description: 'Description 1', expiryDate: '2022-01-01', manufactureDate: '2021-12-01', price: 10, quantity: 20 },
    { id: 2, name: 'Product 2', description: 'Description 2', expiryDate: '2022-02-01', manufactureDate: '2021-12-15', price: 20, quantity: 15 },
    { id: 3, name: 'Product 3', description: 'Description 3', expiryDate: '2022-03-01', manufactureDate: '2021-12-20', price: 30, quantity: 25 },
  ];

  const mockUsers = [
    { id: 1, name: 'User 1', email: 'user1@example.com', phoneNumber: '123-456-7890', address: '123 Street, City' },
    { id: 2, name: 'User 2', email: 'user2@example.com', phoneNumber: '987-654-3210', address: '456 Avenue, Town' },
  ];

  const handleViewProducts = () => {
    setProducts(mockProducts);
    setFilteredProducts([...mockProducts]);
    setEditedProducts([...mockProducts]);
    setShowProducts(true);
  };
  const handleClick = () => {
    window.location.href = '/inventory';
  };

  const handlestatistics = () => {
    window.location.href = '/statistics';
  };

  const handleUserDetails = () => {
    window.location.href = '/UserDetails';
  };


  const handleViewUsers = () => {
    setUsers(mockUsers);
    setFilteredUsers([...mockUsers]);
    setEditedUsers([...mockUsers]);
    setShowUsers(true);
  };
  // Fetch the comments
  const fetchComments = () => {
    axios.get(`${projectUrl}`+'/api/comments')
        .then(response => {
          // console.log(response.data);
          setComments(response.data);
          setShowComments(true);
        })
        .catch(error => console.error('Error fetching comments:', error));
  };


  const handleProductSearch = (query) => {
    const filtered = products.filter(
        (product) => product.id.toString().includes(query) || product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleUserSearch = (query) => {
    const filtered = users.filter(
        (user) => user.id.toString().includes(query) || user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSaveProductChanges = () => {
    console.log("Edited Products:", editedProducts);
  };

  const handleSaveUserChanges = () => {
    console.log("Edited Users:", editedUsers);
  };

  const handleAddProductRow = () => {
    const newProduct = {
      id: products.length + 1,
      name: '',
      description: '',
      expiryDate: '',
      manufactureDate: '',
      price: '',
      quantity: ''
    };
    setProducts([...products, newProduct]);
    setFilteredProducts([...filteredProducts, newProduct]);
    setEditedProducts([...editedProducts, newProduct]);
  };

  const handleAddUserRow = () => {
    const newUser = {
      id: users.length + 1,
      name: '',
      email: '',
      phoneNumber: '',
      address: ''
    };
    setUsers([...users, newUser]);
    setFilteredUsers([...filteredUsers, newUser]);
    setEditedUsers([...editedUsers, newUser]);
  };
  const handleDeleteProduct = (productId) => {
    const updatedFilteredProducts = filteredProducts.filter(product => product.id !== productId);
    setFilteredProducts(updatedFilteredProducts);

    const updatedOriginalProducts = products.filter(product => product.id !== productId);
    setProducts(updatedOriginalProducts);
  };

  const handleDeleteUser = (userId) => {
    const updatedFilteredUsers = filteredUsers.filter(user => user.id !== userId);
    setFilteredUsers(updatedFilteredUsers);

    const updatedOriginalUsers = users.filter(user => user.id !== userId);
    setUsers(updatedOriginalUsers);
  };


  return (
      <div>        <AdminHeader />
        <div className="background-image">
          <Container className="auth-wrapper">
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="auth-inner" style={{marginLeft:"33%"}}>
                  <Card.Body>
                    <h3 className="login-title">Admin Page</h3>
                    <Button className="login-button" onClick={handleUserDetails}>
                      Users
                    </Button>
                    <Button className="login-button" onClick={handleViewProducts}>
                      Add Product
                    </Button>
                    <Button className="login-button" onClick={handleViewUsers}>
                      Edit Products
                    </Button>
                    <Button className="login-button" onClick={fetchComments}>
                      Comments
                    </Button>
                    <Button className="login-button" onClick={handleClick}>
                      Guide
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Modal show={showComments} onHide={() => setShowComments(false)} size='lg'>
            <Modal.Header closeButton>
              <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Scrollbars style={{ width: '100%', height: '400px' }}>
                {comments.length > 0 ? (
                    <Table striped bordered hover>
                      <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                      </tr>
                      </thead>
                      <tbody>
                      {comments.map((comment, index) => (
                          <tr key={index}>
                            <td>{comment.name}</td>
                            <td>{comment.email}</td>
                            <td>{comment.message}</td>
                            <td>{new Date(comment.datetime).toLocaleString()}</td>
                          </tr>
                      ))}
                      </tbody>
                    </Table>
                ) : (
                    <div>No comments available.</div>
                )}
              </Scrollbars>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowComments(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showProducts} onHide={() => setShowProducts(false)} size='xl'>
            <Modal.Header closeButton>
              <Modal.Title>Products</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <div style={{display:"flex",margin:"10px"}}>
          <FormControl style={{width:"30%"}}
            type="text"
            placeholder="Search by ID or Name"
            onChange={(e) => handleProductSearch(e.target.value)}
          />
          <Button style={{marginLeft:"10px"}}onClick={handleAddProductRow}>Add New Product</Button>
          </div>
          <Scrollbars style={{ width: '100%', height: '300px' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Expiry Date</th>
                  <th>Manufacture Date</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <FormControl
                        type="text"
                        value={editedProducts[index].name}
                        onChange={(e) => {
                          const edited = [...editedProducts];
                          edited[index].name = e.target.value;
                          setEditedProducts(edited);
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="text"
                        value={editedProducts[index].description}
                        onChange={(e) => {
                          const edited = [...editedProducts];
                          edited[index].description = e.target.value;
                          setEditedProducts(edited);
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="date"
                        value={editedProducts[index].expiryDate}
                        onChange={(e) => {
                          const edited = [...editedProducts];
                          edited[index].expiryDate = e.target.value;
                          setEditedProducts(edited);
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="date"
                        value={editedProducts[index].manufactureDate}
                        onChange={(e) => {
                          const edited = [...editedProducts];
                          edited[index].manufactureDate = e.target.value;
                          setEditedProducts(edited);
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="number"
                        value={editedProducts[index].price}
                        onChange={(e) => {
                          const edited = [...editedProducts];
                          edited[index].price = e.target.value;
                          setEditedProducts(edited);
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="number"
                        value={editedProducts[index].quantity}
                        onChange={(e) => {
                          const edited = [...editedProducts];
                          edited[index].quantity = e.target.value;
                          setEditedProducts(edited);
                        }}
                      />
                    </td>
                    <td>
      <Button onClick={() => handleDeleteProduct(index)}>Delete</Button>
    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Scrollbars> */}
              <ImageUploader setShowProducts={setShowProducts}/>

            </Modal.Body>
            {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProducts(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProductChanges}>
            Save Changes
          </Button>
        </Modal.Footer> */}
          </Modal>

          <Modal show={showUsers} onHide={() => setShowUsers(false)} size='xl'>
            <Modal.Header closeButton>
              <Modal.Title>Edit Products</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <div style={{display:"flex",margin:"10px"}}>

          <FormControl style={{width:"30%"}}
            type="text"
            placeholder="Search by ID or Name"
            onChange={(e) => handleUserSearch(e.target.value)}
          />
          <Button style={{marginLeft:"10px"}} onClick={handleAddUserRow}>Add New User</Button>
          </div>
          <Scrollbars style={{ width: '100%', height: '300px' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <FormControl
                        type="text"
                        value={editedUsers[index].name}
                        onChange={(e) => {
                          const edited = [...editedUsers];
                          edited[index].name = e.target.value;
                          setEditedUsers(edited);
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="email"
                        value={editedUsers[index].email}
                        onChange={(e) => {
                          const edited = [...editedUsers];
                          edited[index].email = e.target.value;
                          setEditedUsers(edited);
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="tel"
                        value={editedUsers[index].phoneNumber}
                        onChange={(e) => {
                          const edited = [...editedUsers];
                          edited[index].phoneNumber = e.target.value;
                          setEditedUsers(edited);
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="text"
                        value={editedUsers[index].address}
                        onChange={(e) => {
                          const edited = [...editedUsers];
                          edited[index].address = e.target.value;
                          setEditedUsers(edited);
                        }}
                      />
                    </td>
                    <td>
      <Button onClick={() => handleDeleteUser(index)}>Delete</Button>
    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Scrollbars> */}
              <ProductTable/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowUsers(false)}>
                Close
              </Button>

            </Modal.Footer>
          </Modal>
        </div>
      </div>
  );
}

export default AdminPage;