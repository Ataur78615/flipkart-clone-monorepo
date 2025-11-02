// frontend/src/screens/BecomeASellerScreen.js
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BecomeASellerScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { state: authState } = useContext(AuthContext);
  const { userInfo } = authState;
  const navigate = useNavigate();

  // (Styles waise hi rahenge)
  const containerStyle = { backgroundColor: '#fff', padding: '40px', marginTop: '20px', boxShadow: '0 2px 4px 0 rgba(0,0,0,.08)', textAlign: 'center' };
  const heroStyle = { fontSize: '28px', fontWeight: '600', marginBottom: '20px' };
  const textStyle = { fontSize: '18px', color: '#555', marginBottom: '30px' };

  const handleStartSelling = () => {
    if (!userInfo) {
      // Login page par bhejo
      navigate('/login?redirect=become-a-seller');
    } else {
      setShowForm(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    window.location.href = '/';// Success ke baad homepage par bhej do
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (!businessName || !productCategory || !productName || !price || !image || !description) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('businessName', businessName);
      formData.append('productCategory', productCategory);
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('image', image);
      formData.append('title', productName); // title ko productName se set karo
      formData.append('description', description);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post('/api/sellers/become', formData, config);

      setShowForm(false);
      setShowSuccess(true); // Success modal dikhao
      
      // Form fields reset karo
      setBusinessName('');
      setProductCategory('');
      setProductName('');
      setPrice('');
      setImage(null);
      setDescription('');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={containerStyle}>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div style={heroStyle}>Sell Online on FlipkartClone</div>
          <p style={textStyle}>
            Join the fastest growing e-commerce platform and sell to crores of customers across India.
          </p>
          <img 
            src="/images/seller-hero.png" 
            alt="Sell on Flipkart" 
            style={{ width: '100%', maxWidth: '400px', marginBottom: '30px' }}
          />
          <div>
            <Button 
              variant="primary" 
              size="lg" 
              style={{backgroundColor: '#fb641b', borderColor: '#fb641b'}}
              onClick={handleStartSelling}
            >
              Start Selling
            </Button>
          </div>
        </Col>
      </Row>

      {/* Seller Form Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Become a Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="businessName" className="my-3">
              <Form.Label>Business Name (Brand)</Form.Label>
              <Form.Control type="text" placeholder="Enter your business name" value={businessName} required onChange={(e) => setBusinessName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="productCategory" className="my-3">
              <Form.Label>Product Category</Form.Label>
              <Form.Control type="text" placeholder="e.g., Electronics, Clothing" value={productCategory} required onChange={(e) => setProductCategory(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="productName" className="my-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" value={productName} required onChange={(e) => setProductName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="image" className="my-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" accept="image/*" required onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>

            <Form.Group controlId="description" className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter product description" value={description} required onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="price" className="my-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control type="number" placeholder="Enter price" value={price} required onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Success Modal (Aapka code, thoda modified) */}
      <Modal show={showSuccess} onHide={handleSuccessClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#2874f0' }}>🎉 Congratulations! 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', fontWeight: '500' }}>
            Your product has been submitted successfully!
          </p>
          <p>It will now be visible on the homepage.</p>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button variant="primary" onClick={handleSuccessClose}>
            Close & Go to Homepage
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BecomeASellerScreen;