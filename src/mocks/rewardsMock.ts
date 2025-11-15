// Mock data for quiz attempts and rewards

interface MockQuizAttempt {
  id: string;
  quizId: string;
  questionTitle: string;
  selectedChoice: string;
  isCorrect: boolean;
  rewardCandy: number;
  createdAt: string;
}

interface MockMonthlyStats {
  totalSolved: number;
  totalRewards: number;
  correctRate: number;
}

interface MockRewardsResponse {
  attempts: MockQuizAttempt[];
  stats: MockMonthlyStats;
}

// 2025년 11월 데이터 (15문제, 정답률 ~73%)
const november2025Attempts: MockQuizAttempt[] = [
  {
    id: "attempt_001",
    quizId: "quiz_101",
    questionTitle: "이차방정식 x² - 5x + 6 = 0의 해는?",
    selectedChoice: "x = 2 또는 x = 3",
    isCorrect: true,
    rewardCandy: 3,
    createdAt: "2025-11-15T14:30:00Z",
  },
  {
    id: "attempt_002",
    quizId: "quiz_102",
    questionTitle: "일차방정식 2x + 5 = 15의 해는?",
    selectedChoice: "x = 5",
    isCorrect: true,
    rewardCandy: 2,
    createdAt: "2025-11-15T13:20:00Z",
  },
  {
    id: "attempt_003",
    quizId: "quiz_103",
    questionTitle: "부등식 3x - 7 > 2의 해는?",
    selectedChoice: "x < 3",
    isCorrect: false,
    rewardCandy: 0,
    createdAt: "2025-11-14T16:45:00Z",
  },
  {
    id: "attempt_004",
    quizId: "quiz_104",
    questionTitle: "함수 f(x) = 2x + 1에서 f(3)의 값은?",
    selectedChoice: "7",
    isCorrect: true,
    rewardCandy: 2,
    createdAt: "2025-11-14T10:15:00Z",
  },
  {
    id: "attempt_005",
    quizId: "quiz_105",
    questionTitle: "이차방정식 x² - 4 = 0의 해는?",
    selectedChoice: "x = ±2",
    isCorrect: true,
    rewardCandy: 3,
    createdAt: "2025-11-13T15:30:00Z",
  },
  {
    id: "attempt_006",
    quizId: "quiz_106",
    questionTitle: "일차방정식 4x - 8 = 0의 해는?",
    selectedChoice: "x = 3",
    isCorrect: false,
    rewardCandy: 0,
    createdAt: "2025-11-13T11:20:00Z",
  },
  {
    id: "attempt_007",
    quizId: "quiz_107",
    questionTitle: "부등식 x + 5 ≤ 10의 해는?",
    selectedChoice: "x ≤ 5",
    isCorrect: true,
    rewardCandy: 2,
    createdAt: "2025-11-12T14:00:00Z",
  },
  {
    id: "attempt_008",
    quizId: "quiz_108",
    questionTitle: "함수 y = x²에서 x = 3일 때 y의 값은?",
    selectedChoice: "9",
    isCorrect: true,
    rewardCandy: 2,
    createdAt: "2025-11-12T09:30:00Z",
  },
  {
    id: "attempt_009",
    quizId: "quiz_109",
    questionTitle: "연립방정식 x + y = 5, x - y = 1의 해는?",
    selectedChoice: "x = 3, y = 2",
    isCorrect: true,
    rewardCandy: 3,
    createdAt: "2025-11-11T16:20:00Z",
  },
  {
    id: "attempt_010",
    quizId: "quiz_110",
    questionTitle: "이차방정식 x² + 2x - 3 = 0의 해는?",
    selectedChoice: "x = 1 또는 x = -3",
    isCorrect: true,
    rewardCandy: 3,
    createdAt: "2025-11-10T13:45:00Z",
  },
  {
    id: "attempt_011",
    quizId: "quiz_111",
    questionTitle: "일차함수 y = 3x - 2에서 x = 0일 때 y는?",
    selectedChoice: "y = -2",
    isCorrect: true,
    rewardCandy: 1,
    createdAt: "2025-11-09T15:10:00Z",
  },
  {
    id: "attempt_012",
    quizId: "quiz_112",
    questionTitle: "부등식 2x + 3 < 11의 해는?",
    selectedChoice: "x > 4",
    isCorrect: false,
    rewardCandy: 0,
    createdAt: "2025-11-08T10:30:00Z",
  },
  {
    id: "attempt_013",
    quizId: "quiz_113",
    questionTitle: "피타고라스 정리: 직각삼각형에서 빗변의 길이는? (a=3, b=4)",
    selectedChoice: "5",
    isCorrect: true,
    rewardCandy: 2,
    createdAt: "2025-11-07T14:20:00Z",
  },
  {
    id: "attempt_014",
    quizId: "quiz_114",
    questionTitle: "삼각형의 내각의 합은?",
    selectedChoice: "180°",
    isCorrect: true,
    rewardCandy: 1,
    createdAt: "2025-11-06T11:15:00Z",
  },
  {
    id: "attempt_015",
    quizId: "quiz_115",
    questionTitle: "원의 넓이 공식은? (반지름 r)",
    selectedChoice: "πr",
    isCorrect: false,
    rewardCandy: 0,
    createdAt: "2025-11-05T09:50:00Z",
  },
];

