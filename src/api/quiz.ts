import { authFetch } from "./auth";

export interface Weakness {
  category: string;
  chapterId: number;
  problemCount: number;
  accuracyRate: number;
  commonMistakes: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface AnalysisResult {
  weaknesses: Weakness[];
  recommendations: string[];
  overallScore: number;
  improvementAreas: string[];
}

/**
 * 약점 분석 데이터를 가져옵니다.
 * @returns 약점 분석 결과
 */
export async function getWeaknessAnalysis(): Promise<AnalysisResult> {
  try {
    const response = await authFetch("/api/ai/analyze-weakness", {
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "약점 분석 데이터를 가져오는데 실패했습니다.";
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // JSON 파싱 실패 시 원본 텍스트 사용
        if (errorText) {
          errorMessage = `${errorMessage} (${response.status}: ${errorText})`;
        } else {
          errorMessage = `${errorMessage} (HTTP ${response.status})`;
        }
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

