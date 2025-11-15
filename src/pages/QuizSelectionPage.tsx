import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../api/auth";

// 타입 정의
type Grade = 1 | 2 | 3 | 4 | 5 | 6;

interface Chapter {
  id: number;
  chapterName: string;
  chapterOrder: number;
}

export function QuizSelectionPage() {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 학년 선택 시 챕터 목록 조회
  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedGrade) {
        setChapters([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await authFetch(
          `/api/quiz/chapters?gradeLevel=${selectedGrade}`
        );

        if (!response.ok) {
          throw new Error("챕터 목록을 가져오는데 실패했습니다.");
        }

        const data = await response.json();
        setChapters(data);
      } catch (err) {
        console.error("Failed to fetch chapters:", err);
        setError(
          err instanceof Error ? err.message : "챕터를 불러올 수 없습니다."
        );
        setChapters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [selectedGrade]);

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
  };

  const handleChapterSelect = (chapter: Chapter) => {
    // QuizPage로 이동
    const params = new URLSearchParams({
      chapterId: chapter.id.toString(),
      grade: selectedGrade?.toString() || "",
      chapterName: chapter.chapterName,
    });

    navigate(`/quiz?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          퀴즈 선택하기
        </h1>

        {/* 1단계: 학년 선택 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            1. 학년 선택
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((grade) => (
              <button
                key={grade}
                onClick={() => handleGradeSelect(grade as Grade)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedGrade === grade
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                }`}
              >
                <p className="text-2xl font-bold text-gray-900">
                  {grade}학년
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* 2단계: 챕터 선택 */}
        {selectedGrade && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. 학습 주제 선택
            </h2>

            {loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-gray-600">학습 주제를 불러오는 중...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {!loading && !error && chapters.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => handleChapterSelect(chapter)}
                    className="p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">📖</div>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {chapter.chapterOrder}번째
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {chapter.chapterName}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mt-4">
                      <span>학습 시작하기 →</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!loading && !error && chapters.length === 0 && selectedGrade && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-gray-600">
                  {selectedGrade}학년 학습 주제가 아직 준비되지 않았습니다.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
