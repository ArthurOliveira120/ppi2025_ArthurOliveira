import styles from "./Header.module.css";

import { ShoppingBasket, UserRound, Blocks } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeToggle } from "./ThemeToggle";
import { SessionContext } from "../context/SessionContext";

export function Header() {
  const { cart } = useContext(CartContext);
  const { session } = useContext(SessionContext);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Link to="/" className={styles.link}>
          <h1>TJA Megastore</h1>
        </Link>
        {session && (
          <Link to="/user" className={styles.welcomeMessage}>
            Welcome, {session.user.user_metadata.username}{" "}
            {session.user.user_metadata.admin && "⭐"}
          </Link>
        )}
      </div>

      <div className={styles.container}>
        {session && session.user.user_metadata.admin && (
          <Link to="/manage-products" className={styles.link}>
            <div className={styles.secContainer}>
              <Blocks />
              <p>Products</p>
            </div>
          </Link>
        )}

        <ThemeToggle />

        <Link to="/cart" className={styles.link}>
          <div className={styles.cartInfo}>
            <ShoppingBasket size={24} />
            <p>{cart.reduce((total, prod) => total + prod.qty, 0)} items</p>
            <p>
              Total: ${" "}
              {cart
                .reduce((total, prod) => total + prod.price * prod.qty, 0)
                .toFixed(2)}
            </p>
          </div>
        </Link>

        {!session && (
          <>
            <Link to="/signin" className={styles.link}>
              <div className={styles.secContainer}>
                <UserRound />
                <p>Login</p>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
