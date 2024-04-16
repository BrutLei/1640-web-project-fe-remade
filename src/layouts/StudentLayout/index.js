import React from "react";
import Header from "../../component/Header";

function StudentLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="p-10">{children}</div>
    </div>
  );
}

export default StudentLayout;
