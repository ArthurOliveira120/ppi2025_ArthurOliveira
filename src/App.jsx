import "./styles/theme.css";
import "./styles/global.css";

import { Login } from "./pages/Login";
import { ProductList } from "./pages/ProductList";
import { Cart } from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import { SessionProvider } from "./context/SessionContext";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { UpdateProduct } from "./pages/UpdateProduct";
import { User } from "./pages/User";
import { ToastContainer } from "react-toastify";
import { ProductProvider } from "./context/ProductContext";

export default function App() {
  return (
    //React Fragment
    <>
      <ToastContainer />
      <SessionProvider>
        <ProductProvider>
          <CartProvider>
            <Header />
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/signin" element={<Login value="signin" />} />
              <Route path="/register" element={<Login value="register" />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/update-product" element={<UpdateProduct />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </SessionProvider>
    </>
  );
}
