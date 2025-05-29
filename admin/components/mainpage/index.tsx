import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const MainPage = ({ children }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainPage;
