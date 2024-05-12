import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {projectUrl} from "./configure";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [editedProducts, setEditedProducts] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${projectUrl}`+'/getProducts');
        setProducts(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
      }
    };
    fetchProducts();
  }, []);

  const handleEditChange = (productId, fieldName, value) => {
    setEditedProducts({
      ...editedProducts,
      [productId]: {
        ...editedProducts[productId],
        [fieldName]: value
      }
    });
  };

  const handleSave = async (productId) => {
    try {
      const updatedProduct = editedProducts[productId];
      await axios.put(`${projectUrl}`+`/update/${productId}`, updatedProduct);
      setProducts(products.map(product => product.id === productId ? { ...product, ...updatedProduct } : product));
      setEditedProducts({
        ...editedProducts,
        [productId]: null
      });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${projectUrl}`+`/delete/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ overflowX: 'auto' }}>
      <h2>Product Table</h2>
      <input
      className="form-control"
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      {error && <div>{error}</div>}
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Quantity</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', width: "50%" }}>Description</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Category</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Image</th>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{product.id}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', width: '150px' }}>
                {editedProducts[product.id] ? (
                  <input
                  className="form-control"
                    type="text"
                    value={editedProducts[product.id].name}
                    onChange={(e) => handleEditChange(product.id, 'name', e.target.value)}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', width: '50px' }}>
                {editedProducts[product.id] ? (
                  <input
                  className="form-control"
                    type="number"
                    value={editedProducts[product.id].quantity}
                    onChange={(e) => handleEditChange(product.id, 'quantity', parseInt(e.target.value))}
                  />
                ) : (
                  product.quantity
                )}
              </td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', width: '50px' }}>
                {editedProducts[product.id] ? (
                  <input
                  className="form-control"
                    type="number"
                    value={editedProducts[product.id].price}
                    onChange={(e) => handleEditChange(product.id, 'price', parseFloat(e.target.value))}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', width: '20%' }}>
                {editedProducts[product.id] ? (
                  <input
                  className="form-control"
                    type="text"
                    value={editedProducts[product.id].description}
                    onChange={(e) => handleEditChange(product.id, 'description', e.target.value)}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', width: '10%' }}>
                {editedProducts[product.id] ? (
                  <input
                  className="form-control"
                    type="text"
                    value={editedProducts[product.id].category}
                    onChange={(e) => handleEditChange(product.id, 'category', e.target.value)}
                  />
                ) : (
                  product.category
                )}
              </td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', width: '100px' }}>
                {editedProducts[product.id] ? (
                  <input
                  className="form-control"
                    type="file"
                    onChange={(e) => handleEditChange(product.id, 'image', e.target.value)}
                  />
                ) : (
                  <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} style={{ maxWidth: '100px' }} />
                )}
              </td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                {editedProducts[product.id] ? (
                  <>
                    <Button onClick={() => handleSave(product.id)}>Save</Button>
                    <Button onClick={() => setEditedProducts({...editedProducts, [product.id]: null})}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setEditedProducts({...editedProducts, [product.id]: {...product}})}>Edit</Button>
                    <Button onClick={() => handleDelete(product.id)}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
