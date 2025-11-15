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
    <div className="bg-white flex h-[114px] items-center justify-between px-6 py-0 rounded-3xl shadow-lg shrink-0 w-full">
      <div className="h-[66px] relative shrink-0 w-auto">
        <div className="flex gap-4 h-[66px] items-center relative">
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
      </div>
      <div className="h-12 relative shrink-0 w-auto">
        <div className="flex gap-4 h-12 items-center relative">
          <div className="bg-[#fdb022] h-12 relative rounded-xl shadow-sm shrink-0 w-auto px-6">
            <div className="flex gap-2 h-12 items-center relative">
              <div className="relative shrink-0 size-5">
                <img alt="Candy" className="block max-w-none size-full" src={imgIcon1} />
              </div>
              <div className="h-6 relative shrink-0 w-auto">
                <p className="font-semibold leading-6 text-base text-white whitespace-pre">
                  {candyCount}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex gap-2 h-10 items-center pl-4 pr-0 py-0 relative hover:opacity-80 transition-opacity"
          >
            <div className="relative shrink-0 size-5">
              <img alt="Logout" className="block max-w-none size-full" src={imgIcon2} />
            </div>
            <div className="h-6 relative shrink-0 w-auto">
              <p className="font-normal leading-6 text-[#475467] text-base whitespace-pre">
                로그아웃
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

