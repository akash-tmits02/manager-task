"use client";

import { useAuthStore } from "../lib/authStore";
import Sidebar from "./Sidebar";
import React from "react";

export default function LayoutWrapper({ children }) {
  const { user } = useAuthStore();

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      {user && <Sidebar />}
      <main
        style={{
          marginLeft: user ? 260 : 0,
          flex: 1,
          padding: 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </main>
    </div>
  );
}
