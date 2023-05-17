import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/hompage";
import Page1 from "../pages/page1"; // wag gawing {Register} hindi gagana
import Page2 from "../pages/page2";
// import { BrowserRouter } from "react-router-dom";

function User1route() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </>
  );
}

export default User1route;
