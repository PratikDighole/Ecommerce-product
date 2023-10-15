import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Button } from 'react-bootstrap';

import Modal from 'react-modal';
import '../App.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
};

Modal.setAppElement('#root');

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortByPrice, setSortByPrice] = useState('default');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [defaultSortOrder, setDefaultSortOrder] = useState([]);
  const [newProduct, setNewProduct] = useState({
    image: '',
    heading: '',
    description: '',
    price: '',
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let sorted = [...products];

    if(sortByPrice==='default') {
        setProducts([...defaultSortOrder]);
      }
    else if (sortByPrice === 'low-to-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === 'high-to-low') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setProducts(sorted);
  }, [sortByPrice, defaultSortOrder]);

  const handleSortChange = (event) => {
    setSortByPrice(event.target.value);
  };
  const submitForm = (event) => {
    event.preventDefault();
    saveNewProduct();
  };

  
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTaskDelete = (productToDelete) => {
    try {
      setProducts(products.filter((product) => product.id !== productToDelete.id));
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const saveNewProduct = () => {
    const newProductData = {
      id: products.length + 1,
      title: newProduct.heading,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      category: 'custom',
      image: newProduct.image,
      rating: {
        rate: 0,
        count: 0,
      },
    };

    setProducts([...products, newProductData]);
    closeModal();
  };

  return (
    <div className="container mx-auto p-4" style={{ margin: '0px', padding: '0' }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Product List</h1>
        <div className="flex space-x-2">
          <div>
            <label>Sort by Price:</label>
            <select onChange={handleSortChange} value={sortByPrice}>
              <option value="default">Default</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
          <div style={{ paddingLeft: '10px' }}>
            <Button onClick={openModal} className="btn btn-primary">
              Add
            </Button>
          </div>
        </div>
      </div>
      <div className="product-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <ProductCard product={product} onDelete={handleTaskDelete} />
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add New Product"
      >
        <h2>Add New Product</h2>
        <form onSubmit={submitForm} className="form-container">
          <div className="form-group">
          <label>Image URL:</label>
         <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleNewProductChange}
          />
        </div>
        <div className="form-group">
          <label>Heading:</label>
          <input
            type="text"
            name="heading"
            value={newProduct.heading}
            onChange={handleNewProductChange}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleNewProductChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleNewProductChange}
          />
        </div>
        <Button type="submit">Save</Button>
        <Button onClick={closeModal}>Cancel</Button>
        </form>
      </Modal>
    </div>
  );
};

export default HomePage;
