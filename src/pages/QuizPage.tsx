import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// 이미지 경로
const imgIcon = "/images/quiz-progress-active.png";
const imgIcon1 = "/images/quiz-progress-inactive.png";
const imgIcon2 = "/images/profile-icon.png";
const imgIcon3 = "/images/candy-icon.png";
const imgIcon4 = "/images/logout-icon.png";

export function QuizPage() {
  const location = useLocation();
  const category = (location.state as { category?: string })?.category || "이차방정식";
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 10;
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const displayName = user?.displayName || user?.email?.split("@")[0] || "사용자";
  const candyCount = 42; // TODO: 실제 사탕 개수 가져오기

  // TODO: 실제 문제 데이터에서 가져오기
  const correctAnswer = "x = 2, 3";
  const explanation = "인수분해를 이용하면 (x-2)(x-3) = 0이므로 x = 2 또는 x = 3입니다.";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCheckAnswer = () => {
    // 정답 확인 로직
    console.log("정답 확인:", answer);
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    // 다음 문제로 이동
    console.log("다음 문제");
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer(""); // 답변 초기화
      setShowAnswer(false); // 정답 표시 초기화
    } else {
      // 퀴즈 완료 처리
      navigate("/dashboard");
    }
  };

  // 진행 상황 인디케이터 생성
  const progressIndicators = Array.from({ length: totalQuestions }, (_, index) => {
    const questionNumber = index + 1;
    const isActive = questionNumber === currentQuestion;
    const isCompleted = questionNumber < currentQuestion;

    return (
      <div
        key={questionNumber}
        className="absolute content-stretch flex flex-col items-start left-0 size-12"
        style={{ top: `${(questionNumber - 1) * 64}px` }}
      >
        {isActive ? (
          <div className="absolute left-0 size-12 top-0">
            <div className="absolute left-0 size-12 top-0">
              <img alt="Active" className="block max-w-none size-full" src={imgIcon} />
            </div>
            <div className="absolute flex items-center justify-center left-0 size-12 top-0">
              <p className="font-semibold leading-6 relative shrink-0 text-base text-white whitespace-pre">
                {questionNumber}
              </p>
            </div>
          </div>
        ) : (
          <div className="h-12 overflow-hidden relative shrink-0 w-full">
            <img alt="Inactive" className="block max-w-none size-full" src={imgIcon1} />
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="bg-white box-border flex gap-8 items-start pb-0 pt-8 px-8 relative min-h-screen w-full">
      {/* Left Sidebar - Category and Progress */}
      <div className="h-[711px] relative shrink-0 w-[186px]">
        <div className="flex flex-col gap-6 h-[711px] items-center relative w-[186px]">
          {/* Category Header */}
          <div className="bg-white h-[63px] relative rounded-xl shadow-sm shrink-0 w-[186px]">
            <div className="flex flex-col h-[63px] items-start pb-0 pt-3 px-6 relative w-[186px]">
              <div className="h-[39px] relative shrink-0 w-full">
                <p className="font-semibold leading-[39px] text-[#101828] text-3xl whitespace-pre">
                  {category}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex-1 min-h-0 min-w-0 relative shrink-0 w-12">
            <div className="h-full relative w-12">
              {progressIndicators}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-auto min-h-0 min-w-0 relative shrink-0">
        <div className="h-auto relative w-full">
          {/* Question Card */}
          <div className="bg-[#f8f4ff] flex h-[400px] items-center justify-center pl-0 pr-0 py-0 relative rounded-3xl shadow-sm shrink-0 w-full">
            <div className="h-[27px] relative shrink-0 w-auto max-w-full">
              <p className="font-normal leading-[27px] left-1/2 text-[#101828] text-lg text-center whitespace-pre top-0 -translate-x-1/2 relative">
                x² - 5x + 6 = 0을 만족하는 x의 값을 모두 구하시오.
              </p>
            </div>
          </div>

          {/* Answer Section */}
          <div className="flex h-[60px] items-center justify-between relative shrink-0 w-full mt-8">
            {/* Difficulty Indicator */}
            <div className="h-6 relative shrink-0 w-auto">
              <div className="flex gap-2 h-6 items-center relative w-auto">
                <div className="h-6 relative shrink-0 w-auto">
                  <p className="font-normal leading-6 text-[#101828] text-base whitespace-pre">
                    난이도:
                  </p>
                </div>
                <div className="h-6 relative shrink-0 w-auto">
                  <p className="font-semibold leading-6 text-[#fdb022] text-base whitespace-pre">
                    중
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Input and Buttons */}
            <div className="h-[60px] relative shrink-0 w-auto">
              <div className="h-[60px] relative w-auto flex gap-4">
                {/* Answer Input */}
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="답을 입력하세요"
                  disabled={showAnswer}
                  className="bg-white border-2 border-black/10 h-[60px] rounded-xl px-6 py-4 relative w-[270px] text-base text-[rgba(16,24,40,0.5)] focus:outline-none focus:border-[#6941c6] disabled:opacity-50 disabled:cursor-not-allowed"
                />

                {/* Check Answer Button */}
                <button
                  onClick={handleCheckAnswer}
                  disabled={showAnswer || !answer}
                  className="bg-[#6941c6] h-14 rounded-xl shadow-sm relative w-[127.125px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <p className="font-medium leading-6 left-8 text-base text-white whitespace-pre top-[15px] absolute">
                    정답 확인
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Answer and Explanation Section */}
          {showAnswer && (
            <div className="bg-[#f8f4ff] flex flex-col gap-4 h-auto items-start pb-0 pt-8 px-8 rounded-3xl shadow-sm shrink-0 w-full mt-8">
              {/* Correct Answer */}
              <div className="flex flex-col gap-2 h-auto items-start relative shrink-0 w-full">
                <div className="h-[31.198px] relative shrink-0 w-full">
                  <p className="font-semibold leading-[31.2px] text-[#6941c6] text-2xl whitespace-pre">
                    정답
                  </p>
                </div>
                <div className="h-[27px] relative shrink-0 w-full">
                  <p className="font-normal leading-[27px] text-[#101828] text-lg whitespace-pre">
                    {correctAnswer}
                  </p>
                </div>
              </div>

              {/* Explanation */}
              <div className="flex flex-col gap-2 h-auto items-start relative shrink-0 w-full">
                <div className="h-[31.198px] relative shrink-0 w-full">
                  <p className="font-semibold leading-[31.2px] text-[#6941c6] text-2xl whitespace-pre">
                    해설
                  </p>
                </div>
                <div className="h-[27px] relative shrink-0 w-full">
                  <p className="font-normal leading-[27px] text-[#475467] text-lg whitespace-pre">
                    {explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Question Button - Centered when answer is shown */}
          {showAnswer && (
            <div className="flex justify-center w-full mt-8">
              <button
                onClick={handleNextQuestion}
                className="bg-emerald-500 h-14 rounded-xl shadow-sm relative w-[159.125px] hover:opacity-90 transition-opacity"
              >
                <p className="font-medium leading-6 left-12 text-base text-white whitespace-pre top-[15px] absolute">
                  다음 문제
                </p>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Profile */}
      <div className="h-[243px] relative shrink-0 w-[96.604px]">
        <div className="flex flex-col gap-4 h-[243px] items-center relative w-[96.604px]">
          {/* Avatar */}
          <div className="flex-1 bg-[#f8f4ff] min-h-0 min-w-0 relative rounded-full shadow-sm shrink-0 w-24">
            <div className="flex h-full items-center justify-center relative w-24">
              <div className="relative shrink-0 size-12">
                <img alt="Profile" className="block max-w-none size-full" src={imgIcon2} />
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="h-[27px] relative shrink-0 w-auto">
            <p className="font-medium leading-[27px] left-1/2 text-[#101828] text-lg text-center whitespace-pre top-0 -translate-x-1/2 absolute">
              {displayName}
            </p>
          </div>

          {/* Candy Count */}
          <div className="bg-[#fdb022] h-12 relative rounded-xl shadow-sm shrink-0 w-[96.604px]">
            <div className="flex gap-2 h-12 items-center pl-6 pr-0 py-0 relative w-[96.604px]">
              <div className="relative shrink-0 size-5">
                <img alt="Candy" className="block max-w-none size-full" src={imgIcon3} />
              </div>
              <div className="h-6 relative shrink-0 w-auto">
                <p className="font-semibold leading-6 text-base text-white whitespace-pre">
                  {candyCount}
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex gap-2 h-6 items-center relative w-auto hover:opacity-80 transition-opacity"
          >
            <div className="relative shrink-0 size-4">
              <img alt="Logout" className="block max-w-none size-full" src={imgIcon4} />
            </div>
            <div className="h-6 relative shrink-0 w-auto">
              <p className="font-normal leading-6 text-[#475467] text-base whitespace-pre">
                로그아웃
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

