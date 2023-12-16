import React from "react";
import { Route, Routes } from "react-router-dom";
import {LoginMain, Login} from "./containers/LoginExport";

const App = () => {
  return (
    <div className=" w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      <Routes>
        <Route path="/#" element={<LoginMain />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
