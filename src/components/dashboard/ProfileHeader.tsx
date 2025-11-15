import { useAuth } from "../../hooks/useAuth";

// 이미지 경로
const imgIcon = "/images/profile-icon.png";
const imgIcon1 = "/images/candy-icon.png";
const imgIcon2 = "/images/logout-icon.png";

interface ProfileHeaderProps {
  candyCount?: number;
  onLogout: () => void;
}

export function ProfileHeader({ candyCount = 42, onLogout }: ProfileHeaderProps) {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "사용자";

  return (
    <div className="flex h-[66px] items-center gap-4">
      <div className="bg-[#f8f4ff] relative rounded-full shrink-0 size-16">
        <div className="flex items-center justify-center relative size-16">
          <div className="relative shrink-0 size-8">
            <img alt="Profile" className="block max-w-none size-full" src={imgIcon} />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-[66px] items-start relative">
        <div className="h-[39px] relative shrink-0 w-auto">
          <p className="font-semibold leading-[39px] text-[#101828] text-3xl">
            {displayName}님, 환영합니다!
          </p>
        </div>
        <div className="h-[27px] relative shrink-0 w-auto">
          <p className="font-normal leading-[27px] text-[#475467] text-lg whitespace-pre">
            오늘도 열심히 학습해봐요
          </p>
        </div>
      </div>
    </div>
  );
}

