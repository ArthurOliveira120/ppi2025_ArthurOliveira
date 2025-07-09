import styles from "./Product.module.css";

export function Product({ product }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={product.thumbnail} />
      </div>
      <div className={styles.infoContainer}>
        <h6 className={styles.productTitle}>{product.title}</h6>
        <p className={styles.productPrice}>$ {product.price}</p>
        <p className={styles.productDesc}>{product.description}</p>
      </div>
      <button className={styles.addButton}>Add to Cart</button>
    </div>
  );
}
