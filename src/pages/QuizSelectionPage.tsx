import { useState } from "react";

// 타입 정의
type SchoolLevel = "elementary" | "middle";
type Grade = 1 | 2 | 3 | 4 | 5 | 6;
type Subject = "math" | "korean" | "science" | "social";

interface Chapter {
  id: string;
  title: string;
  description: string;
}

interface Quiz {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  questionCount: number;
}

interface ChapterWithQuizzes extends Chapter {
  quizzes: Quiz[];
}

// Dummy 데이터
const DUMMY_DATA = {
  elementary: {
    1: {
      math: {
        chapters: [
          {
            id: "addition-subtraction",
            title: "덧셈과 뺄셈",
            description: "9까지의 수를 더하고 빼는 방법을 배웁니다.",
            quizzes: [
              {
                id: "quiz-1",
                title: "덧셈 기초 (1~5)",
                difficulty: "easy" as const,
                questionCount: 10,
              },
              {
                id: "quiz-2",
                title: "덧셈 응용 (6~9)",
                difficulty: "medium" as const,
                questionCount: 15,
              },
              {
                id: "quiz-3",
                title: "뺄셈 기초 (1~5)",
                difficulty: "easy" as const,
                questionCount: 10,
              },
              {
                id: "quiz-4",
                title: "뺄셈 응용 (6~9)",
                difficulty: "medium" as const,
                questionCount: 15,
              },
              {
                id: "quiz-5",
                title: "덧셈과 뺄셈 종합",
                difficulty: "hard" as const,
                questionCount: 20,
              },
            ],
          },
          {
            id: "numbers",
            title: "50까지의 수",
            description: "50까지의 수를 세고 읽고 쓰는 방법을 배웁니다.",
            quizzes: [
              {
                id: "quiz-6",
                title: "20까지의 수",
                difficulty: "easy" as const,
                questionCount: 10,
              },
              {
                id: "quiz-7",
                title: "50까지의 수",
                difficulty: "medium" as const,
                questionCount: 12,
              },
            ],
          },
        ],
      },
    },
  },
};

export function QuizSelectionPage() {
  const [selectedSchoolLevel, setSelectedSchoolLevel] =
    useState<SchoolLevel | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  // 선택 초기화 함수들
  const handleSchoolLevelSelect = (level: SchoolLevel) => {
    setSelectedSchoolLevel(level);
    setSelectedGrade(null);
    setSelectedSubject(null);
    setExpandedChapter(null);
  };

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
    setSelectedSubject(null);
    setExpandedChapter(null);
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setExpandedChapter(null);
  };

  const handleChapterToggle = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const handleQuizStart = (quizId: string, quizTitle: string) => {
    // TODO: API 연결 시 퀴즈 시작 로직 구현
    console.log("Starting quiz:", quizId, quizTitle);
    alert(`"${quizTitle}" 퀴즈를 시작합니다!`);
  };

  // 현재 선택된 챕터 목록 가져오기
  const chapters: ChapterWithQuizzes[] =
    selectedSchoolLevel === "elementary" &&
    selectedGrade === 1 &&
    selectedSubject === "math"
      ? DUMMY_DATA.elementary[1].math.chapters
      : [];

  // 난이도 표시 함수
  const getDifficultyLabel = (difficulty: Quiz["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return { label: "쉬움", color: "bg-green-100 text-green-700" };
      case "medium":
        return { label: "보통", color: "bg-yellow-100 text-yellow-700" };
      case "hard":
        return { label: "어려움", color: "bg-red-100 text-red-700" };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          퀴즈 선택하기
        </h1>

        {/* 1단계: 학교급 선택 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            1. 학교급 선택
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => handleSchoolLevelSelect("elementary")}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedSchoolLevel === "elementary"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 bg-white hover:border-indigo-300"
              }`}
            >
              <div className="text-4xl mb-3">🏫</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                초등학교
              </h3>
              <p className="text-sm text-gray-600">
                초등학교 1학년부터 6학년까지
              </p>
            </button>

            <button
              onClick={() => handleSchoolLevelSelect("middle")}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedSchoolLevel === "middle"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 bg-white hover:border-indigo-300"
              }`}
            >
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                중학교
              </h3>
              <p className="text-sm text-gray-600">
                중학교 1학년부터 3학년까지
              </p>
            </button>
          </div>
        </section>

        {/* 2단계: 학년 선택 */}
        {selectedSchoolLevel && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. 학년 선택
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
        )}

        {/* 3단계: 과목 선택 */}
        {selectedGrade && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. 과목 선택
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <button
                onClick={() => handleSubjectSelect("math")}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedSubject === "math"
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                }`}
              >
                <div className="text-4xl mb-2">🔢</div>
                <h3 className="text-lg font-bold text-gray-900">수학</h3>
              </button>

              <button
                onClick={() => handleSubjectSelect("korean")}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedSubject === "korean"
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                }`}
              >
                <div className="text-4xl mb-2">📚</div>
                <h3 className="text-lg font-bold text-gray-900">국어</h3>
              </button>

              <button
                onClick={() => handleSubjectSelect("science")}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedSubject === "science"
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                }`}
              >
                <div className="text-4xl mb-2">🔬</div>
                <h3 className="text-lg font-bold text-gray-900">과학</h3>
              </button>

              <button
                onClick={() => handleSubjectSelect("social")}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedSubject === "social"
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                }`}
              >
                <div className="text-4xl mb-2">🌍</div>
                <h3 className="text-lg font-bold text-gray-900">사회</h3>
              </button>
            </div>
          </section>
        )}

        {/* 4단계: 목차 및 퀴즈 선택 (Accordion) */}
        {selectedSubject && chapters.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. 목차 및 퀴즈 선택
            </h2>
            <div className="space-y-3">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  {/* Accordion 헤더 */}
                  <button
                    onClick={() => handleChapterToggle(chapter.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-900">
                        {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {chapter.description}
                      </p>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform ${
                        expandedChapter === chapter.id ? "rotate-180" : ""
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

                  {/* Accordion 본문 (퀴즈 목록) */}
                  {expandedChapter === chapter.id && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="space-y-3">
                        {chapter.quizzes.map((quiz) => {
                          const difficulty = getDifficultyLabel(
                            quiz.difficulty
                          );
                          return (
                            <div
                              key={quiz.id}
                              className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow"
                            >
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  {quiz.title}
                                </h4>
                                <div className="flex items-center gap-3">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${difficulty.color}`}
                                  >
                                    {difficulty.label}
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    📝 {quiz.questionCount}문제
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleQuizStart(quiz.id, quiz.title)
                                }
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                              >
                                시작하기
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 선택된 과목이 있지만 챕터가 없는 경우 */}
        {selectedSubject && chapters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600">
              준비 중인 과목입니다. 곧 만나보실 수 있습니다!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
