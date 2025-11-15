import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../api/auth";
import { getMockRewards } from "../mocks/rewardsMock";

// Mock mode toggle - set to false when backend API is ready
const USE_MOCK_DATA = true;

interface QuizAttempt {
  id: string;
  quizId: string;
  questionTitle: string;
  selectedChoice: string;
  isCorrect: boolean;
  rewardCandy: number;
  createdAt: string;
}

interface MonthlyStats {
  totalSolved: number;
  totalRewards: number;
  correctRate: number;
}

type TabType = 'quiz' | 'rewards';

export function RewardsPage() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    totalSolved: 0,
    totalRewards: 0,
    correctRate: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7) // YYYY-MM format
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('rewards');

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);

        if (USE_MOCK_DATA) {
          // Mock data 사용
          const mockData = getMockRewards(selectedMonth);
          setAttempts(mockData.attempts);
          setMonthlyStats(mockData.stats);
        } else {
          // 실제 API 호출
          const response = await authFetch(
            `/api/child/rewards?month=${selectedMonth}`
          );
          const data = await response.json();

          setAttempts(data.attempts || []);
          setMonthlyStats(data.stats || { totalSolved: 0, totalRewards: 0, correctRate: 0 });
        }
      } catch (error) {
        console.error("Failed to fetch rewards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [selectedMonth]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  // Generate last 6 months for filter
  const getMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const value = date.toISOString().slice(0, 7);
      const label = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
      });
      options.push({ value, label });
    }
    return options;
  };

  return (
    <div className="bg-white box-border flex flex-col gap-8 items-start pb-[400px] pt-8 px-8 relative min-h-[calc(100vh+400px)] w-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold leading-[57.6px] text-[#101828] text-5xl">
            보상 내역
          </h1>
          <p className="font-normal leading-[27px] text-[#475467] text-lg">
            문제를 풀고 받은 캔디 보상을 확인하세요
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          문제 풀러 가기
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-sm border border-purple-200">
          <div className="flex flex-col gap-2">
            <p className="text-purple-600 font-medium text-sm">이번 달 풀이 수</p>
            <p className="text-4xl font-bold text-purple-900">
              {monthlyStats.totalSolved}
              <span className="text-xl ml-2">문제</span>
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex flex-col gap-2">
            <p className="text-green-600 font-medium text-sm">이번 달 보상</p>
            <p className="text-4xl font-bold text-green-900">
              {monthlyStats.totalRewards}
              <span className="text-xl ml-2">🍬</span>
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-sm border border-blue-200">
          <div className="flex flex-col gap-2">
            <p className="text-blue-600 font-medium text-sm">정답률</p>
            <p className="text-4xl font-bold text-blue-900">
              {monthlyStats.correctRate.toFixed(1)}
              <span className="text-xl ml-2">%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Month Filter */}
      <div className="flex items-center gap-4 w-full">
        <label
          htmlFor="month-select"
          className="font-medium text-gray-700 text-lg"
        >
          기간 선택
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {getMonthOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 w-full border-b border-gray-200">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-6 py-3 font-semibold text-lg transition-colors relative ${
            activeTab === 'rewards'
              ? 'text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          보상 내역
          {activeTab === 'rewards' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-6 py-3 font-semibold text-lg transition-colors relative ${
            activeTab === 'quiz'
              ? 'text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          풀이 내역
          {activeTab === 'quiz' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
          )}
        </button>
      </div>

      {/* Quiz Attempts History */}
      {activeTab === 'quiz' && (
        <div className="flex flex-col gap-4 w-full">
          <h2 className="font-bold text-2xl text-gray-900">풀이 내역</h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : attempts.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-12 text-center">
            <p className="text-gray-500 text-lg">
              이 기간에 풀이한 문제가 없습니다
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              문제 풀러 가기
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                className={`bg-white border rounded-xl p-6 shadow-sm transition-all hover:shadow-md ${
                  attempt.isCorrect
                    ? "border-green-200 hover:border-green-300"
                    : "border-red-200 hover:border-red-300"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          attempt.isCorrect
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {attempt.isCorrect ? "정답 ✓" : "오답 ✗"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(attempt.createdAt).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {attempt.questionTitle}
                    </h3>
                    <p className="text-gray-600">
                      선택한 답: <span className="font-medium">{attempt.selectedChoice}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                      <span className="text-2xl">🍬</span>
                      <span className="font-bold text-xl text-yellow-700">
                        +{attempt.rewardCandy}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      )}

      {/* Rewards History (Candy-focused view) */}
      {activeTab === 'rewards' && (
        <div className="flex flex-col gap-4 w-full">
          <h2 className="font-bold text-2xl text-gray-900">보상 내역</h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : attempts.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <p className="text-gray-500 text-lg">
                이 기간에 받은 보상이 없습니다
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                문제 풀러 가기
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {(() => {
                // Group attempts by date
                const groupedByDate = attempts.reduce((acc, attempt) => {
                  const date = new Date(attempt.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push(attempt);
                  return acc;
                }, {} as Record<string, typeof attempts>);

                return Object.entries(groupedByDate).map(([date, dateAttempts]) => {
                  const totalCandyForDay = dateAttempts.reduce(
                    (sum, attempt) => sum + attempt.rewardCandy,
                    0
                  );
                  const problemCount = dateAttempts.length;

                  return (
                    <div
                      key={date}
                      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-center">
                        {/* Left: Date and problem count */}
                        <div className="flex flex-col gap-1">
                          <h3 className="font-bold text-lg text-gray-900">{date}</h3>
                          <p className="text-gray-500 text-sm">
                            {problemCount}개 문제 풀이
                          </p>
                        </div>

                        {/* Right: Total candy earned */}
                        <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-3 rounded-xl border border-yellow-200">
                          <span className="text-3xl">🍬</span>
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-2xl text-yellow-700">
                              +{totalCandyForDay}
                            </span>
                            <span className="text-xs text-yellow-600">캔디</span>
                          </div>
                        </div>
                      </div>

                      {/* Problem details (collapsed) */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-1 gap-2">
                          {dateAttempts.map((attempt) => (
                            <div
                              key={attempt.id}
                              className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    attempt.isCorrect ? "bg-green-500" : "bg-red-500"
                                  }`}
                                ></span>
                                <span className="text-sm text-gray-700 truncate">
                                  {attempt.questionTitle}
                                </span>
                              </div>
                              <span className="text-sm font-semibold text-yellow-600 ml-2">
                                +{attempt.rewardCandy} 🍬
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
