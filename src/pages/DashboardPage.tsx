'use client'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ProfileHeader } from "../components/dashboard/ProfileHeader";
import { QuizCategoryCard } from "../components/dashboard/QuizCategoryCard";
import { authFetch, fetchCandyCount } from "../api/auth";

interface Chapter {
  id: number;
  chapterName: string;
  chapterDescription: string;
  chapterOrder: number;
  gradeLevel?: number;
}

interface QuizCategory {
  id: number;
  title: string;
  description: string;
  difficulty: "하" | "중" | "상";
  problemCount: number;
  color: "purple" | "green" | "orange" | "red" | "blue" | "indigo" | "teal" | "cyan" | "pink" | "amber" | "violet" | "rose";
  grade: string;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string>("전체");
  const [chapters, setChapters] = useState<Array<Chapter>>([])
  const [quizCategories, setQuizCategories] = useState<Array<QuizCategory>>([])
  const [isLoading, setIsLoading] = useState(false);
  const [candyCount, setCandyCount] = useState<number>(0);

  // 색상 배열 (순환 사용)
  const colors: Array<
    | "purple"
    | "green"
    | "orange"
    | "red"
    | "blue"
    | "indigo"
    | "teal"
    | "cyan"
    | "pink"
    | "amber"
    | "violet"
    | "rose"
  > = [
    "purple",
    "green",
    "orange",
    "red",
    "blue",
    "indigo",
    "teal",
    "cyan",
    "pink",
    "amber",
    "violet",
    "rose",
  ];

  // 난이도 결정 함수 (챕터 순서에 따라)
  const getDifficulty = (chapterOrder: number): "하" | "중" | "상" => {
    if (chapterOrder <= 3) return "하";
    if (chapterOrder <= 6) return "중";
    return "상";
  };

  // 학년 레벨을 한글 학년으로 변환
  const getGradeDisplay = (gradeLevel?: number): string => {
    if (!gradeLevel) return "";
    return `${gradeLevel}학년`;
  };

  // 캔디 개수 가져오기
  useEffect(() => {
    const loadCandyCount = async () => {
      try {
        const data = await fetchCandyCount();
        setCandyCount(data.candy);
      } catch (error) {
        console.error("Failed to fetch candy count:", error);
      }
    };
    loadCandyCount();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let fetchedChapters: Chapter[] = [];

        if (selectedGrade === "전체") {
          // 전체 선택 시 1, 2, 3학년 모두 호출
          const [grade1Res, grade2Res, grade3Res] = await Promise.all([
            authFetch(`/api/quiz/chapters?gradeLevel=1`, { method: "GET" }),
            authFetch(`/api/quiz/chapters?gradeLevel=2`, { method: "GET" }),
            authFetch(`/api/quiz/chapters?gradeLevel=3`, { method: "GET" }),
          ]);

          const [grade1Data, grade2Data, grade3Data] = await Promise.all([
            grade1Res.json(),
            grade2Res.json(),
            grade3Res.json(),
          ]);

          // 모든 학년의 데이터를 합침
          fetchedChapters = [
            ...(Array.isArray(grade1Data) ? grade1Data : []),
            ...(Array.isArray(grade2Data) ? grade2Data : []),
            ...(Array.isArray(grade3Data) ? grade3Data : []),
          ];
        } else {
          // 특정 학년 선택 시 해당 학년만 호출
          const gradeLevel = parseInt(selectedGrade.replace("학년", ""));
          const res = await authFetch(`/api/quiz/chapters?gradeLevel=${gradeLevel}`, {
            method: "GET",
          });
          const data = await res.json();
          console.log('data',data)
          fetchedChapters = Array.isArray(data) ? data : [];
        }

        setChapters(fetchedChapters);

        const categoryPromises = fetchedChapters.map(async (chapter, index) => {
          const response = await authFetch(`/api/quiz?chapterId=${chapter.id}`, {
            method: "GET",
          });

          // ❗ URL 여기 ? ? 로 두 번 쓰면 안 됨
          const statusRes = await authFetch(
            `/api/quiz/status?userId=${user?.uid}&chapterId=${chapter.id}`
          );

          const data = await response.json();
          const statusJson = await statusRes.json();

          const isComplete = statusJson?.isCompleted; // 실제 응답 구조에 맞게 수정
          console.log('statusRes',isComplete, data)

          // 완료된 챕터면 null 반환해서 나중에 걸러냄
          if (isComplete) return null;

          return {
            id: chapter.id,
            title: chapter.chapterName,
            description:
              chapter.chapterDescription ||
              `${chapter.chapterName}의 개념을 이해하고 다양한 문제를 풀어보세요.`,
            difficulty: getDifficulty(chapter.chapterOrder),
            problemCount: Array.isArray(data) ? data.length : 10,
            color: colors[index % colors.length],
            grade: getGradeDisplay(chapter.gradeLevel),
          } satisfies QuizCategory;
        });


      const categoryResults = await Promise.all(categoryPromises);

      // 👇 null 제거 + 타입 좁히기
      const categories: QuizCategory[] = categoryResults.filter(
        (item): item is QuizCategory => item !== null
      );
        // 모든 API 호출이 완료될 때까지 기다림
        setQuizCategories(categories);
      } catch (error) {
        console.error("Failed to fetch chapters:", error);
        setChapters([]);
        setQuizCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedGrade])
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleStartQuiz = (chapterId: number, chapterName: string) => {
    navigate(`/quiz?chapterId=${chapterId}&chapterName=${encodeURIComponent(chapterName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 py-8">
        {/* Profile Header */}
        <div className="mb-8 max-w-[95%] mx-auto">
          <ProfileHeader candyCount={candyCount} onLogout={handleLogout} />
        </div>

        {/* Learning Categories */}
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-[95%] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                학습 카테고리
              </h2>
              <p className="text-lg text-gray-600">
                원하는 주제를 선택하고 학습을 시작하세요
              </p>
            </div>
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 text-base font-normal cursor-pointer hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              >
                <option value="전체">전체</option>
                <option value="1학년">1학년</option>
                <option value="2학년">2학년</option>
                <option value="3학년">3학년</option>
              </select>
              <div className="absolute -translate-y-1/2 pointer-events-none right-2 top-1/2">
                <svg
                  className="w-4 h-4 text-gray-600"
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
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-600 text-lg">로딩 중...</p>
            </div>
          ) : quizCategories.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-600 text-lg">챕터가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {quizCategories.map((category, index) => (
                <QuizCategoryCard
                  key={`${category.id}-${category.title}-${index}`}
                  title={category.title}
                  description={category.description}
                  difficulty={category.difficulty}
                  problemCount={category.problemCount}
                  color={category.color}
                  grade={category.grade}
                  onStart={() => handleStartQuiz(category.id, category.title)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
