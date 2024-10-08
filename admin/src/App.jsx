import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Order from "./pages/orders/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = "https://bbc-peach.vercel.app";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
