import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { postWithAuth, getCurrentUser } from "../api/auth";

type UserRole = "parent" | "child" | null;

// 이미지 assets
const parentsIcon = "/images/parents_icon.png";
const studentIcon = "/images/student_icon.png";
const signIcon = "/images/sign-icon.png";

export function InitUserPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Check if user already has a role
  useEffect(() => {
    if (user) {
      getCurrentUser()
        .then((userData) => {
          if (userData.role !== null) {
            // User already has a role, redirect to dashboard
            navigate("/dashboard", { replace: true });
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user role:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const handleRoleSubmit = async (role: UserRole) => {
    if (!role) {
      alert("역할을 선택해주세요.");
      return;
    }
    
    setSubmitting(true);
    try {
      const response = await postWithAuth("/api/auth/register", { role });
      console.log("Role set successfully:", response);
      // 역할 설정 완료 후 dashboard로 리다이렉트
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Failed to set role:", error);
      alert("역할 설정에 실패했습니다. 다시 시도해주세요.");
      setSubmitting(false);
    }
  };

  // Show loading while checking user role
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-12 items-start pb-0 pt-8 px-8 relative min-h-screen w-full">
      {/* Role Selection Cards */}
      <div className="h-[534px] relative shrink-0 w-full mt-32">
        <div className="flex gap-8 items-start justify-center relative w-full">
          {/* Parent Card */}
          <div className="bg-[#f8f4ff] box-border content-stretch flex flex-col h-[534px] items-start justify-between pb-[15px] pl-12 pr-0 pt-12 rounded-3xl w-[621px]">
            <div className="h-[382px] relative shrink-0 w-[525px]">
              <div className="bg-clip-padding border-0 border-transparent border-solid box-border h-[382px] relative w-[525px]">
                {/* Icon Circle */}
                <div className="absolute bg-[#6941c6] box-border content-stretch flex flex-col items-center justify-center left-[190px] rounded-full size-36 top-0">
                  <img alt="부모님 아이콘" className="block w-20 h-20" src={parentsIcon} />
                </div>

                {/* Content */}
                <div className="absolute content-stretch flex flex-col gap-4 h-[206px] items-start left-0 top-[176px] w-[525px]">
                  <div className="h-[58px] relative shrink-0 w-full">
                    <p className="absolute font-bold leading-[57.6px] left-[263px] not-italic text-[#101828] text-5xl text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">
                      부모님
                    </p>
                  </div>
                  <div className="content-stretch flex flex-col gap-2 h-[132px] items-start relative shrink-0 w-full">
                    <div className="h-[27px] relative shrink-0 w-full">
                      <p className="absolute font-normal leading-[27px] left-[262px] not-italic text-[#475467] text-lg text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">
                        • 자녀의 학습 진행 상황 모니터링
                      </p>
                    </div>
                    <div className="h-[27px] relative shrink-0 w-full">
                      <p className="absolute font-normal leading-[27px] left-[263px] not-italic text-[#475467] text-lg text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">
                        • 학습 리포트 및 성적 분석
                      </p>
                    </div>
                    <div className="h-[27px] relative shrink-0 w-full">
                      <p className="absolute font-normal leading-[27px] left-[263px] not-italic text-[#475467] text-lg text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">
                        • 학습 목표 설정 및 관리
                      </p>
                    </div>
                    <div className="h-[27px] relative shrink-0 w-full">
                      <p className="absolute font-normal leading-[27px] left-[263px] not-italic text-[#475467] text-lg text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">
                        • 자녀의 포인트 관리
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => handleRoleSubmit("parent")}
              disabled={submitting}
              className="bg-white h-14 relative rounded-xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[525px] hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="bg-clip-padding border-0 border-transparent border-solid box-border h-14 relative w-[525px]">
                <p className="absolute font-medium leading-6 left-[219px] not-italic text-[#101828] text-base text-nowrap top-[15px] whitespace-pre">
                  역할 설정
                </p>
                <div className="absolute left-[286px] size-5 top-[18px]">
                  <img alt="화살표 아이콘" className="block max-w-none size-full" src={signIcon} />
                </div>
              </div>
            </button>
          </div>

          {/* Student Card */}
          <div className="bg-[#f8f4ff] box-border content-stretch flex flex-col h-[534px] items-start justify-between pb-[15px] pl-12 pr-0 pt-12 rounded-3xl w-[621px]">
            <div className="h-[382px] relative shrink-0 w-[525px]">
              <div className="bg-clip-padding border-0 border-transparent border-solid box-border h-[382px] relative w-[525px]">
                {/* Icon Circle */}
                <div className="absolute bg-emerald-500 box-border content-stretch flex flex-col items-center justify-center left-[190px] rounded-full size-36 top-0">
                  <img alt="학생 아이콘" className="block w-20 h-20" src={studentIcon} />
                </div>

                {/* Content */}
                <div className="absolute content-stretch flex flex-col gap-4 h-[206px] items-start left-0 top-[176px] w-[525px]">
                  <div className="h-[58px] relative shrink-0 w-full">
                    <p className="absolute font-bold leading-[57.6px] left-[263px] not-italic text-[#101828] text-5xl text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre">
                      학생
                    </p>
                  </div>
                  <div className="content-stretch flex flex-col gap-2 h-[132px] items-start relative shrink-0 w-full">
                    <div className="h-[27px] relative shrink-0 w-full">
                      <p className="absolute font-normal leading-[27px] left-[263px] not-italic text-[#475467] text-lg text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">
                        • 다양한 퀴즈로 재미있게 학습
                      </p>
                    </div>
                    <div className="h-[27px] relative shrink-0 w-full">
                      <p className="absolute font-normal leading-[27px] left-[262px] not-italic text-[#475467] text-lg text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">
                        • 난이도별 문제 풀이
                      </p>
                    </div>
                    <div className="h-[27px] relative shrink-0 w-full">
                      <p className="absolute font-normal leading-[27px] left-[263px] not-italic text-[#475467] text-lg text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">
                        • 학습 포인트 및 보상 획득
                      </p>
                    </div>
                    <div className="h-[27px] relative shrink-0 w-full">
                      <p className="absolute font-normal leading-[27px] left-[263px] not-italic text-[#475467] text-lg text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">
                        • 개인 맞춤형 학습 추천
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => handleRoleSubmit("child")}
              disabled={submitting}
              className="bg-white h-14 relative rounded-xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[525px] hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="bg-clip-padding border-0 border-transparent border-solid box-border h-14 relative w-[525px]">
                <p className="absolute font-medium leading-6 left-[219px] not-italic text-[#101828] text-base text-nowrap top-[15px] whitespace-pre">
                  역할 설정
                </p>
                <div className="absolute left-[286px] size-5 top-[18px]">
                  <img alt="화살표 아이콘" className="block max-w-none size-full" src={signIcon} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
