import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
