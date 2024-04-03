import React from "react";
import Header from "../../component/Header";

function StudentLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-between">{children}</div>
    </div>
  );
}

export default StudentLayout;
