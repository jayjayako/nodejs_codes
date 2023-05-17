import React from "react";
import { Route, Routes } from "react-router-dom";
import User1route from "./routes/user1route";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<User1route />} />
      </Routes>
    </>
  );
}

export default App;
