import styles from "./UpdateProduct.module.css";

import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputText } from "../components/InputText";
import { ProductContext } from "../context/ProductContext";

export function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, insertProduct, updateProduct, loading } =
    useContext(ProductContext);

  const product = useMemo(() => {
    if (!id || !products) return undefined;
    return products.find((p) => Number(p.id) === Number(id));
  }, [id, products]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    thumbnail: "",
    description: "",
  });

  useEffect(() => {
    if (!loading && product) {
      setForm({
        title: product.title ?? "",
        price: String(product.price ?? ""),
        thumbnail: product.thumbnail ?? "",
        description: product.description ?? "",
      });
    }
  }, [product, loading]);

  function onChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  const isEditing = Boolean(id);

  async function handleSubmit() {
    if (isEditing) {
      await updateProduct(product.id, {
        title: form.title,
        price: Number(form.price),
        thumbnail: form.thumbnail,
        description: form.description,
      });
    } else {
      await insertProduct({
        title: form.title,
        price: Number(form.price),
        thumbnail: form.thumbnail,
        description: form.description,
      });
    }

    navigate("/user");
  }

  if (loading) {
    return <p className={styles.loading}>Loading product...</p>;
  }

  if (isEditing && !product) {
    return <p className={styles.loading}>Product not found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1>{isEditing ? "Update Product" : "Insert Product"}</h1>

      <div className={styles.prodInfo}>
        <InputText
          label="Title"
          placeholder="New title"
          value={form.title}
          onChange={onChange("title")}
        />
        <InputText
          label="Price"
          placeholder="New price"
          value={form.price}
          onChange={onChange("price")}
        />
        <InputText
          label="Thumbnail"
          placeholder="New thumbnail"
          value={form.thumbnail}
          onChange={onChange("thumbnail")}
        />
        <InputText
          label="Description"
          placeholder="New description"
          value={form.description}
          onChange={onChange("description")}
        />

        <button onClick={handleSubmit}>
          {isEditing ? "Update product" : "Add product"}
        </button>
      </div>
    </div>
  );
}
