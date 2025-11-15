# Firebase Authentication Architecture

## 📋 Overview

Complete Firebase authentication system for React (Vite) with TypeScript, featuring:
- ✅ Auth state persistence across page refreshes
- ✅ Protected and public-only route guards
- ✅ Google OAuth + Email/Password authentication
- ✅ Automatic token management and backend API integration
- ✅ Clean separation of concerns

---

## 🏗️ Architecture Components

### 1. Core Authentication Layer

#### **AuthContext** (`src/contexts/AuthContext.tsx`)
- Global authentication state management using React Context
- Implements Firebase `onAuthStateChanged` listener for automatic state persistence
- Provides `user`, `loading`, and `error` states to entire application
- Exports `AuthProvider` and `useAuth` hook

**Key Features:**
- Automatically detects auth state on app load
- Persists login state across page refreshes
- Handles Firebase auth errors gracefully

#### **Auth Service** (`src/services/authService.ts`)
- Centralized Firebase authentication operations
- Functions: `loginWithGoogle()`, `loginWithEmail()`, `registerWithEmail()`, `logout()`, `getAuthToken()`
- User-friendly Korean error messages
- Token refresh handling

**Key Features:**
- Handles all Firebase SDK calls
- Converts Firebase error codes to readable Korean messages
- Provides reusable authentication functions

#### **useAuth Hook** (`src/hooks/useAuth.ts`)
- Convenient wrapper around AuthContext and authService
- Provides `isSubmitting` state for UI loading indicators
- Maintains backward compatibility with existing code

**API:**
```typescript
const {
  user,           // Current Firebase user
  loading,        // Auth state loading
  error,          // Auth error message
  isSubmitting,   // Form submission state
  googleLogin,    // Google OAuth login
  loginWithEmail, // Email/password login
  register,       // User registration
  logout          // Sign out
} = useAuth();
```

---

### 2. Route Protection System

#### **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
- Guards routes that require authentication
- Redirects unauthenticated users to `/login`
- Shows loading spinner during auth check

**Usage:**
```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />
```

#### **PublicOnlyRoute** (`src/components/PublicOnlyRoute.tsx`)
- Guards routes that should only be accessible to logged-out users
- Redirects authenticated users to `/dashboard`
- Prevents logged-in users from accessing login/register pages

**Usage:**
```tsx
<Route path="/login" element={
  <PublicOnlyRoute>
    <LoginPage />
  </PublicOnlyRoute>
} />
```

---

### 3. UI Components

#### **GoogleButton** (`src/components/auth/GoogleButton.tsx`)
- Styled Google OAuth button with official branding
- Handles loading state with disabled prop

#### **LoginForm** (`src/components/auth/LoginForm.tsx`)
- Email/password login form with validation
- Built-in error handling and display
- Loading state management

#### **RegisterForm** (`src/components/auth/RegisterForm.tsx`)
- User registration form with password confirmation
- Client-side validation (password length, matching passwords)
- User-friendly error messages

---

### 4. Page Components

#### **LoginPage** (`src/pages/LoginPage.tsx`)
- Complete login page with Google OAuth and email/password options
- Links to registration page
- Redirects to dashboard on successful login

#### **RegisterPage** (`src/pages/RegisterPage.tsx`)
- User registration page with multiple auth methods
- Links back to login page
- Redirects to dashboard on successful registration

#### **DashboardPage** (`src/pages/DashboardPage.tsx`)
- Protected dashboard page (example)
- Displays user information
- Integration with backend API (profile fetching demo)
- Navigation to profile page
- Logout functionality

#### **ProfilePage** (`src/pages/ProfilePage.tsx`)
- Protected profile page showing detailed user information
- Displays: email, UID, email verification status, account metadata
- Back navigation to dashboard

---

### 5. Backend API Integration

#### **fetchWithAuth** (`src/api/auth.ts`)
- Automatic Firebase ID token injection into API requests
- Handles token refresh automatically
- Error handling for unauthorized requests

**Usage:**
```typescript
// Simple GET request with auth
const data = await fetchUserProfile();

// Custom POST request with auth
const result = await postWithAuth('/api/endpoint', { data: 'value' });

// Generic fetch with auth
const response = await fetchWithAuth('/api/custom', {
  method: 'GET',
  headers: { 'Custom-Header': 'value' }
});
```

---

## 🔐 Authentication Flow

### Login Flow
1. User visits `/login` or `/register`
2. PublicOnlyRoute checks auth state:
   - If logged in → redirect to `/dashboard`
   - If logged out → show login page
3. User logs in (Google OAuth or email/password)
4. Firebase updates auth state via `onAuthStateChanged`
5. AuthContext updates global state
6. Application redirects to `/dashboard`
7. ProtectedRoute verifies auth and renders dashboard

### Page Refresh Flow
1. App loads, AuthProvider mounts
2. `onAuthStateChanged` listener checks Firebase auth state
3. Firebase automatically restores session from localStorage
4. AuthContext updates with user data
5. Routes render based on auth state
6. No re-login required!

