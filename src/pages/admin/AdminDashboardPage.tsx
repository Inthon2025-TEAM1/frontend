import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../api/auth";
import { auth } from "../../firebase/firebase";

interface PendingPayment {
  id: number;
  parentId: number;
  amount: number;
  depositorName: string;
  status: string;
  createdAt: string;
  paidAt: string | null;
  startAt: string | null;
}

interface MentoringRequest {
  id: number;
  title: string;
  childName: string;
  childAge: string;
  requirement: string;
  status: string;
  createdAt: string;
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
  const [mentoringRequests, setMentoringRequests] = useState<MentoringRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load pending payments
      const paymentsResponse = await authFetch("/api/admin/pending-payments");
      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json();
        setPendingPayments(paymentsData);
      }

      // Load mentoring requests
      const mentoringResponse = await authFetch("/api/admin/pending");
      if (mentoringResponse.ok) {
        const mentoringData = await mentoringResponse.json();
        setMentoringRequests(mentoringData);
      }
    } catch (error) {
      console.error("Failed to load admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovePayment = async (paymentId: number) => {
    try {
      const response = await authFetch(`/api/admin/${paymentId}/approve`, {
        method: "PATCH",
      });

      if (response.ok) {
        alert("결제가 승인되었습니다.");
        loadData();
      } else {
        alert("결제 승인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to approve payment:", error);
      alert("결제 승인 중 오류가 발생했습니다.");
    }
  };

  const handleUpdateMentoringStatus = async (requestId: number, status: string) => {
    try {
      const response = await authFetch(`/api/admin/${requestId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        alert(`멘토링 신청이 ${status === "matched" ? "매칭" : "거절"}되었습니다.`);
        loadData();
      } else {
        alert("상태 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to update mentoring status:", error);
      alert("상태 업데이트 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">데이터 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">🔧 관리자 대시보드</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Pending Payments Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            💳 결제 승인 대기 목록
            <span className="text-lg font-normal text-gray-600">({pendingPayments.length}건)</span>
          </h2>

          {pendingPayments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600">승인 대기 중인 결제가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {payment.depositorName}
                        </h3>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                          {payment.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-gray-600">
                        <p>금액: <span className="font-semibold text-purple-600">{payment.amount.toLocaleString()}원</span></p>
                        <p>신청일: {new Date(payment.paidAt || payment.startAt || payment.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApprovePayment(payment.id)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      승인
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mentoring Requests Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            👨‍🏫 멘토링 신청 목록
            <span className="text-lg font-normal text-gray-600">({mentoringRequests.length}건)</span>
          </h2>

          {mentoringRequests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600">대기 중인 멘토링 신청이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {mentoringRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{request.title}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {request.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-gray-600">
                      <p>자녀 이름: <span className="font-semibold">{request.childName}</span></p>
                      <p>학년: <span className="font-semibold">{request.childAge}</span></p>
                      <p>신청일: {new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-1">요구사항:</p>
                    <p className="text-gray-800">{request.requirement}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdateMentoringStatus(request.id, "matched")}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      매칭 완료
                    </button>
                    <button
                      onClick={() => handleUpdateMentoringStatus(request.id, "rejected")}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      거절
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
