'use client'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ProfileHeader } from "../components/dashboard/ProfileHeader";
import { CharacterGachaBanner } from "../components/dashboard/CharacterGachaBanner";
import { QuizCategoryCard } from "../components/dashboard/QuizCategoryCard";
import { authFetch } from "../api/auth";

interface Chapter {
  id: number;
  chapterName: string;
  chapterDescription: string;
  chapterOrder: number;
  gradeLevel?: number;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string>("전체");
  const [chapters, setChapters] = useState<Array<Chapter>>([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
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
          const allChapters = [
            ...(Array.isArray(grade1Data) ? grade1Data : []),
            ...(Array.isArray(grade2Data) ? grade2Data : []),
            ...(Array.isArray(grade3Data) ? grade3Data : []),
          ];
          setChapters(allChapters);
        } else {
          // 특정 학년 선택 시 해당 학년만 호출
          const gradeLevel = parseInt(selectedGrade.replace("학년", ""));
          const res = await authFetch(`/api/quiz/chapters?gradeLevel=${gradeLevel}`, {
            method: "GET",
          });
          const data = await res.json();
          setChapters(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to fetch chapters:", error);
        setChapters([]);
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

  const handleGachaNavigate = () => {
    navigate("/gacha");
  };

  const handleStartQuiz = (chapterId: number, chapterName: string) => {
    navigate(`/quiz?chapterId=${chapterId}&chapterName=${encodeURIComponent(chapterName)}`);
  };

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

  // API 데이터를 카드 props로 변환
  const quizCategories = chapters.map((chapter, index) => ({
    id: chapter.id,
    title: chapter.chapterName,
    description: chapter.chapterDescription || `${chapter.chapterName}의 개념을 이해하고 다양한 문제를 풀어보세요.`,
    difficulty: getDifficulty(chapter.chapterOrder),
    problemCount: 10, // 고정값 (필요시 API에서 가져올 수 있음)
    color: colors[index % colors.length],
    grade: getGradeDisplay(chapter.gradeLevel),
  }));

  return (
    <div className="bg-white box-border flex flex-col gap-8 items-start pb-[120px] pt-8 px-8 relative min-h-[calc(100vh+120px)] w-full">
      {/* Profile Header */}
      <ProfileHeader candyCount={42} onLogout={handleLogout} />

      {/* Character Gacha Banner */}
      <CharacterGachaBanner onNavigate={handleGachaNavigate} />

      {/* Learning Categories */}
      <div className="flex flex-col gap-6 items-start relative shrink-0 w-full">
        <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
          <div className="h-[57.594px] relative shrink-0 w-full">
            <p className="font-bold leading-[57.6px] text-[#101828] text-5xl whitespace-pre">
              학습 카테고리
            </p>
          </div>
          <div className="h-[27px] relative shrink-0 w-full flex items-center justify-between">
            <p className="font-normal leading-[27px] text-[#475467] text-lg whitespace-pre">
              원하는 주제를 선택하고 학습을 시작하세요
            </p>
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="appearance-none bg-white border border-[#d0d5dd] rounded-lg px-4 py-1.5 pr-8 text-[#475467] text-base font-normal leading-6 cursor-pointer hover:border-[#6941c6] focus:outline-none focus:ring-2 focus:ring-[#6941c6] focus:border-transparent"
              >
                <option value="전체">전체</option>
                <option value="1학년">1학년</option>
                <option value="2학년">2학년</option>
                <option value="3학년">3학년</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-[#475467]"
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
        </div>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto relative shrink-0 w-full">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <p className="text-[#475467] text-lg">로딩 중...</p>
            </div>
          ) : quizCategories.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <p className="text-[#475467] text-lg">챕터가 없습니다.</p>
            </div>
          ) : (
            quizCategories.map((category, index) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
