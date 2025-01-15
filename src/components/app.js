import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

const getCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

function App() {
  const [cart, setCart] = useState(getCartFromStorage);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div>
      <h1>Интернет-магазин</h1>
      <ProductList addToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
}

export default App;
