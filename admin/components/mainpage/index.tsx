import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const MainPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
    </div>
  );
};

export default MainPage;
