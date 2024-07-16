import SideBar from "@/app/components/Sidebar";
import React from "react";

export default function dashboard() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div>
        <SideBar />
      </div>
      <div>
        <h1>Dashboard page</h1>
      </div>
    </div>
  );
}
