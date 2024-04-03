import React from "react";
import AdminHeader from "../../component/AdminHeader";

function AdminLayout({ children }) {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-center justify-between">{children}</div>
    </div>
  );
}

export default AdminLayout;
