import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Route guard component for protected pages
 * Redirects unauthenticated users to login page
 * Redirects users without role to /initUser (except when already on /initUser)
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [userRole, setUserRole] = useState<"parent" | "child" | "mentor" | null | undefined>(undefined);
  const [roleLoading, setRoleLoading] = useState(true);

  // Fetch user role when authenticated
  useEffect(() => {
    if (!loading && user) {
      getCurrentUser()
        .then((userData) => {
          setUserRole(userData.role);
          setRoleLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user role:", error);
          setRoleLoading(false);
        });
    } else if (!loading && !user) {
      setRoleLoading(false);
    }
  }, [user, loading]);

  // Show loading spinner while checking auth state or role
  if (loading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have a role and not on /initUser, redirect to /initUser
  if (userRole === null && location.pathname !== "/initUser") {
    return <Navigate to="/initUser" replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
}
