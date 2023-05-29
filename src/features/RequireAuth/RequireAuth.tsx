import React from "react";
import { Navigate } from "react-router-dom";
export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
