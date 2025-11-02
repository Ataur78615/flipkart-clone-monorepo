import React, { useState, useEffect, useReducer, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image, ListGroup, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useContext(CartContext);
  const { state: authState } = useContext(AuthContext);
  const { userInfo } = authState;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  const [state, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
    error: '',
  });
  const { product, loading, error } = state;

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    cartDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, _id: product._id, qty },
    });
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setReviewError('');

    if (!userInfo) {
      setReviewError('Please login to add a review');
      return;
    }

    if (rating === 0) {
      setReviewError('Please select a rating');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, {
        rating,
        comment,
      }, config);

      // Refresh product data to show new review
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });

      setRating(0);
      setComment('');
    } catch (err) {
      setReviewError(err.response?.data?.message || err.message);
    }
  };

  return loading ? (
    <Spinner animation="border" />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
            <ListGroup.Item>Rating: {product.rating} from {product.numReviews} reviews</ListGroup.Item>
            <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row><Col>Price:</Col><Col><strong>₹{product.price}</strong></Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Status:</Col><Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col></Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mt-4">
        <Col md={6}>
          <h3>Reviews</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <ListGroup variant="flush">
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <div>Rating: {review.rating} / 5</div>
                  <div>{review.comment}</div>
                  <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No reviews yet</p>
          )}

          {userInfo ? (
            <Form onSubmit={submitReviewHandler} className="mt-3">
              <h4>Write a Review</h4>
              {reviewError && <Alert variant="danger">{reviewError}</Alert>}
              <Form.Group controlId="rating" className="my-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comment" className="my-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write your review here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Submit Review
              </Button>
            </Form>
          ) : (
            <p>Please <Link to="/login">login</Link> to write a review</p>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;