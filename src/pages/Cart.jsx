import styles from "./Cart.module.css";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function Cart() {
  const { cart, addToCart, updateQty, clearCart } = useContext(CartContext);

  return (
    <div className={styles.cart}>
      <div className={styles.head}>
        <p>Shopping Cart</p>
        <button className={styles.removeAll} onClick={() => clearCart()}>
          Remove all products
        </button>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className={styles.prodList}>
          {cart.map((product, index) => {
            const price = product.price ?? 0;
            const thumbnail = product.thumbnail;
            const title = product.title;

            return (
              <li key={index}>
                <div className={styles.prodImgContainer}>
                  <img src={thumbnail} alt={title} />
                </div>

                <div className={styles.prodInfoContainer}>
                  <h3>{title}</h3>
                  <p>${price.toFixed(2)}</p>
                </div>

                <div className={styles.prodQtyContainer}>
                  <span>Quantity</span>

                  <div className={styles.qtyProduct}>
                    <button onClick={() => updateQty(product.id, product.qty - 1)}>
                      -
                    </button>
                    <span>{product.qty}</span>
                    <button onClick={() => addToCart(product)}>+</button>
                  </div>
                </div>

                <div className={styles.totalPriceContainer}>
                  <span>Total:</span>
                  <p>$ {(price * product.qty).toFixed(2)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
