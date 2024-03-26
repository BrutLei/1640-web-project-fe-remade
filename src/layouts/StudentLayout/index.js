import React from "react";
import Header from "../../component/Header";

function StudentLayout({ children }) {
  return (
    <div>
      <Header />
      <div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default StudentLayout;
