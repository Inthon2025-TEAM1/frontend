// frontend/src/api/quiz.ts
import { authFetch } from "./auth";

// 백엔드에서 받아오는 퀴즈 문제 타입
export interface QuizQuestionResponse {
  id: number;
  grade: number;
  type: "객관식" | "단답형";
  chapterId: number;
  question: {
    text: string;
    difficulty?: "하" | "중" | "상";
  } | string;
  choices: string[] | null;
  answer: string;
  explain: string;
  createdAt: string;
  updatedAt: string;
}

// 프론트엔드에서 사용하는 문제 타입
export interface QuizProblem {
  id: number;
  question: string;
  answer: string;
  explanation: string;
  difficulty: "하" | "중" | "상";
  category: string;
}

/**
 * 챕터 ID로 퀴즈 문제 목록 가져오기
 */
export async function getQuizQuestionsByChapter(
  chapterId: number
): Promise<QuizProblem[]> {
  const response = await authFetch(`/api/quiz?chapterId=${chapterId}`);
  
  if (!response.ok) {
    throw new Error(`퀴즈 문제를 가져오는데 실패했습니다: ${response.statusText}`);
  }

  const questions: QuizQuestionResponse[] = await response.json();
  
  // 백엔드 형식을 프론트엔드 형식으로 변환
  return questions.map((q) => {
    const questionText = typeof q.question === "string" 
      ? q.question 
      : q.question.text || "";
    
    return {
      id: q.id,
      question: questionText,
      answer: q.answer,
      explanation: q.explain || "",
      difficulty: (typeof q.question === "object" && q.question.difficulty) 
        ? q.question.difficulty 
        : "중",
      category: "", // chapterId로부터 가져와야 함
    };
  });
}


/**
 * 정답 제출
 */
export async function submitQuizAnswer(
  quizId: number,
  answer: string
): Promise<{ isCorrect: boolean; rewardCandy: number; explanation: string | null }> {
  const response = await authFetch("/api/quiz/submit", {
    method: "POST",
    body: JSON.stringify({ quizId, answer }),
  });

  if (!response.ok) {
    throw new Error(`정답 제출에 실패했습니다: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * AI 약점 분석 결과 가져오기
 */
export async function getWeaknessAnalysis(): Promise<{
  weaknesses: Array<{
    category: string;
    chapterId: number;
    problemCount: number;
    accuracyRate: number;
    commonMistakes: string[];
    priority: 'high' | 'medium' | 'low';
  }>;
  recommendations: string[];
  overallScore: number;
  improvementAreas: string[];
}> {
  const response = await authFetch("/api/ai/analyze-weakness");
  
  if (!response.ok) {
    throw new Error(`약점 분석을 가져오는데 실패했습니다: ${response.statusText}`);
  }

  return await response.json();
}

