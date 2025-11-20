import { RefreshCcw, Trash2 } from "lucide-react";
import styles from "./ProductRow.module.css";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

export function ProductRow({ product }) {
  const { deleteProduct } = useContext(ProductContext);
  return (
    <tr className={styles.productRow}>
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>
        <div className={styles.imgContainer}>
          <img src={product.thumbnail} />
        </div>
      </td>
      <td>{product.price.toFixed(2)}</td>
      <td>
        <div className={styles.buttons}>
          <Link to={`/update-product/${product.id}`}>
            <button>
              {" "}
              <RefreshCcw size={16} />
              UPDATE
            </button>
          </Link>
          <button onClick={() => deleteProduct(product.id)}>
            <Trash2 size={16} />
            DELETE
          </button>
        </div>
      </td>
    </tr>
  );
}
