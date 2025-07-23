import "./styles/theme.css";
import "./styles/global.css";

import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";

import { useState } from "react";

import { Routes, Route } from "react-router";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => {
      if (prevCart.find((prod) => prod.id === product.id)) {
        return prevCart.map((prod) =>
          prod.id === product.id ? { ...prod, qty: prod.qty + 1 } : prod
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  }

  function removeFromCart(productId) {
    setCart((prevCart) => {
      const prod = prevCart.find((p) => p.id === productId);

      if (!prod) return prevCart;

      if (prod.qty === 1) {
        return prevCart.filter((p) => p.id !== productId);
      } else {
        return prevCart.map((p) =>
          p.id === productId ? { ...p, qty: p.qty - 1 } : p
        );
      }
    });
  }

  function removeAllFromCart() {
    setCart([]);
  }

  return (
    //React Fragment
    <>
      <Header cart={cart} />
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              removeAllFromCart={removeAllFromCart}
            />
          }
        />
      </Routes>
    </>
  );
}
