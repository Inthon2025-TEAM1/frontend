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

/**
 * Spend candy to purchase an item
 */
export async function spendCandy(
  amount: number,
  itemName: string
): Promise<{ candy: number }> {
  const response = await authFetch("/api/user/spend-candy", {
    method: "POST",
    body: JSON.stringify({ amount, itemName }),
  });
  return await response.json();
}

/**
 * Get purchase history
 */
export async function getPurchaseHistory(): Promise<
  Array<{
    id: number;
    userId: number;
    type: string;
    amount: number;
    itemName: string;
    createdAt: string;
  }>
> {
  const response = await authFetch("/api/user/purchase-history");
  return await response.json();
}

/**
 * Parent-Child Management APIs
 */

export interface Child {
  id: number;
  email: string;
  name: string;
  candy: number;
}

/**
 * Get list of children for current parent
 */
export async function getChildren(): Promise<Child[]> {
  const response = await authFetch("/api/user/children");
  return await response.json();
}

/**
 * Add a child to current parent account
 */
export async function addChild(childEmail: string): Promise<Child> {
  const response = await authFetch("/api/user/children", {
    method: "POST",
    body: JSON.stringify({ childEmail }),
  });
  return await response.json();
}

/**
 * Remove a child from current parent account
 */
export async function removeChild(
  childId: number
): Promise<{ success: boolean; message: string }> {
  const response = await authFetch(`/api/user/children/${childId}`, {
    method: "DELETE",
  });
  return await response.json();
}

/**
 * Payment APIs
 */

export interface CreatePaymentRequest {
  amount: number;
  depositorName: string;
  startAt?: Date;
  endAt?: Date;
}

export interface PaymentResponse {
  id: number;
  parentId: number;
  amount: number;
  depositorName: string;
  status: "pending" | "paid" | "active" | "expired";
  startAt: Date | null;
  endAt: Date | null;
  paidAt: Date | null;
}

/**
 * Create a new payment
 */
export async function createPayment(
  payment: CreatePaymentRequest
): Promise<PaymentResponse> {
  const response = await authFetch("/api/payment/create", {
    method: "POST",
    body: JSON.stringify({ payment }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "결제 생성에 실패했습니다.");
  }

  return await response.json();
}
