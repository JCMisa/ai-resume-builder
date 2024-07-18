import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mx-5">{children}</div>
    </div>
  );
};

export default DashboardLayout;