### Backend API Call Flow
1. Component calls `fetchWithAuth()` or `fetchUserProfile()`
2. Service gets current user's ID token via `getAuthToken()`
3. Token automatically included in `Authorization: Bearer <token>` header
4. Backend (NestJS) verifies token with Firebase Admin SDK
5. Response returned to frontend

---

## 📁 File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx              ✅ Global auth state
├── services/
│   └── authService.ts               ✅ Firebase auth functions
├── components/
│   ├── ProtectedRoute.tsx           ✅ Protected route guard
│   ├── PublicOnlyRoute.tsx          ✅ Public route guard
│   └── auth/
│       ├── GoogleButton.tsx         ✅ Google OAuth button
│       ├── LoginForm.tsx            ✅ Email login form
│       └── RegisterForm.tsx         ✅ Registration form
├── pages/
│   ├── LoginPage.tsx                ✅ Login page
│   ├── RegisterPage.tsx             ✅ Registration page
│   ├── DashboardPage.tsx            ✅ Protected dashboard
│   └── ProfilePage.tsx              ✅ Protected profile page
├── hooks/
│   └── useAuth.ts                   ✅ Auth hook wrapper
├── api/
│   └── auth.ts                      ✅ API integration with auth
├── firebase/
│   └── firebase.ts                  ✅ Firebase config (existing)
├── App.tsx                          ✅ Router configuration
└── main.tsx                         ✅ AuthProvider wrapper
```

---

## 🚀 Usage Examples

### Protecting a New Page
```tsx
// src/pages/NewProtectedPage.tsx
export function NewProtectedPage() {
  const { user } = useAuth();

  return <div>Welcome {user?.email}!</div>;
}

// Add to App.tsx routes
<Route path="/new-page" element={
  <ProtectedRoute>
    <NewProtectedPage />
  </ProtectedRoute>
} />
```

### Making Authenticated API Calls
```tsx
import { fetchWithAuth } from '../api/auth';

// In your component
const handleApiCall = async () => {
  try {
    const response = await fetchWithAuth('/api/your-endpoint', {
      method: 'POST',
      body: JSON.stringify({ data: 'value' })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('API call failed:', error);
  }
};
```

### Checking Auth State in Components
```tsx
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return <div>Hello {user.email}!</div>;
}
```

---

## 🎯 Key Features

### ✅ State Persistence
- Login state automatically persists across page refreshes
- No manual token management required
- Firebase handles session storage

### ✅ Automatic Token Management
- Tokens automatically refresh before expiration
- No manual token refresh logic needed
- `fetchWithAuth` handles all token operations

### ✅ Route Protection
- Protected routes block unauthenticated access
- Public-only routes prevent duplicate logins
- Loading states during auth checks

### ✅ Error Handling
- User-friendly Korean error messages
- Form validation feedback
- API error handling

### ✅ TypeScript Support
- Full type safety throughout
- IntelliSense support in IDE
- Type-checked components and hooks

---

## 🔧 Configuration

### Environment Variables (`.env`)
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend API Proxy (`vite.config.ts`)
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  }
}
```

---

## 🧪 Testing the System

### 1. Test Login Flow
- Visit `http://localhost:5173/`
- Should redirect to `/login`
- Try Google OAuth login
- Try email/password login
- Should redirect to `/dashboard` on success

### 2. Test State Persistence
- Login successfully
- Refresh the page (F5)
- Should remain logged in
- Should stay on current page

### 3. Test Route Protection
- Without logging in, try to visit `/dashboard`
- Should redirect to `/login`
- After logging in, try to visit `/login`
- Should redirect to `/dashboard`

### 4. Test Backend Integration
- Login successfully
- Click "프로필 불러오기" button on dashboard
- Should fetch profile from backend with token
- Check browser console for token in request headers

### 5. Test Logout
- Click logout button
- Should redirect to `/login`
- Try to access `/dashboard` again
- Should redirect back to `/login`

---

## 🎨 Customization Tips

### Adding Social Login Providers
```typescript
// In authService.ts
import { FacebookAuthProvider } from 'firebase/auth';

const facebookProvider = new FacebookAuthProvider();

export async function loginWithFacebook() {
  const result = await signInWithPopup(auth, facebookProvider);
  return result.user;
}
```

### Custom Error Messages
Edit the `getAuthErrorMessage()` function in `authService.ts` to customize error messages.

### Styling
All components use Tailwind CSS. Modify classes in component files to match your design system.

---

## 📚 Additional Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)

---

## ✅ Implementation Checklist

- [x] AuthContext with onAuthStateChanged
- [x] Auth service layer with Firebase functions
- [x] Protected route guards
- [x] Public-only route guards
- [x] Login page with Google OAuth
- [x] Registration page
- [x] Dashboard page (protected)
- [x] Profile page (protected)
- [x] Backend API integration with auto token
- [x] Error handling and user feedback
- [x] TypeScript type safety
- [x] Loading states
- [x] Auth state persistence

---

**Status:** ✅ Complete and Ready for Production

The authentication system is fully implemented and ready to use. All components are properly integrated, and the system handles authentication, authorization, and token management automatically.
