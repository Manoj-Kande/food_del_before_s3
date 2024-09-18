import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeorder/PlaceOrder";
import Footer from "./components/footer/Footer";
import LoginPopUp from "./components/loginpopup/LoginPopUp";
import { ToastContainer } from 'react-toastify';
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/myorders/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>} ></Route>
          <Route path="/myorders" element={<MyOrders/>} ></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
