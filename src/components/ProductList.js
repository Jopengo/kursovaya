import React from 'react';

const ProductList = ({ addToCart }) => {
  const products = [
    { id: 1, name: 'Товар 1', price: 100 },
    { id: 2, name: 'Товар 2', price: 200 },
    { id: 3, name: 'Товар 3', price: 300 },
  ];

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}₽</p>
          <button onClick={() => addToCart(product)}>Добавить в корзину</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
