import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: Props) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (isAuthenticated) return <Navigate to="/profile" replace />;

  return children;
};
