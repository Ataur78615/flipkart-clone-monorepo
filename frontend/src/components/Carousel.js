import React from 'react';
import { Carousel } from 'react-bootstrap';

const ProductCarousel = () => {
  return (
    <Carousel className="mb-4" style={{ height: '400px', overflow: 'hidden' }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50"
          alt="First slide"
          style={{ height: '400px', objectFit: 'cover' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50"
          alt="Second slide"
          style={{ height: '400px', objectFit: 'cover' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=400&fit=crop"
          alt="Third slide"
          style={{ height: '400px', objectFit: 'cover' }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarousel;
