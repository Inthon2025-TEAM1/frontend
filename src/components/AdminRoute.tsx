import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authFetch } from "../api/auth";
import { useEffect, useState } from "react";
import { FloatingRoleButton } from "./FloatingRoleButton";

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * Admin-only route guard component
 * Redirects to:
 * - /login if not authenticated
 * - /initUser if no role set
 * - /dashboard if role is 'child'
 * - /parent/dashboard if role is 'parent'
 */
export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const [roleLoading, setRoleLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isInitUserPage, setIsInitUserPage] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setRoleLoading(false);
        return;
      }
      setIsInitUserPage(false);

      try {
        const response = await authFetch("/api/user/role", { method: "GET" });

        if (!response.ok) {
          console.error(
            "AdminRoute - Failed to fetch role, status:",
            response.status
          );
          setUserRole(null);
          setRoleLoading(false);
          setIsInitUserPage(true);
          return;
        }

        const data = await response.json();
        console.log("AdminRoute - Role data:", data);
        console.log("AdminRoute - Setting role to:", data.role);

        // Set role and completion flags together to avoid race condition
        const role = data.role || null;
        setUserRole(role);
        setRoleLoading(false);
        setIsInitUserPage(true);
      } catch (error) {
        console.error("AdminRoute - Error checking role:", error);
        setUserRole(null);
        setRoleLoading(false);
        setIsInitUserPage(true);
      }
    };

    checkRole();
  }, [user]);

  // Show loading spinner while checking auth state or role
  if (authLoading || roleLoading || !isInitUserPage) {
    console.log("AdminRoute - Loading... authLoading:", authLoading, "roleLoading:", roleLoading, "isInitUserPage:", isInitUserPage);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  console.log("AdminRoute - After loading check. user:", !!user, "isInitUserPage:", isInitUserPage, "userRole:", userRole);

  // Redirect to login if not authenticated
  if (!user) {
    console.log("AdminRoute - No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Check if role is loaded (not null) ONLY after API call is complete
  if (isInitUserPage && userRole === null) {
    console.log("AdminRoute - API complete but no role set, redirecting to /initUser");
    return <Navigate to="/initUser" replace />;
  }

  // Log if we skip the null check
  if (!isInitUserPage && userRole === null) {
    console.log("AdminRoute - Skipping null check because API not complete yet. isInitUserPage:", isInitUserPage);
  }

  // Redirect to child dashboard if role is 'child'
  if (userRole === "child") {
    console.log("AdminRoute - User is child, redirecting to /dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect to parent dashboard if role is 'parent'
  if (userRole === "parent") {
    console.log("AdminRoute - User is parent, redirecting to /parent/dashboard");
    return <Navigate to="/parent/dashboard" replace />;
  }

  // Render admin content if role is 'admin'
  if (userRole === "admin") {
    console.log("AdminRoute - User is admin, rendering page");
    return (
      <>
        {children}
        <FloatingRoleButton />
      </>
    );
  }

  // Redirect to initUser if unrecognized role
  console.log("AdminRoute - Unrecognized role (userRole:", userRole, "), redirecting to /initUser");
  return <Navigate to="/initUser" replace />;
}
