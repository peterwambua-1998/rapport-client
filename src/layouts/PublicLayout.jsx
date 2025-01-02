import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = ({ children }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <main style={{ flex: 1, padding: "10px" }}>
          {" "}
          <Outlet /> {/* Render nested routes */}
        </main>
      </div>
    </div>
  );
};

export default PublicLayout;
