// GamePage.tsx
import LootBoxGacha from "./LootBoxGacha";
import { useState } from "react";

export default function GamePage() {
  const [showBox, setShowBox] = useState(false);

  const handleCorrectAnswer = () => {
    // 문제 맞추면 상자깡 기회!
    setShowBox(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      {/* 문제 / UI */}
      <button
        className="mb-8 px-4 py-2 rounded-lg bg-emerald-600"
        onClick={handleCorrectAnswer}
      >
        (테스트) 정답 맞춘 걸로 치기 ✅
      </button>

      {showBox && (
        <LootBoxGacha

        />
      )}
    </div>
  );
}


