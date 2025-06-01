import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const MainPage = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainPage;
