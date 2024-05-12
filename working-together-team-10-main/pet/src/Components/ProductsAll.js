import React, { useState } from 'react';

function ProductsAll() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      manufacturer: 'Manufacturer 1',
      expiryDate: '2024-12-31',
      manufacturingDate: '2024-01-01',
      price: 10.99,
      quantity: 100,
      description: 'Description of Product 1',
    },
  ]);

  const handleEditProduct = (id, updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(product => (product.id === id ? { ...product, ...updatedProduct } : product))
    );
  };

  return (
    <div className="products-page">
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Expiry Date</th>
            <th>Manufacturing Date</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td contentEditable onBlur={e => handleEditProduct(product.id, { name: e.target.innerText })}>
                {product.name}
              </td>
              <td contentEditable onBlur={e => handleEditProduct(product.id, { manufacturer: e.target.innerText })}>
                {product.manufacturer}
              </td>
              <td contentEditable onBlur={e => handleEditProduct(product.id, { expiryDate: e.target.innerText })}>
                {product.expiryDate}
              </td>
              <td
                contentEditable
                onBlur={e => handleEditProduct(product.id, { manufacturingDate: e.target.innerText })}
              >
                {product.manufacturingDate}
              </td>
              <td contentEditable onBlur={e => handleEditProduct(product.id, { price: parseFloat(e.target.innerText) })}>
                {product.price}
              </td>
              <td
                contentEditable
                onBlur={e => handleEditProduct(product.id, { quantity: parseInt(e.target.innerText) })}
              >
                {product.quantity}
              </td>
              <td
                contentEditable
                onBlur={e => handleEditProduct(product.id, { description: e.target.innerText })}
              >
                {product.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render ProductForm modal or component here */}
    </div>
  );
}

export default ProductsAll;