import { createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export const ProductContext = createContext({
  products: [],
  loading: false,
  error: null,
  fetchProducts: () => {},
  insertProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from("products").select().order("id");

    if (error) {
      setError(error.message);
    } else {
      setProducts(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function insertProduct(product) {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select()
      .single();

    if (error) {
      setError(error.message);
      return null;
    }

    setProducts((prev) => [...prev, data]);
    return data;
  }

  async function updateProduct(id, updates) {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      setError(error.message);
      return null;
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? data : p))
    );

    return data;
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      setError(error.message);
      return false;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
    return true;
  }

  const context = {
    products,
    loading,
    error,
    fetchProducts,
    insertProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
}
