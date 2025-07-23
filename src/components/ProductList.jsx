import styles from "./ProductList.module.css";

import { useState, useEffect } from "react";

import { CircularProgress } from "@mui/material";

import { Product } from "./Product";

export function ProductList({ cart, addToCart, removeFromCart }) {
  var category = "smartphones";
  var limit = 10;
  var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.productsList}>
        {products.map((prod) => (
          <Product
            key={prod.id}
            product={prod}
            qty={cart.find((p) => p.id === prod.id)?.qty || 0}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      {loading && (
        <div className={styles.loading}>
          <CircularProgress
            thickness={5}
            sx={{ color: "blue" }}
            style={{ margin: "2rem auto", display: "block" }}
          />
          <p>Loading products...</p>
        </div>
      )}

      {error && <p>Error loading products: {error.message}</p>}
    </div>
  );
}
