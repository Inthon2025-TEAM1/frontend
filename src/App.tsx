import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute";
import { HomeRedirect } from "./components/HomeRedirect";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { HomePage } from "./pages/HomePage";
import { InitUserPage } from "./pages/InitalProfilePage";
import { HomeLayout } from "./pages/HomeLayout";
import { QuizSelectionPage } from "./pages/QuizSelectionPage";
import { GachaPage } from "./pages/GachaPage";
import { QuizPage } from "./pages/QuizPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}

        <Route path="/" element={<HomeLayout/>}>
          <Route
            path="/"
            element={
              <PublicOnlyRoute>
                <HomePage />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/initUser"
            element={
              <PublicOnlyRoute>
                <InitUserPage/>
              </PublicOnlyRoute>
            }
          />
          {/* Public-only routes (redirect to dashboard if already logged in) */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <RegisterPage />
              </PublicOnlyRoute>
            }
          />

          {/* Protected routes (require authentication) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz-selection"
            element={
              <ProtectedRoute>
                <QuizSelectionPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/gacha"
          element={
            <ProtectedRoute>
              <GachaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route - redirect based on auth state */}
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
