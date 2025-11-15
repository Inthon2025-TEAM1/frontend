import type { User } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google OAuth
 */
export async function loginWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
}

/**
 * Sign in with email and password
 */
export async function loginWithEmail(
  email: string,
  password: string
): Promise<User> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
}

/**
 * Register new user with email and password
 */
export async function registerWithEmail(
  email: string,
  password: string
): Promise<User> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
}

/**
 * Sign out current user
 */
export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error("로그아웃에 실패했습니다.");
  }
}

/**
 * Get current user's Firebase ID token
 */
export async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    // Get fresh token (will refresh if expired)
    return await user.getIdToken();
  } catch (error) {
    console.error("Failed to get auth token:", error);
    return null;
  }
}

/**
 * Convert Firebase auth error codes to user-friendly Korean messages
 */
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/invalid-credential":
      return "잘못된 이메일 또는 비밀번호입니다.";
    case "auth/email-already-in-use":
      return "이미 사용 중인 이메일입니다.";
    case "auth/invalid-email":
      return "유효하지 않은 이메일 주소입니다.";
    case "auth/operation-not-allowed":
      return "이메일/비밀번호 로그인이 비활성화되어 있습니다.";
    case "auth/weak-password":
      return "비밀번호는 최소 6자 이상 입력해주세요.";
    case "auth/user-disabled":
      return "이 계정은 비활성화되었습니다.";
    case "auth/user-not-found":
      return "사용자를 찾을 수 없습니다.";
    case "auth/wrong-password":
      return "잘못된 비밀번호입니다.";
    case "auth/popup-closed-by-user":
      return "로그인 팝업이 닫혔습니다.";
    case "auth/cancelled-popup-request":
      return "로그인이 취소되었습니다.";
    case "auth/popup-blocked":
      return "팝업이 차단되었습니다. 팝업 차단을 해제해주세요.";
    default:
      return "인증 중 오류가 발생했습니다.";
  }
}
