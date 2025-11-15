import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// 이미지 경로
const imgIcon = "/images/quiz-progress-active.png";
const imgIcon1 = "/images/profile-icon.png";
const imgIcon2 = "/images/candy-icon.png";
const imgIcon3 = "/images/cup_icon.png"; // 트로피 아이콘
const imgIcon4 = "/images/check-icon.png"; // 체크 아이콘 (추가 필요)
const imgIcon5 = "/images/x-icon.png"; // X 아이콘 (추가 필요)
const imgIcon6 = "/images/chevron-down-icon.png"; // 아래 화살표 아이콘 (추가 필요)

interface QuizResult {
  accuracyRate: number;
  correctCount: number;
  totalCount: number;
  earnedCandy: number;
  questions: Array<{
    id: number;
    number: number;
    difficulty: "하" | "중" | "상";
    question: string;
    isCorrect: boolean;
    userAnswer?: string;
    correctAnswer?: string;
    explanation?: string;
  }>;
}

export function QuizResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<number>>(new Set());
  const displayName = user?.displayName || user?.email?.split("@")[0] || "사용자";
  const candyCount = 43; // TODO: 실제 사탕 개수 가져오기

  // location.state에서 결과 데이터 가져오기 (없으면 더미 데이터 사용)
  const result: QuizResult = (location.state as { result?: QuizResult })?.result || {
    accuracyRate: 10,
    correctCount: 1,
    totalCount: 10,
    earnedCandy: 1,
    questions: [
      { 
        id: 1, 
        number: 1, 
        difficulty: "중", 
        question: "x² - 5x + 6 = 0을 만족하는 x의 값을 모두 구하시오.", 
        isCorrect: true,
        userAnswer: "x = 2, 3",
        correctAnswer: "x = 2, 3",
        explanation: "인수분해를 이용하면 (x-2)(x-3) = 0이므로 x = 2 또는 x = 3입니다."
      },
      { 
        id: 2, 
        number: 2, 
        difficulty: "하", 
        question: "x² - 4 = 0을 만족하는 x의 값을 모두 구하시오.", 
        isCorrect: false,
        userAnswer: "(미입력)",
        correctAnswer: "x = ±2",
        explanation: "x² = 4이므로 x = ±2입니다."
      },
      { 
        id: 3, 
        number: 3, 
        difficulty: "상", 
        question: "2x² + 7x - 15 = 0을 만족하는 x의 값을 모두 구하시오.", 
        isCorrect: false,
        userAnswer: "(미입력)",
        correctAnswer: "x = 3/2, -5",
        explanation: "인수분해를 이용하면 (2x-3)(x+5) = 0이므로 x = 3/2 또는 x = -5입니다."
      },
      { 
        id: 4, 
        number: 4, 
        difficulty: "중", 
        question: "x² + 6x + 9 = 0을 만족하는 x의 값을 구하시오.", 
        isCorrect: false,
        userAnswer: "(미입력)",
        correctAnswer: "x = -3",
        explanation: "완전제곱식으로 인수분해하면 (x+3)² = 0이므로 x = -3입니다."
      },
      { 
        id: 5, 
        number: 5, 
        difficulty: "하", 
        question: "x² - 9 = 0을 만족하는 x의 값을 모두 구하시오.", 
        isCorrect: false,
        userAnswer: "(미입력)",
        correctAnswer: "x = ±3",
        explanation: "x² = 9이므로 x = ±3입니다."
      },
      { 
        id: 6, 
        number: 6, 
        difficulty: "상", 
        question: "3x² - 5x - 2 = 0을 만족하는 x의 값을 모두 구하시오.", 
        isCorrect: false,
        userAnswer: "(미입력)",
        correctAnswer: "x = 2, -1/3",
        explanation: "인수분해를 이용하면 (3x+1)(x-2) = 0이므로 x = -1/3 또는 x = 2입니다."
      },
      { 
        id: 7, 
        number: 7, 
        difficulty: "중", 
        question: "x² - 2x - 8 = 0을 만족하는 x의 값을 모두 구하시오.", 
        isCorrect: false,
        userAnswer: "(미입력)",
        correctAnswer: "x = 4, -2",
        explanation: "인수분해를 이용하면 (x-4)(x+2) = 0이므로 x = 4 또는 x = -2입니다."
      },
      { 
        id: 8, 
        number: 8, 
        difficulty: "하", 
        question: "x² - 16 = 0을 만족하는 x의 값을 모두 구하시오.", 
        isCorrect: false,
        userAnswer: "(미입력)",
        correctAnswer: "x = ±4",
        explanation: "x² = 16이므로 x = ±4입니다."
      },
      { 
        id: 9, 
        number: 9, 
        difficulty: "상", 
        question: "4x² + 4x + 1 = 0을 만족하는 x의 값을 구하시오.", 
        isCorrect: false,
        userAnswer: "(미입력)",
        correctAnswer: "x = -1/2",
        explanation: "완전제곱식으로 인수분해하면 (2x+1)² = 0이므로 x = -1/2입니다."
      },
      { 
        id: 10, 
        number: 10, 
        difficulty: "중", 
        question: "x² + 8x + 16 = 0을 만족하는 x의 값을 구하시오.", 
        isCorrect: false,
        userAnswer: "(미입력)",
        correctAnswer: "x = -4",
        explanation: "완전제곱식으로 인수분해하면 (x+4)² = 0이므로 x = -4입니다."
      },
    ],
  };

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestionIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleGoToMain = () => {
    navigate("/dashboard");
  };

  const handleRetryWrong = () => {
    // 틀린 문제만 필터링하여 다시 풀기
    const wrongQuestions = result.questions.filter((q) => !q.isCorrect);
    // TODO: 틀린 문제만 다시 풀 수 있는 페이지로 이동
    navigate("/quiz", { state: { retryQuestions: wrongQuestions } });
  };

  const getDifficultyColor = (difficulty: "하" | "중" | "상") => {
    switch (difficulty) {
      case "하":
        return "text-emerald-500";
      case "중":
        return "text-[#fdb022]";
      case "상":
        return "text-[#f05252]";
    }
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="px-8 pt-8 pb-32">
        <div className="max-w-[1258px] mx-auto">
          {/* Back to Main Button */}
          <button
            onClick={handleGoToMain}
            className="flex items-center gap-2 h-6 mb-8 hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-5 h-5 text-[#475467]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <p className="text-base text-[#475467] font-normal">메인으로 돌아가기</p>
          </button>

          <div className="flex flex-col gap-8">
          {/* User Header */}
          <div className="bg-white rounded-3xl shadow-sm flex items-center justify-between px-6 py-0 h-[114px]">
            <div className="flex items-center gap-4">
              <div className="bg-[#f8f4ff] rounded-full size-16 flex items-center justify-center">
                <img alt="Profile" className="size-8" src={imgIcon1} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-3xl font-semibold text-[#101828] leading-[39px]">
                  {displayName}님
                </h3>
                <p className="text-lg text-[#475467] leading-[27px]">수고하셨습니다!</p>
              </div>
            </div>
            <div className="bg-[#fdb022] h-12 rounded-xl shadow-sm flex items-center gap-2 pl-6 pr-0 py-0 w-[97px]">
              <img alt="Candy" className="size-5" src={imgIcon2} />
              <p className="text-base font-semibold text-white leading-6">{candyCount}</p>
            </div>
          </div>

          {/* Quiz Completion Summary */}
          <div className="bg-gradient-to-b from-[#6941c6] to-[#10b981] rounded-3xl shadow-lg flex flex-col items-start pt-12 px-12 pb-0 h-[459px]">
            <div className="flex flex-col gap-6 items-center w-full">
              {/* Trophy Icon */}
              <div className="size-20">
                <img alt="Trophy" className="w-full h-full" src={imgIcon3} />
              </div>

              {/* Title and Subtitle */}
              <div className="flex flex-col gap-2 items-center">
                <h1 className="text-[60px] font-extrabold leading-[66px] text-white text-center">
                  퀴즈 완료!
                </h1>
                <p className="text-lg font-normal leading-[27px] text-white/90 text-center">
                  정말 열심히 하셨네요!
                </p>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4 w-full justify-center mt-auto mb-0">
                {/* Accuracy Rate */}
                <div className="bg-white/20 rounded-xl flex flex-col gap-2 items-start pt-6 px-6 pb-0 h-[110px] flex-1 max-w-[371px]">
                  <p className="text-lg font-normal leading-[27px] text-white/80 text-center w-full">
                    정답률
                  </p>
                  <p className="text-lg font-normal leading-[27px] text-white text-center w-full">
                    {result.accuracyRate}%
                  </p>
                </div>

                {/* Correct Count */}
                <div className="bg-white/20 rounded-xl flex flex-col gap-2 items-start pt-6 px-6 pb-0 h-[110px] flex-1 max-w-[371px]">
                  <p className="text-lg font-normal leading-[27px] text-white/80 text-center w-full">
                    맞춘 문제
                  </p>
                  <p className="text-lg font-normal leading-[27px] text-white text-center w-full">
                    {result.correctCount} / {result.totalCount}
                  </p>
                </div>

                {/* Earned Candy */}
                <div className="bg-white/20 rounded-xl flex flex-col gap-2 items-start pt-6 px-6 pb-0 h-[110px] flex-1 max-w-[371px]">
                  <p className="text-lg font-normal leading-[27px] text-white/80 text-center w-full">
                    획득 사탕
                  </p>
                  <div className="flex items-center justify-center gap-2 w-full">
                    <img alt="Candy" className="size-6" src={imgIcon2} />
                    <p className="text-lg font-normal leading-[27px] text-white text-center">
                      +{result.earnedCandy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 h-14">
            <button
              onClick={handleRetryWrong}
              className="bg-[#6941c6] flex-1 h-14 rounded-xl shadow-sm hover:opacity-90 transition-opacity"
            >
              <p className="text-2xl font-medium leading-6 text-white">틀린 문제 다시 풀기</p>
            </button>
            <button
              onClick={handleGoToMain}
              className="bg-emerald-500 flex-1 h-14 rounded-xl shadow-sm hover:opacity-90 transition-opacity"
            >
              <p className="text-2xl font-medium leading-6 text-white">메인으로 돌아가기</p>
            </button>
          </div>

          {/* Detailed Results */}
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-normal leading-6 text-[#101828]">문제별 상세 결과</h2>
            <div className="flex flex-col gap-4">
              {result.questions.map((question) => {
                const isExpanded = expandedQuestionIds.has(question.id);
                return (
                  <div
                    key={question.id}
                    className={`bg-white border-2 rounded-3xl flex flex-col items-start p-[2px] ${
                      question.isCorrect ? "border-emerald-500" : "border-[#f05252]"
                    } ${isExpanded ? "h-auto" : "h-[111px]"}`}
                  >
                    <div className="flex flex-col gap-4 w-full pt-6 px-6 pb-0">
                      {/* Question Header */}
                      <div className="h-[59px] relative w-full">
                        {/* Status Icon */}
                        <div className="absolute left-0 top-1 size-8">
                          {question.isCorrect ? (
                            <svg
                              className="w-full h-full text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-full h-full text-[#f05252]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </div>

                        {/* Question Info */}
                        <div className="absolute left-12 top-0 right-12 flex items-start justify-between h-[59px]">
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center gap-3 h-6">
                              <p className="text-base font-normal leading-6 text-[#475467]">
                                문제 {question.number}
                              </p>
                              <p
                                className={`text-base font-semibold leading-6 ${getDifficultyColor(
                                  question.difficulty
                                )}`}
                              >
                                난이도: {question.difficulty}
                              </p>
                            </div>
                            <p className="text-lg font-normal leading-[27px] text-[#101828]">
                              {question.question}
                            </p>
                          </div>
                          {/* Chevron Icon - Clickable */}
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className="size-8 hover:opacity-80 transition-opacity"
                          >
                            <svg
                              className={`w-full h-full text-gray-400 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="flex flex-col gap-4 pl-12 pr-0 py-0 w-full">
                          {/* My Answer and Correct Answer Grid */}
                          <div className="grid grid-cols-2 gap-4 h-[90px]">
                            {/* My Answer */}
                            <div className="bg-[#f8f4ff] rounded-xl flex flex-col gap-1 items-start pt-4 px-4 pb-0">
                              <p className="text-base font-normal leading-6 text-[#475467]">
                                내 답안
                              </p>
                              <p
                                className={`text-base font-semibold leading-6 ${
                                  question.isCorrect
                                    ? "text-emerald-500"
                                    : "text-[#f05252]"
                                }`}
                              >
                                {question.userAnswer || "(미입력)"}
                              </p>
                            </div>

                            {/* Correct Answer */}
                            <div className="bg-[#f8f4ff] rounded-xl flex flex-col gap-1 items-start pt-4 px-4 pb-0">
                              <p className="text-lg font-normal leading-[27px] text-[#475467]">
                                정답
                              </p>
                              <p className="text-lg font-semibold leading-[27px] text-emerald-500">
                                {question.correctAnswer || "정답 없음"}
                              </p>
                            </div>
                          </div>

                          {/* Explanation */}
                          <div className="bg-[#f8f4ff] rounded-xl flex flex-col gap-2 items-start pt-4 px-4 pb-0 w-full min-h-[94px]">
                            <p className="text-lg font-semibold leading-[27px] text-[#6941c6]">
                              💡 해설
                            </p>
                            <p className="text-lg font-normal leading-[27px] text-[#475467]">
                              {question.explanation || "해설이 없습니다."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

