import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParentRoute } from "./components/ParentRoute";
import { ChildRoute } from "./components/ChildRoute";
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
import { QuizPage } from "./pages/QuizPage";
import GamePage from "./pages/GamePage";
import { RewardsPage } from "./pages/RewardsPage";
import { StorePage } from "./pages/StorePage";
import { ParentLayout } from "./pages/ParentLayout";
import { ParentDashboardPage } from "./pages/parent/ParentDashboardPage";
import { ParentPaymentPage } from "./pages/parent/ParentPaymentPage";
import { ParentMentoringListPage } from "./pages/parent/ParentMentoringListPage";
import { ParentMentoringApplyPage } from "./pages/parent/ParentMentoringApplyPage";
import { ParentLearningReportPage } from "./pages/parent/ParentLearningReportPage";

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
              <ChildRoute>
                <DashboardPage />
              </ChildRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ChildRoute>
                <ProfilePage />
              </ChildRoute>
            }
          />
          <Route
            path="/quiz-selection"
            element={
              <ChildRoute>
                <QuizSelectionPage />
              </ChildRoute>
            }
          />
          <Route
            path="/rewards"
            element={
              <ChildRoute>
                <RewardsPage />
              </ChildRoute>
            }
          />
          <Route
            path="/store"
            element={
              <ChildRoute>
                <StorePage />
              </ChildRoute>
            }
          />
        </Route>

        <Route
          path="/quiz"
          element={
            <ChildRoute>
              <QuizPage />
            </ChildRoute>
          }
        />

        {/* Parent routes */}
        <Route path="/parent" element={<ParentLayout />}>
          <Route
            path="dashboard"
            element={
              <ParentRoute>
                <ParentDashboardPage />
              </ParentRoute>
            }
          />
          <Route
            path="learning-report"
            element={
              <ParentRoute>
                <ParentLearningReportPage />
              </ParentRoute>
            }
          />
          <Route
            path="payment"
            element={
              <ParentRoute>
                <ParentPaymentPage />
              </ParentRoute>
            }
          />
          <Route
            path="mentoring/list"
            element={
              <ParentRoute>
                <ParentMentoringListPage />
              </ParentRoute>
            }
          />
          <Route
            path="mentoring/apply"
            element={
              <ParentRoute>
                <ParentMentoringApplyPage />
              </ParentRoute>
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
