// frontend/src/screens/ProductEditScreen.js
import React, { useState, useEffect, useReducer, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

// Reducer for fetching product details
const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST': return { ...state, loading: true };
    case 'FETCH_SUCCESS': return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL': return { ...state, loading: false, error: action.payload };
    default: return state;
  }
};

// Reducer for updating product
const updateReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST': return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS': return { ...state, loadingUpdate: false, successUpdate: true };
    case 'UPDATE_FAIL': return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case 'UPDATE_RESET': return {};
    default: return state;
  }
};

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { state: authState } = useContext(AuthContext);
  const { userInfo } = authState;

  // Form fields ke liye State
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  
  // Note: Image Upload ek complex topic hai (multer/S3).
  // Abhi ke liye hum user se image ka path (URL) hi input lenge.

  const [{ loading, error, product }, fetchDispatch] = useReducer(fetchReducer, {
    loading: true,
  });

  const [{ loadingUpdate, errorUpdate, successUpdate }, updateDispatch] = useReducer(updateReducer, {});

  useEffect(() => {
    // Agar update success ho jaye, toh list par wapas bhej do
    if (successUpdate) {
      updateDispatch({ type: 'UPDATE_RESET' });
      navigate('/admin/productlist');
    } else {
      // Agar product data nahi hai ya product.id match nahi karta, toh fetch karo
      if (!product || product._id !== productId) {
        const fetchProduct = async () => {
          try {
            fetchDispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/products/${productId}`);
            fetchDispatch({ type: 'FETCH_SUCCESS', payload: data });
            // Form ko data se bharo
            setName(data.name);
            setPrice(data.price);
            setImage(data.image);
            setBrand(data.brand);
            setCategory(data.category);
            setCountInStock(data.countInStock);
            setDescription(data.description);
          } catch (err) {
            fetchDispatch({ type: 'FETCH_FAIL', payload: err.message });
          }
        };
        fetchProduct();
      }
    }
  }, [productId, product, successUpdate, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      updateDispatch({ type: 'UPDATE_REQUEST' });
      const config = { headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` 
      }};
      
      await axios.put(
        `/api/products/${productId}`,
        { name, price, image, brand, category, countInStock, description },
        config
      );
      
      updateDispatch({ type: 'UPDATE_SUCCESS' });
    } catch (err) {
      updateDispatch({ type: 'UPDATE_FAIL', payload: err.response?.data?.message || err.message });
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Edit Product</h1>
          {loadingUpdate && <Spinner />}
          {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}

          {loading ? (
            <Spinner />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              
              <Form.Group controlId="price" className="my-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image" className="my-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                {/* Yahan aap file upload component bhi laga sakte hain */}
              </Form.Group>
              
              <Form.Group controlId="brand" className="my-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              
              <Form.Group controlId="countInStock" className="my-3">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter count in stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              
              <Form.Group controlId="category" className="my-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              
              <Form.Group controlId="description" className="my-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  row="3"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductEditScreen;