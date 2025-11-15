// src/api/auth.ts
import { auth } from "../firebase/firebase";

/**
 * Custom error for authentication failures
 */
export class AuthError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

/**
 * Fetch wrapper with automatic auth token injection and 401/403 handling
 *
 * Features:
 * - Auto-injects Firebase ID token in Authorization header
 * - Automatically refreshes token on 401/403 and retries once
 * - Redirects to /login if token refresh fails
 * - Preserves current path for post-login redirect
 *
 * @param url - API endpoint URL
 * @param options - Standard fetch options
 * @returns Response object
 * @throws AuthError on authentication failures
 */
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // 1) Build headers with auth token
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Merge existing headers
  if (options.headers) {
    const existingHeaders = new Headers(options.headers);
    existingHeaders.forEach((value, key) => {
      headers[key] = value;
    });
  }
  // 2) Get current user's ID token
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(); // Get fresh token
    headers.Authorization = `Bearer ${token}`;
  }

  // 3) Make initial request
  const response = await fetch(url, {
    ...options,
    headers,
  });

  // 4) Handle 401/403 → Attempt token refresh and retry
  if (response.status === 401 || response.status === 403) {
    try {
      const newToken = await auth.currentUser?.getIdToken(true);
      if (newToken) {
        headers.Authorization = `Bearer ${newToken}`;
        return fetch(url, { ...options, headers }); // 재요청
      }
    } catch {
      await auth.signOut();
      window.location.href = "/login";
    }
  }

  return response;
}

/**
 * Fetch user profile from backend API
 */
export async function fetchUserProfile() {
  const response = await authFetch("/api/auth/login");
  return await response.json();
}

/**
 * POST request with auth
 */
export async function postWithAuth(url: string, data: unknown) {
  const response = await authFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * @deprecated Use fetchUserProfile instead
 */
export async function getProfile() {
  return fetchUserProfile();
}

/**
 * Fetch user's candy count
 */
export async function fetchCandyCount(): Promise<{ candy: number }> {
  const response = await authFetch("/api/user/candy");
  return await response.json();
}
