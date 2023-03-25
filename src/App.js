import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Account from "./pages/auth/Account";
import Home from "./pages/index";
import Cart from "./pages/cart/Cart";
import Product from "./pages/product/Product";
import Login from "./pages/auth/Login";
import Category from "./pages/category/Category";
import VerifyOtp from "./pages/auth/VerifyOtp";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Adress from "./pages/adress/Adress";
import Singleproduct from "./pages/product/Singleproduct";
import BrandProduct from "./pages/category/BrandProduct";
import MYOC from "./pages/MYOC/MYOC";
import Emptycart from "./pages/emptyCart/Emptycart";
import Payment from "./pages/payment/Payment"
import Loginadress from "./pages/adress/Loginadress";
import WCC from "./pages/WCC/WCC.js";
import Store from "./pages/Store/Store";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home></Home>}></Route>
      <Route path="/Cart" element={<Cart />} />
      <Route path="/combo/:id" element={<Product />} />
      <Route path="/product/:id" element={<Singleproduct />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/brand/:brand_id" element={<BrandProduct />} />
      <Route path="/VerifyOtp" element={<VerifyOtp />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/Signup" element={<SignUp />} />
      <Route path="Signin" element={<SignIn />} />
      <Route path="/adress" element={<Adress />} />
      <Route path="/view-all-products" element={<MYOC />} />
      <Route path ="/EmptyCart" element={<Emptycart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path='/address' element={<Loginadress />} />
      <Route path="/why-choose-combonation"  element={<WCC />}/>
      <Route path="/store/:id" element={<Store />} />
      <Route path="*" render={() => <Navigate to="/" />} />
    </Routes>
  );
};

export default App;
