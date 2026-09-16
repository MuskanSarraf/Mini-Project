import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "user" | "admin";
}

const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(storedUser);

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/movies" replace />;
  }

  return children;
};

export default ProtectedRoute;