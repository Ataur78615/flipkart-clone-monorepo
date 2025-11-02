// frontend/src/screens/ProductListScreen.js
import React, { useEffect, useReducer, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Table, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

// Reducer for fetching products
const listReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST': return { ...state, loading: true };
    case 'FETCH_SUCCESS': return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL': return { ...state, loading: false, error: action.payload };
    default: return state;
  }
};

// Reducer for deleting products
const deleteReducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_REQUEST': return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS': return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL': return { ...state, loadingDelete: false, errorDelete: action.payload };
    case 'DELETE_RESET': return {};
    default: return state;
  }
};

const ProductListScreen = () => {
  const navigate = useNavigate();
  const { state: authState } = useContext(AuthContext);
  const { userInfo } = authState;

  const [{ loading, error, products }, listDispatch] = useReducer(listReducer, {
    loading: true,
    error: '',
    products: [],
  });

  const [{ loadingDelete, errorDelete, successDelete }, deleteDispatch] = useReducer(deleteReducer, {});

  useEffect(() => {
    deleteDispatch({ type: 'DELETE_RESET' }); // Har baar load hone par delete state reset karo
    
    const fetchProducts = async () => {
      try {
        listDispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/products');
        listDispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        listDispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    
    // Agar user logged in nahi hai ya admin nahi hai (waise AdminRoute handle kar lega, but good practice)
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
       fetchProducts();
    }
    // `successDelete` ko dependency mein daala taaki delete hone ke baad list refresh ho
  }, [userInfo, navigate, successDelete]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        deleteDispatch({ type: 'DELETE_REQUEST' });
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/products/${id}`, config);
        deleteDispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        deleteDispatch({ type: 'DELETE_FAIL', payload: err.response?.data?.message || err.message });
      }
    }
  };
  
  const createProductHandler = async () => {
     if (window.confirm('Are you sure you want to create a new product?')) {
        try {
           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
           // Hum backend se sample product create karwayenge
           const { data } = await axios.post('/api/products', {}, config);
           // Create hone ke baad user ko edit screen par bhej denge
           navigate(`/admin/product/${data._id}/edit`);
        } catch (err) {
           console.error(err);
        }
     }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col><h1>Products</h1></Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      
      {loadingDelete && <Spinner />}
      {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
      
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i> Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;