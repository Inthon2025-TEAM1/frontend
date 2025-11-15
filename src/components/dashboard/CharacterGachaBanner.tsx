const imgIcon3 = "/images/gacha-button-icon.png";

interface CharacterGachaBannerProps {
  onNavigate?: () => void;
}

export function CharacterGachaBanner({ onNavigate }: CharacterGachaBannerProps) {
  return (
    <div className="bg-gradient-to-b from-[#6941c6] h-[188.594px] overflow-hidden relative rounded-3xl shadow-lg shrink-0 to-[#10b981] w-full">
      {/* Decorative circles */}
      <div className="absolute bg-white/10 left-[1130px] rounded-full size-64 top-[-128px]" />
      <div className="absolute bg-white/10 left-[-96px] rounded-full size-48 top-[92.59px]" />
      
      <div className="absolute flex h-[92.594px] items-center justify-between left-12 top-12 w-[calc(100%-96px)]">
        <div className="h-[92.594px] relative shrink-0 w-auto">
          <div className="flex flex-col gap-2 h-[92.594px] items-start relative">
            <div className="h-[57.594px] relative shrink-0 w-auto">
              <p className="font-bold leading-[57.6px] text-5xl text-white whitespace-pre">
                캐릭터 뽑기
              </p>
            </div>
            <div className="h-[27px] relative shrink-0 w-auto">
              <p className="font-normal leading-[27px] text-lg text-white/90 whitespace-pre">
                사탕을 사용해서 귀여운 캐릭터를 뽑아보세요!
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onNavigate}
          className="bg-white h-14 relative rounded-xl shadow-sm shrink-0 w-auto px-8 hover:opacity-90 transition-opacity"
        >
          <div className="h-14 relative w-full flex items-center">
            <div className="absolute left-8 size-5 top-[18px]">
              <img alt="Gacha" className="block max-w-none size-full" src={imgIcon3} />
            </div>
            <p className="absolute font-medium leading-6 left-[60px] text-[#6941c6] text-base whitespace-pre top-[15px]">
              뽑기 하러가기
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

