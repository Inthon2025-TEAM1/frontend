import { useState, useEffect, use } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { authFetch, postWithAuth } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";

const imgIcon2 = "/images/profile-icon.png";
const imgIcon3 = "/images/candy-icon.png";
const imgIcon4 = "/images/logout-icon.png";

export interface Question {
  grade?: number;
  type?: "객관식";
  chapterId?: number;
  question: {
    text: string;
  };
  choices: string[];
  answer: string;
  explain: string;
  id: string;
}

// interface ApiQuestion {
//   id: string;
//   question: string;
//   answer: string;
//   explanation: string;
//   difficulty: string;
//   choices: string[];
// }



interface HistoryType{
   questionIndex: number, selectedAnswer: string, isCorrect:boolean 
}

const renderMath = (text: string) => {
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const formula = part.slice(1, -1);
      return <InlineMath key={index} math={formula} />;
    }
    return <span key={index}>{part}</span>;
  });
};

export function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // searchParams에서 chapterId 추출 및 파싱
  const chapterIdParam = searchParams.get("chapterId");
  const chapterId = chapterIdParam ? parseInt(chapterIdParam, 10) : null;
  const chapterName = searchParams.get("chapterName");
  const category = chapterName || "퀴즈";

  console.log('searchParams in quizpage - chapterId:', chapterId, 'chapterName:', chapterName);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isCorrectAnimation, setIsCorrectAnimation] = useState(false);
  const [isWrongAnimation, setIsWrongAnimation] = useState(false);
  const [showWrongMark, setShowWrongMark] = useState(false);
  const [history, setHistory] = useState<HistoryType[]>([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      // chapterId가 없거나 유효하지 않으면 에러 처리
      if (!chapterId || isNaN(chapterId)) {
        setError("유효하지 않은 챕터입니다.");
        setLoading(false);
        return;
      }

      console.log(chapterId, 'fetching quiz for chapterId');
      try {
        const response = await authFetch(`/api/quiz?chapterId=${chapterId}`, {
          method: "GET",
        });

        const apiResponse: Question[] = await response.json();
        console.log(apiResponse, 'quiz response');

        if (apiResponse ) {
          // Transform API response to match our Question interface



          setQuizData(apiResponse.questions);
        
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
        setError("퀴즈를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };
    fetchQuizData();
  }, [chapterId]);

  const totalQuestions = quizData?.length || 10;
  const currentQuestionData = quizData?.[currentQuestion];
  const correctAnswer = currentQuestionData?.answer || "";
  const questionText = currentQuestionData?.question?.text || "";
  const choices = currentQuestionData?.choices || [];

  const handleCheckAnswer = () => {
    if (!answer) return;
    // @CurrentUserId() userId: number,
    // @Body('quizId') quizId: number,
    // @Body('answer') answer: string,
    const isCorrect = answer === correctAnswer;
    if(!history[currentQuestion]){
       setHistory(prev => [...prev, { questionIndex: currentQuestion, selectedAnswer: answer, isCorrect }]);
        postWithAuth("/api/quiz/submit", {quizId: quizData[currentQuestion].id, answer, userId: user?.uid })
      }

    if (isCorrect) {
      // 정답: 초록색 페이드 아웃 애니메이션 후 다음 문제


      setIsCorrectAnimation(true);

      setTimeout(() => {
        setIsCorrectAnimation(false);

        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setAnswer("");
          setShowWrongMark(false);
        } else {
          // 마지막 문제 완료
          setShowResults(true);

        }
      }, 800);
    } else {
      // 오답: 빨간색 + 흔들림 + 다시 풀기
      setIsWrongAnimation(true);
      setShowWrongMark(true);

      setTimeout(() => {
        setIsWrongAnimation(false);
      }, 600);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="mb-4 text-6xl">📚</div>
          <p className="text-xl text-gray-600">퀴즈를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <p className="mb-4 text-xl text-red-600">{error}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 결과 및 해설 페이지
  if (showResults) {
    const correctCount = history.filter(a => a.isCorrect).length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl px-4 py-8 mx-auto">
          {/* 결과 헤더 */}
          <div className="p-8 mb-6 text-center bg-white shadow-lg rounded-2xl">
            <div className="mb-4 text-6xl">🎉</div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">퀴즈 완료!</h2>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div>
                <p className="text-sm text-gray-600">정답</p>
                <p className="text-3xl font-bold text-green-600">{correctCount}</p>
              </div>
              <div className="text-4xl text-gray-300">/</div>
              <div>
                <p className="text-sm text-gray-600">전체</p>
                <p className="text-3xl font-bold text-gray-900">{totalQuestions}</p>
              </div>
            </div>
            <div className="text-5xl font-bold text-indigo-600">{score}점</div>
          </div>

          {/* 해설 목록 */}
          
          <div className="space-y-4">
            {quizData.map((question, index) => {
              const userAnswer = history.find(a => a.questionIndex === index);
              return (
                <div key={index} className="p-6 bg-white shadow-md rounded-2xl">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      userAnswer?.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      문제 {index + 1}
                    </div>
                    <span className={`text-2xl ${userAnswer?.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {userAnswer?.isCorrect ? '✓' : '✗'}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-gray-900">
                    {renderMath(question.question)}
                  </h3>

                  {!userAnswer?.isCorrect && (
                    <div className="p-3 mb-3 border border-red-200 rounded-lg bg-red-50">
                      <p className="text-sm text-red-700">
                        <span className="font-semibold">내 답변: </span>
                        {renderMath(userAnswer?.selectedAnswer || "")}
                      </p>
                    </div>
                  )}

                  <div className="p-3 mb-3 border border-green-200 rounded-lg bg-green-50">
                    <p className="text-sm text-green-700">
                      <span className="font-semibold">정답: </span>
                      {renderMath(question.answer)}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="mb-2 font-semibold text-gray-900">📝 해설</h4>
                    <p className="leading-relaxed text-gray-700">
                      {renderMath(question.explain)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 완료 버튼 */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 text-lg font-semibold text-white transition-all transform shadow-lg bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105"
            >
              대시보드로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <div className="flex flex-1 max-h-screen gap-4 p-4">
        {/* 메인 컨텐츠 */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* 진행도 */}
          <div className="p-4 mb-4 bg-white shadow-sm rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900">{category}</h2>
              <span className="text-lg font-semibold text-indigo-600">
                {currentQuestion + 1} / {totalQuestions}
              </span>
            </div>
            <div className="relative h-2 overflow-hidden bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-500 bg-linear-to-r from-indigo-500 to-purple-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 문제 카드 */}
          <div className={`flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col overflow-hidden transition-all duration-300 ${
            isCorrectAnimation ? 'bg-green-50 border-4 border-green-500' : ''
          } ${
            isWrongAnimation ? 'animate-shake bg-red-50' : ''
          }`}>
            <div className="mb-4">
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                showWrongMark ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
              }`}>
                {showWrongMark && <span className="mr-1">✗</span>}
                문제 {currentQuestion + 1}
              </div>
              <h3 className="text-xl font-bold leading-relaxed text-gray-900">
                {renderMath(questionText)}
              </h3>
            </div>

            {/* 선택지 */}
            <div className="flex-1 space-y-2 overflow-auto">
              {choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => setAnswer(choice)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    answer === choice
                      ? "border-indigo-600 bg-indigo-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      answer === choice ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                    }`}>
                      {answer === choice && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-base text-gray-800">
                      {renderMath(choice)}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* 정답 확인 버튼 */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCheckAnswer}
                disabled={!answer}
                className="px-8 py-3 font-semibold text-white transition-all transform shadow-lg bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                정답 확인
              </button>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }

        .animate-shake {
          animation: shake 0.6s cubic-bezier(.36,.07,.19,.97);
        }
      `}</style>
    </div>
  );
}
