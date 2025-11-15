import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ProfileHeader } from "../components/dashboard/ProfileHeader";
import { CharacterGachaBanner } from "../components/dashboard/CharacterGachaBanner";
import { QuizCategoryCard } from "../components/dashboard/QuizCategoryCard";

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  const quizCategories = [
    {
      title: "이차방정식",
      description: "이차방정식의 풀이 방법을 익히고 다양한 문제를 풀어보세요.",
      difficulty: "중" as const,
      problemCount: 10,
      color: "purple" as const,
    },
    {
      title: "일차방정식",
      description: "기초부터 탄탄하게! 일차방정식 문제를 풀어보세요.",
      difficulty: "하" as const,
      problemCount: 8,
      color: "green" as const,
    },
    {
      title: "부등식",
      description: "부등식의 성질을 이해하고 다양한 문제를 도전해보세요.",
      difficulty: "중" as const,
      problemCount: 10,
      color: "orange" as const,
    },
    {
      title: "함수",
      description: "함수의 개념과 그래프를 이해하고 심화 문제를 풀어보세요.",
      difficulty: "상" as const,
      problemCount: 12,
      color: "red" as const,
    },
  ];

  return (
    <div className="bg-white box-border flex flex-col gap-8 items-start pb-[400px] pt-8 px-8 relative min-h-[calc(100vh+400px)] w-full">
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
          <div className="h-[27px] relative shrink-0 w-full">
            <p className="font-normal leading-[27px] text-[#475467] text-lg whitespace-pre">
              원하는 주제를 선택하고 학습을 시작하세요
            </p>
          </div>
        </div>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 h-auto relative shrink-0 w-full">
          {quizCategories.map((category) => (
            <QuizCategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              difficulty={category.difficulty}
              problemCount={category.problemCount}
              color={category.color}
              onStart={() => handleStartQuiz(category.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}