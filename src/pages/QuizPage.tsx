import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { authFetch } from "../api/auth";

const imgIcon2 = "/images/profile-icon.png";
const imgIcon3 = "/images/candy-icon.png";
const imgIcon4 = "/images/logout-icon.png";

export interface Question {
  grade: number;
  type: "객관식";
  chapterId: number;
  question: {
    text: string;
  };
  choices: string[];
  answer: string;
  explain: string;
}

interface QuizData {
  quizId: string;
  title: string;
  questions: Question[];
}


const dummyData: Question[] = [{
  "grade": 3,
  "type": "객관식",
  "chapterId": 1,
  "question": {
    "text": "일차방정식 $3x - 5 = 10$의 해를 구하세요."
  },
  "choices": ["$x = 3$", "$x = 5$", "$x = -3$", "$x = -5$"],
  "answer": "$x = 5$",
  "explain": "$3x = 10 + 5$ 이므로 $3x = 15$입니다. 따라서 $x = 5$입니다."
},
{
  "grade": 3,
  "type": "객관식",
  "chapterId": 2,
  "question": {
    "text": "일차부등식 $2x + 4 > 10$의 해를 구하세요."
  },
  "choices": ["$x > 3$", "$x < 3$", "$x > 7$", "$x < 7$"],
  "answer": "$x > 3$",
  "explain": "$2x > 10 - 4$ 이므로 $2x > 6$입니다. 양변을 2로 나누면 $x > 3$입니다."
},
{
  "grade": 3,
  "type": "객관식",
  "chapterId": 4,
  "question": {
    "text": "일차함수 $y = -2x + 1$의 그래프에 대한 설명으로 옳지 않은 것은?"
  },
  "choices": ["기울기는 -2이다.", "y절편은 1이다.", "점 $(1, 1)$을 지난다.", "오른쪽 아래로 향하는 직선이다."],
  "answer": "점 $(1, 1)$을 지난다.",
  "explain": "$x=1$을 대입하면 $y = -2(1) + 1 = -1$입니다. 따라서 점 $(1, -1)$을 지나며, $(1, 1)$은 지나지 않습니다."
},
{
  "grade": 3,
  "type": "객관식",
  "chapterId": 1,
  "question": {
    "text": "이차방정식 $x^2 - 5x + 6 = 0$을 풀어보세요."
  },
  "choices": ["$x = 2, 3$", "$x = 1, 6$", "$x = -2, -3$", "$x = 0, 5$"],
  "answer": "$x = 2, 3$",
  "explain": "인수분해하면 $(x-2)(x-3) = 0$이므로 $x = 2$ 또는 $x = 3$입니다."
},
{
  "grade": 3,
  "type": "객관식",
  "chapterId": 1,
  "question": {
    "text": "연속하는 세 자연수의 합이 48일 때, 이 세 수 중 가장 큰 수는?"
  },
  "choices": ["15", "16", "17", "18"],
  "answer": "17",
  "explain": "연속하는 세 자연수를 $x-1, x, x+1$이라 하면, $(x-1) + x + (x+1) = 48$입니다. $3x = 48$이므로 $x = 16$입니다. 가장 큰 수는 $x+1 = 17$입니다."
}];

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
  const { user, logout } = useAuth();

  const chapterId = searchParams.get("chapterId");
  const chapterName = searchParams.get("chapterName");
  const category = chapterName || "퀴즈";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isCorrectAnimation, setIsCorrectAnimation] = useState(false);
  const [isWrongAnimation, setIsWrongAnimation] = useState(false);
  const [showWrongMark, setShowWrongMark] = useState(false);
  const [history, setHistory] = useState<HistoryType[]>([]);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "사용자";
  const candyCount = 42;

  useEffect(() => {
    const fetchQuizData = async () => {
      // const getQuizResponse = await authFetch(`/api/quiz?chapterId=${chapterId}`, {
      //   method: "GET",
      // });
      // console.log(getQuizResponse, 'quiz response');
      setQuizData({
        quizId: "dummy-quiz-id",
        title: "더미 퀴즈",
        questions: dummyData
      });
      setLoading(false);
    };
    fetchQuizData();
  }, [chapterId]);

  const totalQuestions = quizData?.questions?.length || 10;
  const currentQuestionData = quizData?.questions?.[currentQuestion];
  const correctAnswer = currentQuestionData?.answer || "";
  const questionText = currentQuestionData?.question?.text || "";
  const choices = currentQuestionData?.choices || [];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCheckAnswer = () => {
    if (!answer) return;

    const isCorrect = answer === correctAnswer;
    if(!history[currentQuestion]) setHistory(prev => [...prev, { questionIndex: currentQuestion, selectedAnswer: answer, isCorrect }]);

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
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-xl text-gray-600">퀴즈를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/quiz-selection")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            퀴즈 선택 페이지로 돌아가기
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
      <div className="h-screen overflow-auto bg-linear-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* 결과 헤더 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">퀴즈 완료!</h2>
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
            {quizData?.questions.map((question, index) => {
              const userAnswer = history.find(a => a.questionIndex === index);
              return (
                <div key={index} className="bg-white rounded-2xl shadow-md p-6">
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

                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {renderMath(question.question.text)}
                  </h3>

                  {!userAnswer?.isCorrect && (
                    <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">
                        <span className="font-semibold">내 답변: </span>
                        {renderMath(userAnswer?.selectedAnswer || "")}
                      </p>
                    </div>
                  )}

                  <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      <span className="font-semibold">정답: </span>
                      {renderMath(question.answer)}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">📝 해설</h4>
                    <p className="text-gray-700 leading-relaxed">
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
              className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
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
    <div className="h-screen overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <div className="flex-1 flex gap-4 p-4 max-h-screen">
        {/* 메인 컨텐츠 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 진행도 */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900">{category}</h2>
              <span className="text-lg font-semibold text-indigo-600">
                {currentQuestion + 1} / {totalQuestions}
              </span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500"
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
              <h3 className="text-xl font-bold text-gray-900 leading-relaxed">
                {renderMath(questionText)}
              </h3>
            </div>

            {/* 선택지 */}
            <div className="flex-1 overflow-auto space-y-2">
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
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCheckAnswer}
                disabled={!answer}
                className="px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
