import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, Image } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { userInfo } = authState;

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAddress(userInfo.address || '');
      setProfileImage(userInfo.profileImage || '');
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put('/api/users/profile', {
        name,
        email,
        address,
        profileImage,
        password: password || undefined,
      }, config);

      authDispatch({ type: 'LOGIN_SUCCESS', payload: data });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="mb-3" style={{ color: '#2874f0', fontWeight: 'bold' }}>My Profile</h2>
                <div className="position-relative d-inline-block">
                  <Image
                    src={profileImage || '/images/default-avatar.png'}
                    roundedCircle
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      border: '4px solid #2874f0'
                    }}
                  />
                  <label
                    htmlFor="profileImageInput"
                    className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '35px', height: '35px', cursor: 'pointer' }}
                  >
                    <i className="fas fa-camera"></i>
                  </label>
                  <input
                    type="file"
                    id="profileImageInput"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">Profile updated successfully!</Alert>}

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>

                <Form.Group controlId="address" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password (leave blank to keep current)</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={loading}
                  style={{
                    backgroundColor: '#fb641b',
                    borderColor: '#fb641b',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : 'Update Profile'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
