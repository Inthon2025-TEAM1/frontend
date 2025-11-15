import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  storeItems,
  categoryLabels,
  rarityColors,
  rarityLabels,
  type ItemCategory,
  type StoreItem,
} from "../mocks/storeMock";

export function StorePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('cafe');
  const [userCandy, setUserCandy] = useState(150); // Mock user candy (나중에 실제 데이터로 대체)
  const [ownedItems, setOwnedItems] = useState<Set<string>>(new Set()); // 구매한 아이템 ID

  // 카테고리별 아이템 필터링
  const filteredItems = storeItems.filter(
    (item) => item.category === selectedCategory
  );

  // 구매 처리
  const handlePurchase = (item: StoreItem) => {
    if (ownedItems.has(item.id)) {
      alert('이미 구매한 아이템입니다!');
      return;
    }

    if (userCandy < item.price) {
      alert('캔디가 부족합니다! 문제를 더 풀어보세요.');
      return;
    }

    const confirmed = window.confirm(
      `${item.name}을(를) ${item.price} 캔디에 구매하시겠습니까?`
    );

    if (confirmed) {
      setUserCandy(userCandy - item.price);
      setOwnedItems(new Set(ownedItems).add(item.id));
      alert(`${item.name}을(를) 구매했습니다! 🎉`);
    }
  };

  return (
    <div className="bg-white box-border flex flex-col gap-8 items-start pb-[400px] pt-8 px-8 relative min-h-[calc(100vh+400px)] w-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold leading-[57.6px] text-[#101828] text-5xl">
            상점
          </h1>
          <p className="font-normal leading-[27px] text-[#475467] text-lg">
            캔디로 멋진 아이템을 구매하세요
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          대시보드로
        </button>
      </div>

      {/* User Candy Display */}
      <div className="w-full bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-6xl">🍬</span>
            <div className="flex flex-col">
              <p className="text-sm text-yellow-600 font-medium">보유 캔디</p>
              <p className="text-4xl font-bold text-yellow-700">{userCandy}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/rewards")}
            className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors shadow-md"
          >
            더 모으러 가기 →
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 w-full border-b border-gray-200 overflow-x-auto">
        {(Object.keys(categoryLabels) as ItemCategory[]).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 font-semibold text-lg transition-colors relative whitespace-nowrap ${
              selectedCategory === category
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {categoryLabels[category]}
            {selectedCategory === category && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const isOwned = ownedItems.has(item.id);
            const canAfford = userCandy >= item.price;
            const colors = rarityColors[item.rarity];

            return (
              <div
                key={item.id}
                className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-6 flex flex-col gap-4 transition-all hover:shadow-lg ${
                  isOwned ? 'opacity-75' : 'hover:scale-105'
                }`}
              >
                {/* Rarity Badge */}
                <div className="flex justify-between items-start">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border}`}
                  >
                    {rarityLabels[item.rarity]}
                  </span>
                  {isOwned && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-300">
                      소유중
                    </span>
                  )}
                </div>

                {/* Item Icon */}
                <div className="flex justify-center">
                  <span className="text-7xl">{item.icon}</span>
                </div>

                {/* Item Info */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-xl text-gray-900 text-center">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center min-h-[40px]">
                    {item.description}
                  </p>
                  {/* Value Display */}
                  <div className="flex justify-center">
                    <span className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 font-bold text-indigo-700">
                      {item.value}
                    </span>
                  </div>
                </div>

                {/* Price and Purchase Button */}
                <div className="flex flex-col gap-2 mt-auto">
                  <div className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-gray-200">
                    <span className="text-2xl">🍬</span>
                    <span className="font-bold text-2xl text-gray-800">
                      {item.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={isOwned || !canAfford}
                    className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                      isOwned
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : canAfford
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isOwned ? '구매 완료' : canAfford ? '구매하기' : '캔디 부족'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="bg-gray-50 rounded-xl p-12 text-center">
            <p className="text-gray-500 text-lg">
              이 카테고리에는 아직 아이템이 없습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
