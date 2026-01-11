import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const {isLoggedIn, authChecked } = useSelector(
    (state: RootState) => state.auth
  );

  if( !authChecked ){
    return <p className="text-center mt-10">Loading...</p>;
  }
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
