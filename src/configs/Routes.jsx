import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DetailMovie from "../pages/detailMovie/DetailMovie";
import Catalog from "../pages/Catalog";
import Watch from "../pages/Watch";
import Account from "../pages/Account";
import LogIn from "../pages/Login";
import Signup from "../pages/Signup";
const Paths = () => {
  return (
    <Routes>
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id/watch" element={<Watch />} />
      <Route path="/:category/:id" element={<DetailMovie />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Paths;
