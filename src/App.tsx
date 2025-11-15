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
import GamePage from "./pages/GamePage";
import { RewardsPage } from "./pages/RewardsPage";
import { StorePage } from "./pages/StorePage";
import { ParentLayout } from "./pages/ParentLayout";
import { ParentDashboardPage } from "./pages/parent/ParentDashboardPage";
import { ParentPaymentPage } from "./pages/parent/ParentPaymentPage";
import { ParentMentoringListPage } from "./pages/parent/ParentMentoringListPage";
import { ParentMentoringApplyPage } from "./pages/parent/ParentMentoringApplyPage";
import { ParentLearningReportPage } from "./pages/parent/ParentLearninStatusPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}

        <Route path="/" element={<HomeLayout />}>
          <Route
            path="/"
            element={
              <PublicOnlyRoute>
                <HomePage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/OpenBox"
            element={<
              PublicOnlyRoute>
                <GamePage />
              </PublicOnlyRoute>
            }
          />


          <Route
            path="/initUser"
            element={
              <PublicOnlyRoute>
                <InitUserPage />
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
          <Route
            path="/rewards"
            element={
              <ProtectedRoute>
                <RewardsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <StorePage />
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

        {/* Parent routes */}
        <Route path="/parent" element={<ParentLayout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <ParentDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="learning-report"
            element={
              <ProtectedRoute>
                <ParentLearningReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="payment"
            element={
              <ProtectedRoute>
                <ParentPaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="mentoring/list"
            element={
              <ProtectedRoute>
                <ParentMentoringListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="mentoring/apply"
            element={
              <ProtectedRoute>
                <ParentMentoringApplyPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all route - redirect based on auth state */}
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
