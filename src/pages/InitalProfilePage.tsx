import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postWithAuth } from "../api/auth";
// import { useAuth } from "../hooks/useAuth";

type UserRole = "parent" | "child" | "mentor" | null;

// 이미지 assets
const parentsIcon = "/images/parents_icon.png";
const studentIcon = "/images/student_icon.png";
const signIcon = "/images/sign-icon.png";

export function InitUserPage() {
  const navigate = useNavigate();
  // const { user } = useAuth();
  // const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleRoleSelect = (_role: UserRole) => {
    // setSelectedRole(role);
  };

  const handleRoleSubmit = async (role: UserRole) => {
    if (!role) {
      alert("역할을 선택해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await postWithAuth("/api/auth/register", {
        role: role,
      });

      console.log("Role set successfully:", response);

      // 역할 설정 완료 후 역할에 따라 리다이렉트
      if (response.role === "child") {
        navigate("/dashboard", { replace: true });
      } else if (response.role === "parent") {
        navigate("/parent/dashboard", { replace: true });
      } else {
        // 역할이 설정되지 않았거나 예상과 다른 경우
        alert("역할 설정에 실패했습니다.");
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Failed to set role:", error);
      alert("역할 설정에 실패했습니다. 다시 시도해주세요.");
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen px-4 pt-8 bg-white sm:px-6 md:px-8">
      {/* Role Selection Cards */}
      <div className="w-full mt-20">
        <div className="flex flex-col items-center justify-center gap-6 mx-auto lg:flex-row md:gap-8 max-w-7xl">

          {/* Parent Card */}
          <div className="bg-[#f8f4ff] flex flex-col justify-between p-6 sm:p-8 md:p-12 rounded-3xl w-full max-w-[621px] min-h-[450px] sm:min-h-[500px] md:min-h-[534px]">
            {/* Content */}
            <div className="flex flex-col items-center space-y-6 md:space-y-8">
              {/* Icon Circle */}
              <div className="bg-[#6941c6] rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 flex items-center justify-center">
                <img alt="부모님 아이콘" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" src={parentsIcon} />
              </div>

              {/* Title */}
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-[#101828] text-center">
                부모님
              </h2>

              {/* Features List */}
              <div className="flex flex-col w-full gap-2">
                <p className="text-base sm:text-lg text-[#475467] text-center">
                  • 자녀의 학습 진행 상황 모니터링
                </p>
                <p className="text-base sm:text-lg text-[#475467] text-center">
                  • 학습 리포트 및 성적 분석
                </p>
                <p className="text-base sm:text-lg text-[#475467] text-center">
                  • 학습 목표 설정 및 관리
                </p>
                <p className="text-base sm:text-lg text-[#475467] text-center">
                  • 자녀의 포인트 관리
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => {
                handleRoleSelect("parent");
                handleRoleSubmit("parent");
              }}
              disabled={submitting}
              className="flex items-center justify-center w-full gap-2 mt-6 transition-shadow bg-white shadow-md h-14 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-medium text-base text-[#101828]">
                역할 설정
              </span>
              <img alt="화살표 아이콘" className="w-5 h-5" src={signIcon} />
            </button>
          </div>

          {/* Student Card */}
          <div className="bg-[#f8f4ff] flex flex-col justify-between p-6 sm:p-8 md:p-12 rounded-3xl w-full max-w-[621px] min-h-[450px] sm:min-h-[500px] md:min-h-[534px]">
            {/* Content */}
            <div className="flex flex-col items-center space-y-6 md:space-y-8">
              {/* Icon Circle */}
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500 sm:w-28 sm:h-28 md:w-36 md:h-36">
                <img alt="학생 아이콘" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" src={studentIcon} />
              </div>

              {/* Title */}
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-[#101828] text-center">
                학생
              </h2>

              {/* Features List */}
              <div className="flex flex-col w-full gap-2">
                <p className="text-base sm:text-lg text-[#475467] text-center">
                  • 다양한 퀴즈로 재미있게 학습
                </p>
                <p className="text-base sm:text-lg text-[#475467] text-center">
                  • 난이도별 문제 풀이
                </p>
                <p className="text-base sm:text-lg text-[#475467] text-center">
                  • 학습 포인트 및 보상 획득
                </p>
                <p className="text-base sm:text-lg text-[#475467] text-center">
                  • 개인 맞춤형 학습 추천
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => {
                handleRoleSelect("child");
                handleRoleSubmit("child");
              }}
              disabled={submitting}
              className="flex items-center justify-center w-full gap-2 mt-6 transition-shadow bg-white shadow-md h-14 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-medium text-base text-[#101828]">
                역할 설정
              </span>
              <img alt="화살표 아이콘" className="w-5 h-5" src={signIcon} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
