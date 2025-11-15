'use client'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ProfileHeader } from "../components/dashboard/ProfileHeader";
import { CharacterGachaBanner } from "../components/dashboard/CharacterGachaBanner";
import { QuizCategoryCard } from "../components/dashboard/QuizCategoryCard";
import { authFetch } from "../api/auth";

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string>("전체");
  useEffect(()=>{
    const fetchData = async () => {

     console.log('asldfhas;lghsdkfhalsekfj', await authFetch("/api/quiz", {method:"GET"}))
    }
    fetchData();

  },[])
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

  const handleStartQuiz = (category: string) => {
    navigate("/quiz", { state: { category } });
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

  // 카테고리 설명 생성 함수
  const getDescription = (title: string) => {
    return `${title}의 개념을 이해하고 다양한 문제를 풀어보세요.`;
  };

  // 난이도 결정 함수 (학년과 순서에 따라)
  const getDifficulty = (grade: string, index: number): "하" | "중" | "상" => {
    if (grade === "1학년") {
      return index < 4 ? "하" : index < 6 ? "중" : "상";
    } else if (grade === "2학년") {
      return index < 3 ? "하" : index < 6 ? "중" : "상";
    } else {
      return index < 2 ? "하" : index < 5 ? "중" : "상";
    }
  };

  // 학년별 카테고리 데이터
  const gradeCategories = {
    "1학년": [
      "소인수분해",
      "정수와 유리수",
      "문자의 사용과 식",
      "일차방정식",
      "좌표평면과 그래프",
      "자료의 정리와 해석",
      "기본 도형",
      "평면도형과 입체도형",
    ],
    "2학년": [
      "유리수와 순환소수",
      "식의 계산",
      "일차부등식",
      "연립일차방정식",
      "일차함수와 그래프",
      "도형의 성질",
      "도형의 닮음",
      "경우의 수와 확률",
    ],
    "3학년": [
      "제곱근과 실수",
      "다항식의 곱셈과 인수분해",
      "이차방정식",
      "이차함수와 그래프",
      "삼각비",
      "원의 성질",
      "통계",
    ],
  };

  // 선택된 학년에 따라 카테고리 필터링
  const getFilteredCategories = () => {
    if (selectedGrade === "전체") {
      // 전체 선택 시 모든 학년의 카테고리 표시
      const allCategories: Array<{
        title: string;
        description: string;
        difficulty: "하" | "중" | "상";
        problemCount: number;
        color: (typeof colors)[number];
        grade: string;
      }> = [];

      Object.entries(gradeCategories).forEach(([grade, categories]) => {
        categories.forEach((title, index) => {
          allCategories.push({
            title,
            description: getDescription(title),
            difficulty: getDifficulty(grade, index),
            problemCount: 8 + (index % 5), // 8-12 문제 (고정값)
            color: colors[index % colors.length],
            grade,
          });
        });
      });

      return allCategories;
    } else {
      // 특정 학년 선택 시 해당 학년의 카테고리만 표시
      return gradeCategories[selectedGrade as keyof typeof gradeCategories].map(
        (title, index) => ({
          title,
          description: getDescription(title),
          difficulty: getDifficulty(selectedGrade, index),
          problemCount: 8 + (index % 5), // 8-12 문제 (고정값)
          color: colors[index % colors.length],
          grade: selectedGrade,
        })
      );
    }
  };

  const quizCategories = getFilteredCategories();

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
          {quizCategories.map((category, index) => (
            <QuizCategoryCard
              key={`${category.grade || selectedGrade}-${
                category.title
              }-${index}`}
              title={category.title}
              description={category.description}
              difficulty={category.difficulty}
              problemCount={category.problemCount}
              color={category.color}
              grade={category.grade}
              onStart={() => handleStartQuiz(category.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
