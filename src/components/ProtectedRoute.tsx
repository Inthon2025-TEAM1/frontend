import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authFetch } from "../api/auth";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Route guard component for protected pages
 * Redirects unauthenticated users to login page
 * Redirects users without role to initUser page
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [roleLoading, setRoleLoading] = useState(true);
  const [hasRole, setHasRole] = useState<boolean | null>(null);

  // /initUser 페이지는 role 체크를 건너뜁니다
  const isInitUserPage = location.pathname === "/initUser";

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setRoleLoading(false);
        return;
      }

      // initUser 페이지는 role 체크 건너뛰기
      if (isInitUserPage) {
        setRoleLoading(false);
        setHasRole(true); // role 체크를 건너뛰므로 true로 설정
        return;
      }

      try {
        const response = await authFetch("/api/user/role", { method: "GET" });

        if (!response.ok) {
          console.error("Failed to fetch role");
          setHasRole(false);
          return;
        }

        const data = await response.json();
        console.log("Role data:", data);

        // role이 null이거나 없으면 false
        setHasRole(data.role !== null && data.role !== undefined);
      } catch (error) {
        console.error("Error checking role:", error);
        setHasRole(false);
      } finally {
        setRoleLoading(false);
      }
    };

    checkRole();
  }, [user, isInitUserPage]);

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
  // Redirect to initUser if no role set
  if (hasRole === false) {
    return <Navigate to="/initUser" replace />;
  }

  // Render protected content if authenticated and has role
  return <>{children}</>;
}
