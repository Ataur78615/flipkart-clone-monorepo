import React, { createContext, useReducer,  } from "react";


// 1. Initial State: Shuru mein cart kaisa dikhega
// hum LocalStorage se check kar rahe hain taaki refresh karne par cart khalina ho

const  initialSate = {
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
    shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},  // empty object
};

// 2. REducer Function: Ye batayega ki state ko kaise update karna hai
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            const newItem = action.payload;
            const existItem = state.cartItems.find((item) => item._id === newItem._id);
            
            const cartItems = existItem
             ? state.cartItems.map((item) =>
               item._id === existItem._id ? newItem : item
            )
            : [...state.cartItems, newItem];

            // State update karne ke baad localStorage mein bhi save karo
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cartItems };
        }
        case 'SAVE_SHIPPING_ADDRESS': //save_shipping_address CASE
          localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
           return {
            ...state,
            shippingAddress: action.payload,
           };

           case 'SAVE_PAYMENT_METHOD': //payment case
            return {
                ...state,
                paymentMethod: action.payload,
            };
            case 'CART_CLEAR_ITEMS': 
             localStorage.removeItem('cartItems'); // LocalStorage se bhi clear karo
             return {
                ...state,
                cartItems: [],
             };
            
          default:
            return state;
    }
};

// 3. Context Creation
export const CartContext = createContext();

// 4. Provider Component jo pure app ko state provide karega
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialSate);

    // Calculate Prices
const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

const itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
);
// Shipping: Agar order > 500 toh free, varna 50
  const shippingPrice = addDecimals(itemsPrice > 500 ? 0 : 50);
  // Tax: 18% tax
  const taxPrice = addDecimals(Number((0.18 * itemsPrice).toFixed(2)));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
    
    return (
        <CartContext.Provider value={{ 
            state, 
            dispatch,
            itemsPrice,
            taxPrice,
            totalPrice,
             }}>
            {children}
        </CartContext.Provider>
    );
};