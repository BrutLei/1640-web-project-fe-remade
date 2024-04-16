import React from "react";
import AdminHeader from "../../component/AdminHeader";

function AdminLayout({ children }) {
  return (
    <div>
      <AdminHeader />
      <div className="px-10">{children}</div>
    </div>
  );
}

export default AdminLayout;
