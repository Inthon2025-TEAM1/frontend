import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

/**
 * Route guard component for public-only pages (login, register)
 * Redirects authenticated users to dashboard
 */
export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }



  // Render public content if not authenticated
  return <>{children}</>;
}
