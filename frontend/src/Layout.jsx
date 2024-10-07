import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import PrivateRouters from "./utilities/PrivateRouters";
import Dashboard from "./pages/Dashboard";

import CreateBankAccount from "./pages/CreateBankAccount";
import Deposite from "./pages/Deposite";
import UserAccounts from "./pages/UserAccounts";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";
import Banks from "./pages/Banks";
import About from "./pages/About";
const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/banks" element={<Banks />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRouters />}>
          <Route path="/deposite/:userId" element={<Deposite />} />
          <Route path="/create-bank-account" element={<CreateBankAccount />} />
          <Route path="/transfer-money/:bankId" element={<Transactions />} />
          <Route path="/user-accounts/:userId" element={<UserAccounts />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
