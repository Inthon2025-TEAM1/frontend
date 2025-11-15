import { useState, useEffect } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
} from "@rive-app/react-canvas";

const STATE_MACHINE_NAME = "State Machine 1";
const OPEN_INPUT_NAME = "Open";

export default function LootBoxGacha() {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: "/lootbox.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: false, // 일단 false로 만들고
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  // ✅ rive 인스턴스가 준비되면 여기서 play
  useEffect(() => {
    if (rive) {
      rive.play(); // idle 루프 재생 (state machine 안에 idle이 있다고 가정)
    }
  }, [rive]);

  const openInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    OPEN_INPUT_NAME
  );

  const handleClick = () => {
    if (!rive || !openInput || isOpening) return;

    setIsOpening(true);

    // Trigger 타입이면 fire()
    if ("fire" in openInput && typeof openInput.fire === "function") {
      openInput.fire();
    } else {
      // bool 타입이면 value = true
      // (필요하면 주석 해제해서 사용)
      // openInput.value = true;
    }

    setTimeout(() => {
      setIsOpening(false);
      setIsOpened(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`
          w-[260px] h-[260px] cursor-pointer
          ${isOpening ? "animate-pulse" : ""}
        `}
        onClick={handleClick}
      >
        <RiveComponent />
      </div>

      {!isOpened && !isOpening && (
        <p className="text-sm text-gray-300">상자를 눌러 열어보세요 🎁</p>
      )}
      {isOpening && (
        <p className="text-sm text-yellow-300 font-semibold">
          열리는 중... ✨
        </p>
      )}
      {isOpened && (
        <div className="mt-2 px-4 py-2 rounded-xl bg-purple-700/80 text-white shadow-lg text-center">
          <p className="text-xs opacity-80">획득한 보상</p>
          <p className="text-lg font-bold mt-1">SSR 전설 카드</p>
        </div>
      )}
    </div>
  );
}
