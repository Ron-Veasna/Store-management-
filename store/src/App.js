import {BrowserRouter, Routes, Route}  from "react-router-dom";
import './App.css';
import Homepage from "./page/home/Homepage"
import Customer from "./page/customer/customer.page"
import Login from "./page/login/Login.page"
import Product from "./page/product/product.page";
import Register from "./page/register/register.page"
import User from "./page/user/user.page"
import Layoutone from "./cmponents/layout/Layout";
function App() {
  return (
    <BrowserRouter>
    <Layoutone>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </Layoutone>
    </BrowserRouter>
  );
}

export default App;
