// frontend/src/components/Product.js
import React, { useContext, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Product = ({ product }) => {
  const { state: authState } = useContext(AuthContext);
  const { userInfo } = authState;

  // Local state taaki like count turant update ho
  const [likes, setLikes] = useState(product.numReviews || 0);
  const [isLiked, setIsLiked] = useState(() => {
    if (product.likes && userInfo) {
      return product.likes.includes(userInfo._id);
    }
    return false;
  });

  const likeHandler = async (id) => {
    if (!userInfo) {
      alert('Please login to like products');
      return;
    }
    
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`/api/products/${id}/like`, {}, config);

      // UI ko turant update karo
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
      
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <Card className="my-3 p-3 rounded card-shadow">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">
          ₹{product.price}
        </Card.Text>

        {/* --- NAYA LIKE BUTTON AUR REVIEW COUNT --- */}
        <div className="d-flex justify-content-between align-items-center">
          <Button 
            variant={isLiked ? "primary" : "outline-primary"} 
            size="sm"
            onClick={() => likeHandler(product._id)}
          >
            <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i> Like
          </Button>
          <small className="text-muted">{likes} reviews</small>
        </div>
        {/* --- END --- */}
        
      </Card.Body>
    </Card>
  );
};

export default Product;