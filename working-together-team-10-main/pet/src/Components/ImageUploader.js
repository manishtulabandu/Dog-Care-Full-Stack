import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {projectUrl} from "./configure";

function ImageUploader(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading,setLoading]=useState(false);
  const {setShowProducts}= props;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleChange = (event) => {
    console.log(event.target.name);
    if(event.target.name ==="name"){

        setName(event.target.value);
    }
    if(event.target.name ==="description"){

        setDescription(event.target.value);
    }
    if(event.target.name ==="price"){

        setPrice(event.target.value);
    }
    if(event.target.name ==="quantity"){

        setQuantity(event.target.value);
    }
    if(event.target.name ==="category"){

      setCategory(event.target.value);
  }
  };

  const handleUpload = async () => {
    
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('description',description);
      formData.append('price',price);
      formData.append('quantity',quantity);
      formData.append('name',name);
      formData.append('category',category);
      await axios.post(`${projectUrl}`+'/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      setShowProducts(false);
      alert('Product Added Successfully!');
    } catch (error) {
        setLoading(false);
        alert('Adding Product Failed! Retry Again...');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <div hidden={!loading}>
        <h3><b>Loading...</b></h3>
      </div>
    <div hidden={loading}>
        <h2>Add new product</h2>
        <label>Name</label>
        <input type="text" name="name" onChange={handleChange} className="form-control"/>
        <label>Description</label>
        <input type="text" name="description" onChange={handleChange} className="form-control"/>
        <label>Price</label>
        <input type="number" name="price" onChange={handleChange} className="form-control"/>
        <label>Quantity</label>
        <input type="number" name="quantity" onChange={handleChange} className="form-control"/>
        <label>Category(Enter all catergories seperated by " , ")</label>
        <input type="text" name="category" onChange={handleChange} className="form-control"/>
      
      <label>Image</label>
      <input type="file" onChange={handleFileChange} className="form-control" />
      <Button onClick={handleUpload} className="success">Upload</Button>
    </div>
    </div>
  );
}

export default ImageUploader;
