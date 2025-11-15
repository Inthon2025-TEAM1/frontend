import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// 이미지 경로
const imgImageWithFallback = "/images/gacha-display.png";
const imgIcon = "/images/back-arrow-icon.png";
const imgIcon1 = "/images/profile-icon.png";
const imgIcon2 = "/images/candy-icon.png";
const imgIcon3 = "/images/sparkle-icon.png";

export function GachaPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "사용자";
  const candyCount = 42; // TODO: 실제 사탕 개수 가져오기

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleGacha = () => {
    // TODO: 캐릭터 뽑기 로직 구현
    if (candyCount < 10) {
      alert("사탕이 부족합니다. 퀴즈를 풀어서 사탕을 모으세요!");
      return;
    }
    console.log("캐릭터 뽑기 실행");
    // 뽑기 로직 구현
  };

  return (
    <div className="bg-white relative min-h-screen w-full">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="absolute flex gap-2 h-6 items-center left-8 top-8 w-auto hover:opacity-80 transition-opacity"
      >
        <div className="relative shrink-0 size-5">
          <img alt="Back" className="block max-w-none size-full" src={imgIcon} />
        </div>
        <div className="flex-1 min-h-0 min-w-0 relative shrink-0">
          <p className="font-normal leading-6 text-[#475467] text-base whitespace-pre">
            메인으로 돌아가기
          </p>
        </div>
      </button>

      {/* Main Content Container */}
      <div className="absolute h-[838px] left-1/2 top-[88px] w-[672px] -translate-x-1/2">
        {/* Profile Header */}
        <div className="absolute bg-white flex h-[114px] items-center justify-between left-0 px-6 py-0 rounded-3xl shadow-sm top-0 w-[672px]">
          <div className="h-[66px] relative shrink-0 w-auto">
            <div className="flex gap-4 h-[66px] items-center relative">
              <div className="bg-[#f8f4ff] relative rounded-full shrink-0 size-16">
                <div className="flex items-center justify-center relative size-16">
                  <div className="relative shrink-0 size-8">
                    <img alt="Profile" className="block max-w-none size-full" src={imgIcon1} />
                  </div>
                </div>
              </div>
              <div className="flex-1 min-h-0 min-w-0 relative shrink-0">
                <div className="flex flex-col h-[66px] items-start relative w-full">
                  <div className="h-[39px] relative shrink-0 w-full">
                    <p className="font-semibold leading-[39px] text-[#101828] text-3xl">
                      {displayName}님
                    </p>
                  </div>
                  <div className="h-[27px] relative shrink-0 w-full">
                    <p className="font-normal leading-[27px] text-[#475467] text-lg whitespace-pre">
                      캐릭터를 뽑아보세요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#fdb022] h-12 relative rounded-xl shadow-sm shrink-0 w-auto px-6">
            <div className="flex gap-2 h-12 items-center relative">
              <div className="relative shrink-0 size-5">
                <img alt="Candy" className="block max-w-none size-full" src={imgIcon2} />
              </div>
              <div className="h-6 relative shrink-0 w-auto">
                <p className="font-semibold leading-6 text-base text-white whitespace-pre">
                  {candyCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gacha Display Area */}
        <div className="absolute bg-[#f8f4ff] flex flex-col h-[500px] items-start left-0 overflow-hidden rounded-3xl shadow-lg top-[146px] w-[672px]">
          <div className="h-[500px] relative shrink-0 w-full">
            <img
              alt="Gacha Display"
              className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full"
              src={imgImageWithFallback}
            />
          </div>
        </div>

        {/* Gacha Button */}
        <button
          onClick={handleGacha}
          className="absolute bg-gradient-to-b flex gap-3 h-[72px] items-center justify-center left-0 rounded-3xl shadow-lg top-[678px] w-[672px] from-[#6941c6] to-[#10b981] hover:opacity-90 transition-opacity"
        >
          <div className="relative shrink-0 size-6">
            <img alt="Sparkle" className="block max-w-none size-full" src={imgIcon3} />
          </div>
          <div className="h-6 relative shrink-0 w-auto">
            <p className="font-semibold leading-6 text-base text-white whitespace-pre">
              뽑기 (10 사탕)
            </p>
          </div>
          <div className="relative shrink-0 size-6">
            <img alt="Sparkle" className="block max-w-none size-full" src={imgIcon3} />
          </div>
        </button>

        {/* Info Message */}
        <div className="absolute bg-[#f8f4ff] flex flex-col h-14 items-start left-0 pb-0 pt-4 px-4 rounded-xl top-[782px] w-[672px]">
          <div className="h-6 relative shrink-0 w-full">
            <p className="absolute font-normal leading-6 left-1/2 text-[#475467] text-base text-center whitespace-pre top-[-1px] -translate-x-1/2">
              💡 퀴즈를 풀어서 사탕을 모으고 캐릭터를 뽑아보세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

