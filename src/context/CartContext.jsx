import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "./SessionContext";

export const CartContext = createContext({
  products: [],
  loading: false,
  error: null,

  cart: [],
  addToCart: () => {},
  updateQty: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductsSupabase() {
      const { data, error } = await supabase.from("products").select();

      if (error) {
        setError(`Fetching products failed: ${error.message}`);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProductsSupabase();
  }, []);

  const [cart, setCart] = useState([]);
  const { session } = useContext(SessionContext);

  async function loadCart() {
    if (!session) return;

    const { data, error } = await supabase
      .from("cart")
      .select("productId, qty")
      .eq("userId", session.user.id);

    if (error) {
      setError(`Fetching products failed: ${error.message}`);
      return;
    }

    const merged = data
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return;
        return { ...product, qty: Number(item.qty) };
      })
      .filter(Boolean);

    setCart(merged);
  }

  useEffect(() => {
    if (!session) {
      setCart([]);
      return;
    }
    loadCart();
  }, [session, products]);

  async function addToCart(product) {
    if (!session) {
      window.location.href = "/signin";
    }

    const exist = cart.find((item) => item.id === product.id);
    const newQty = exist ? exist.qty + 1 : 1;

    const { error } = await supabase.from("cart").upsert({
      userId: session.user.id,
      productId: product.id,
      qty: Number(newQty),
    });

    if (error) {
      setError(`Error to add product: ${error.message}`);
      return;
    }

    setCart((prev) => {
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: newQty } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  async function updateQty(productId, newQty) {
    if (!session) return;

    if (newQty <= 0) return removeFromCart(productId);

    const { error } = await supabase
      .from("cart")
      .update({ qty: Number(newQty) })
      .eq("userId", session.user.id)
      .eq("productId", productId);

    if (error) {
      setError(`Failed to add item: ${error.message}`);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  }

  async function removeFromCart(productId) {
    if (!session) return;

    await supabase
      .from("cart")
      .delete()
      .eq("userId", session.user.id)
      .eq("productId", productId);

    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  async function clearCart() {
    if (!session) return;

    await supabase.from("cart").delete().eq("userId", session.user.id);

    setCart([]);
  }

  const context = {
    products: products,
    loading: loading,
    error: error,
    cart: cart,
    addToCart: addToCart,
    updateQty: updateQty,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