// 2025년 10월 데이터 (8문제, 정답률 ~62.5%)
const october2025Attempts: MockQuizAttempt[] = [
  {
    id: "attempt_016",
    quizId: "quiz_201",
    questionTitle: "이차방정식 x² - 9 = 0의 해는?",
    selectedChoice: "x = ±3",
    isCorrect: true,
    rewardCandy: 2,
    createdAt: "2025-10-28T15:30:00Z",
  },
  {
    id: "attempt_017",
    quizId: "quiz_202",
    questionTitle: "일차방정식 3x + 9 = 0의 해는?",
    selectedChoice: "x = -3",
    isCorrect: true,
    rewardCandy: 2,
    createdAt: "2025-10-25T10:20:00Z",
  },
  {
    id: "attempt_018",
    quizId: "quiz_203",
    questionTitle: "부등식 5x > 25의 해는?",
    selectedChoice: "x < 5",
    isCorrect: false,
    rewardCandy: 0,
    createdAt: "2025-10-22T14:15:00Z",
  },
  {
    id: "attempt_019",
    quizId: "quiz_204",
    questionTitle: "함수 f(x) = x² - 1에서 f(2)의 값은?",
    selectedChoice: "3",
    isCorrect: true,
    rewardCandy: 2,
    createdAt: "2025-10-20T11:45:00Z",
  },
  {
    id: "attempt_020",
    quizId: "quiz_205",
    questionTitle: "연립방정식 x + y = 10, x - y = 2의 해는?",
    selectedChoice: "x = 6, y = 4",
    isCorrect: true,
    rewardCandy: 3,
    createdAt: "2025-10-18T16:30:00Z",
  },
  {
    id: "attempt_021",
    quizId: "quiz_206",
    questionTitle: "이차방정식 x² + x - 6 = 0의 해는?",
    selectedChoice: "x = 2 또는 x = 3",
    isCorrect: false,
    rewardCandy: 0,
    createdAt: "2025-10-15T09:20:00Z",
  },
  {
    id: "attempt_022",
    quizId: "quiz_207",
    questionTitle: "일차함수 y = -2x + 4에서 x = 2일 때 y는?",
    selectedChoice: "y = 0",
    isCorrect: true,
    rewardCandy: 2,
    createdAt: "2025-10-12T13:10:00Z",
  },
  {
    id: "attempt_023",
    quizId: "quiz_208",
    questionTitle: "부등식 x - 3 ≥ 7의 해는?",
    selectedChoice: "x ≥ 4",
    isCorrect: false,
    rewardCandy: 0,
    createdAt: "2025-10-08T10:50:00Z",
  },
];

// 통계 계산 함수
function calculateStats(attempts: MockQuizAttempt[]): MockMonthlyStats {
  const totalSolved = attempts.length;
  const totalRewards = attempts.reduce((sum, attempt) => sum + attempt.rewardCandy, 0);
  const correctCount = attempts.filter((attempt) => attempt.isCorrect).length;
  const correctRate = totalSolved > 0 ? (correctCount / totalSolved) * 100 : 0;

  return {
    totalSolved,
    totalRewards,
    correctRate: Number(correctRate.toFixed(1)),
  };
}

// Mock API 함수
export function getMockRewards(month?: string): MockRewardsResponse {
  const targetMonth = month || new Date().toISOString().slice(0, 7);

  let attempts: MockQuizAttempt[] = [];

  if (targetMonth === "2025-11") {
    attempts = november2025Attempts;
  } else if (targetMonth === "2025-10") {
    attempts = october2025Attempts;
  } else {
    // 다른 월은 빈 데이터
    attempts = [];
  }

  return {
    attempts,
    stats: calculateStats(attempts),
  };
}

// 전체 데이터 export (필요시 사용)
export const mockRewardsData = {
  "2025-11": {
    attempts: november2025Attempts,
    stats: calculateStats(november2025Attempts),
  },
  "2025-10": {
    attempts: october2025Attempts,
    stats: calculateStats(october2025Attempts),
  },
};
