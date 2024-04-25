import React from "react";
import ManagerHeader from "../../component/ManagerHeader";

function ManagerLayout({ children }) {
  return (
    <div>
      <ManagerHeader />
      <div className="px-10">{children}</div>
    </div>
  );
}

export default ManagerLayout;
