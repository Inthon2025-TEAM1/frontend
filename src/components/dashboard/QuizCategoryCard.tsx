const imgVector = "http://localhost:3845/assets/13d09527a1d48f2ef337290b38521f99417879d7.svg";
const imgVector1 = "http://localhost:3845/assets/695a45260f963e830ff412f562ccd84abb9e864f.svg";

interface QuizCategoryCardProps {
  title: string;
  description: string;
  difficulty: "하" | "중" | "상";
  problemCount: number;
  color: "purple" | "green" | "orange" | "red";
  onStart?: () => void;
}

const colorMap = {
  purple: {
    bg: "bg-[#6941c6]",
    badge: "bg-[#6941c6]",
  },
  green: {
    bg: "bg-emerald-500",
    badge: "bg-emerald-500",
  },
  orange: {
    bg: "bg-[#fdb022]",
    badge: "bg-[#fdb022]",
  },
  red: {
    bg: "bg-[#f05252]",
    badge: "bg-[#f05252]",
  },
};

export function QuizCategoryCard({
  title,
  description,
  difficulty,
  problemCount,
  color,
  onStart,
}: QuizCategoryCardProps) {
  const colors = colorMap[color];

  return (
    <div className="bg-[#f8f4ff] flex flex-col items-start pb-0 pt-8 px-8 relative rounded-3xl shrink-0 h-full">
      <div className="flex flex-col gap-6 h-full items-start relative shrink-0 w-full">
        <div className="h-14 relative shrink-0 w-full">
          <div className="flex h-14 items-start justify-between relative w-full">
            <div className={`${colors.bg} relative rounded-xl shrink-0 size-14`}>
              <div className="flex flex-col items-start pb-0 pt-3 px-3 relative size-14">
                <div className="h-8 overflow-hidden relative shrink-0 w-full">
                  <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-[29.17%]">
                    <div className="absolute inset-[-7.14%_-1.33px]">
                      <img alt="Book" className="block max-w-none size-full" src={imgVector} />
                    </div>
                  </div>
                  <div className="absolute inset-[12.5%_8.33%]">
                    <div className="absolute inset-[-5.56%_-5%]">
                      <img alt="Book" className="block max-w-none size-full" src={imgVector1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${colors.badge} h-8 relative rounded-lg shrink-0 w-auto px-4`}>
              <div className="flex flex-col h-8 items-start pb-0 pt-1.5 px-4 relative w-auto">
                <div className="flex h-[19.333px] items-start relative shrink-0 w-full">
                  <p className="font-medium leading-6 relative shrink-0 text-base text-white whitespace-pre">
                    {difficulty}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-0 min-w-0 relative shrink-0 w-full">
          <div className="flex flex-col gap-2 h-full items-start relative w-full">
            <div className="h-[39px] relative shrink-0 w-full">
              <p className="font-semibold leading-[39px] text-[#101828] text-3xl whitespace-pre">
                {title}
              </p>
            </div>
            <div className="h-[27px] relative shrink-0 w-full">
              <p className="font-normal leading-[27px] text-[#475467] text-lg whitespace-pre">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="h-12 relative shrink-0 w-full">
          <div className="flex h-12 items-center justify-between relative w-full">
            <div className="h-6 relative shrink-0 w-auto">
              <p className="font-normal leading-6 text-[#475467] text-base">
                총 {problemCount}문제
              </p>
            </div>
            <button
              onClick={onStart}
              className={`${colors.bg} h-12 relative rounded-xl shrink-0 w-auto px-6 hover:opacity-90 transition-opacity`}
            >
              <p className="font-medium leading-6 text-base text-white whitespace-pre">
                시작하기
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

