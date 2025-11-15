import { useState, useEffect } from "react";
import { createPayment, getChildrenCount } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";

export function ParentPaymentPage() {
  const { user } = useAuth();
  const [childrenCount, setChildrenCount] = useState(0);
  const [depositorName, setDepositorName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingCount, setLoadingCount] = useState(true);

  const pricePerChild = 9900; // 자녀 1명당 월 9,900원
  const totalPrice = childrenCount * pricePerChild;

  // 자녀 수 조회
  useEffect(() => {
    const fetchChildrenCount = async () => {
      try {
        setLoadingCount(true);
        const data = await getChildrenCount();
        setChildrenCount(data.count);
      } catch (err) {
        console.error("Failed to fetch children count:", err);
        setError("자녀 수를 불러오는데 실패했습니다.");
      } finally {
        setLoadingCount(false);
      }
    };

    if (user) {
      fetchChildrenCount();
    }
  }, [user]);

  const handlePayment = async () => {
    if (!depositorName.trim()) {
      setError("입금자명을 입력해주세요.");
      return;
    }

    if (!user) {
      setError("로그인이 필요합니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 결제 시작일과 종료일 계산 (현재부터 1개월)
      const startAt = new Date();
      const endAt = new Date();
      endAt.setMonth(endAt.getMonth() + 1);

      const payment = await createPayment({
        amount: totalPrice,
        depositorName: depositorName.trim(),
        startAt,
        endAt,
      });

      alert(
        `결제가 성공적으로 접수되었습니다!\n\n` +
          `결제 ID: ${payment.id}\n` +
          `금액: ${payment.amount.toLocaleString()}원\n` +
          `입금자명: ${payment.depositorName}\n` +
          `상태: ${payment.status}\n\n` +
          `입금 확인 후 서비스가 활성화됩니다.`
      );

      // 입금자명 초기화
      setDepositorName("");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "결제 처리 중 오류가 발생했습니다.";
      setError(errorMessage);
      alert(`결제 실패: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            서비스 이용료 결제
          </h1>
          <p className="text-lg text-gray-600">자녀별 월 구독료를 결제하세요</p>
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

          {/* 자녀 수 표시 (읽기 전용) */}
          <div className="border-t border-gray-200 pt-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              등록된 자녀 수
            </label>
            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                {loadingCount ? (
                  <p className="text-2xl text-gray-400">로딩 중...</p>
                ) : (
                  <p className="text-4xl font-bold text-indigo-600">
                    {childrenCount}명
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  자녀 추가/제거는 부모 대시보드에서 가능합니다
                </p>
              </div>
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

        {/* 입금자명 입력 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">입금자 정보</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              입금자명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={depositorName}
              onChange={(e) => setDepositorName(e.target.value)}
              placeholder="입금자명을 입력하세요"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              disabled={isLoading}
            />
            <p className="mt-2 text-sm text-gray-500">
              입금 확인을 위해 실제 입금하실 분의 성함을 정확히 입력해주세요.
            </p>
          </div>
        </div>

        {/* 결제 수단 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">결제 수단</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg opacity-50 cursor-not-allowed">
              <input type="radio" name="payment" className="w-5 h-5" disabled />
              <span className="text-2xl">💳</span>
              <div className="flex-1">
                <span className="font-medium">신용카드</span>
                <span className="ml-2 text-sm text-orange-600 font-semibold">
                  (출시 준비중)
                </span>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors">
              <input
                type="radio"
                name="payment"
                defaultChecked
                className="w-5 h-5"
                disabled={isLoading}
              />
              <span className="text-2xl">🏦</span>
              <span className="font-medium">계좌이체</span>
            </label>
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg opacity-50 cursor-not-allowed">
              <input type="radio" name="payment" className="w-5 h-5" disabled />
              <span className="text-2xl">📱</span>
              <div className="flex-1">
                <span className="font-medium">
                  간편결제 (카카오페이, 네이버페이)
                </span>
                <span className="ml-2 text-sm text-orange-600 font-semibold">
                  (출시 준비중)
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              <span className="font-semibold">⚠️ 오류:</span> {error}
            </p>
          </div>
        )}

        {/* 결제 버튼 */}
        <button
          onClick={handlePayment}
          disabled={isLoading || !depositorName.trim()}
          className={`w-full py-4 rounded-xl font-bold text-xl transition-all shadow-lg ${
            isLoading || !depositorName.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl"
          }`}
        >
          {isLoading
            ? "처리 중..."
            : `${totalPrice.toLocaleString()}원 결제하기`}
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
