import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RegisterForm } from "../components/auth/RegisterForm";
import { GoogleButton } from "../components/auth/GoogleButton";

export function RegisterPage() {
  const navigate = useNavigate();
  const { googleLogin, register, isSubmitting } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    await register(email, password);
    navigate("/initUser");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">회원가입</h2>
          <p className="mt-2 text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              로그인
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg space-y-6">
          <GoogleButton onClick={handleGoogleLogin} disabled={isSubmitting} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <RegisterForm onSubmit={handleRegister} disabled={isSubmitting} />
        </div>
      </div>
    </div>
  );
}
