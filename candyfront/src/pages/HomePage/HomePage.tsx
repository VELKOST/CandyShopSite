import React, { useEffect, useState } from 'react';

import styles from './homePage.module.scss';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://api.escuelajs.co/api/v1/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error', error);
        setError('Error loading products');
        setLoading(false);
      });
  });
  return (
    <div className={styles.main}>
      <h1>Главная страница</h1>
      <p>Добро пожаловать в интернет-магазин кондитерских изделий!</p>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {products.map((product: any) => (
            <li key={product.id}>
              {product.title}-{product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
