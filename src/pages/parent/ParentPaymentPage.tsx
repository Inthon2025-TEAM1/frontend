import { useState } from "react";

export function ParentPaymentPage() {
  const [childrenCount, setChildrenCount] = useState(2);
  const pricePerChild = 9900; // 자녀 1명당 월 9,900원
  const totalPrice = childrenCount * pricePerChild;

  const handlePayment = () => {
    // TODO: 실제 결제 API 연동
    alert(
      `${childrenCount}명 × ${pricePerChild.toLocaleString()}원 = ${totalPrice.toLocaleString()}원\n결제가 진행됩니다.`
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            서비스 이용료 결제
          </h1>
          <p className="text-lg text-gray-600">
            자녀별 월 구독료를 결제하세요
          </p>
        </div>

        {/* 요금제 안내 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">💳</span>
            <h2 className="text-2xl font-bold text-gray-900">요금 안내</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-700 mb-2">자녀 1명당 월</p>
                <p className="text-4xl font-bold text-purple-600">
                  {pricePerChild.toLocaleString()}원
                </p>
              </div>
              <div className="text-6xl">👨‍👩‍👧‍👦</div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span>무제한 학습 문제 제공</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span>실시간 학습 현황 모니터링</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span>멘토링 신청 서비스</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-600">✓</span>
              <span>캔디 리워드 시스템</span>
            </div>
          </div>

          {/* 자녀 수 선택 */}
          <div className="border-t border-gray-200 pt-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              등록된 자녀 수
            </label>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setChildrenCount(Math.max(1, childrenCount - 1))}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center">
                <p className="text-4xl font-bold text-indigo-600">
                  {childrenCount}명
                </p>
              </div>
              <button
                onClick={() => setChildrenCount(childrenCount + 1)}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition-colors"
              >
                +
              </button>
            </div>

            {/* 총 금액 */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg text-gray-700">월 총 결제 금액</span>
                <span className="text-3xl font-bold text-gray-900">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
              <p className="text-sm text-gray-500 text-right">
                ({childrenCount}명 × {pricePerChild.toLocaleString()}원)
              </p>
            </div>
          </div>
        </div>

        {/* 결제 수단 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">결제 수단</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors">
              <input
                type="radio"
                name="payment"
                defaultChecked
                className="w-5 h-5"
              />
              <span className="text-2xl">💳</span>
              <span className="font-medium">신용카드</span>
            </label>
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors">
              <input type="radio" name="payment" className="w-5 h-5" />
              <span className="text-2xl">🏦</span>
              <span className="font-medium">계좌이체</span>
            </label>
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors">
              <input type="radio" name="payment" className="w-5 h-5" />
              <span className="text-2xl">📱</span>
              <span className="font-medium">간편결제 (카카오페이, 네이버페이)</span>
            </label>
          </div>
        </div>

        {/* 결제 버튼 */}
        <button
          onClick={handlePayment}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
        >
          {totalPrice.toLocaleString()}원 결제하기
        </button>

        {/* 안내 문구 */}
        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">※ 안내사항:</span>
            <br />- 매월 자동 결제됩니다.
            <br />- 자녀 추가/제거 시 다음 결제부터 반영됩니다.
            <br />- 환불은 결제일로부터 7일 이내 가능합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
