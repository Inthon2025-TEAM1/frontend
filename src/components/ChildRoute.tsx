import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authFetch } from "../api/auth";
import { useEffect, useState } from "react";
import { FloatingRoleButton } from "./FloatingRoleButton";

interface ChildRouteProps {
  children: React.ReactNode;
}

/**
 * Child-only route guard component
 * Redirects to:
 * - /login if not authenticated
 * - /initUser if no role set
 * - /parent/dashboard if role is 'parent'
 */
export function ChildRoute({ children }: ChildRouteProps) {
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
        console.log("ChildRoute - Fetched role, status:", response.status);
        if (!response.ok) {
          console.error(
            "ChildRoute - Failed to fetch role, status:",
            response.status
          );
          setUserRole(null);
          setRoleLoading(false);
          setIsInitUserPage(true);
          return;
        }

        const data = await response.json();
        console.log("ChildRoute - Role data:", data);
        console.log("ChildRoute - Setting role to:", data.role);

        // Set role and completion flags together to avoid race condition
        const role = data.role || null;
        setUserRole(role);
        setRoleLoading(false);
        setIsInitUserPage(true);
      } catch (error) {
        console.error("ChildRoute - Error checking role:", error);
        setUserRole(null);
        setRoleLoading(false);
        setIsInitUserPage(true);
      }
    };

    checkRole();
  }, [user]);

  // Show loading spinner while checking auth state or role
  if (authLoading || roleLoading || !isInitUserPage) {
    console.log("ChildRoute - Loading... authLoading:", authLoading, "roleLoading:", roleLoading, "isInitUserPage:", isInitUserPage);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log("ChildRoute - After loading check. user:", !!user, "isInitUserPage:", isInitUserPage, "userRole:", userRole);

  // Redirect to login if not authenticated
  if (!user) {
    console.log("ChildRoute - No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Check if role is loaded (not null) ONLY after API call is complete
  if (isInitUserPage && userRole === null) {
    console.log(
      "ChildRoute - API complete but no role set, redirecting to /initUser"
    );

    return <Navigate to="/initUser" replace />;
  }

  // Log if we skip the null check
  if (!isInitUserPage && userRole === null) {
    console.log("ChildRoute - Skipping null check because API not complete yet. isInitUserPage:", isInitUserPage);
  }

  // Redirect to parent dashboard if role is 'parent'
  if (userRole === "parent") {
    console.log(
      "ChildRoute - User is parent, redirecting to /parent/dashboard"
    );
    return <Navigate to="/parent/dashboard" replace />;
  }

  // Render child content if role is 'child'
  if (userRole === "child") {
    console.log("ChildRoute - User is child, rendering page");
    return (
      <>
        {children}
        <FloatingRoleButton />
      </>
    );
  }

  // Redirect to initUser if unrecognized role
  console.log(
    "ChildRoute - Unrecognized role (userRole:",
    userRole,
    "), redirecting to /initUser"
  );
  return <Navigate to="/initUser" replace />;
}
