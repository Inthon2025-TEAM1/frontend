// Mock data for store items - 실제 상품권

export type ItemCategory =
  | "culture"
  | "convenience"
  | "food"
  | "cafe"
  | "digital";

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  price: number; // in candy
  icon: string; // emoji
  rarity: "common" | "rare" | "epic" | "legendary";
  value: string; // 실제 상품권 금액
}

export const storeItems: StoreItem[] = [
  // 문화 상품권
  {
    id: "culture_001",
    name: "문화상품권 5천원",
    description: "서점, 영화관, 공연장 등에서 사용 가능",
    category: "culture",
    price: 500,
    icon: "🎫",
    rarity: "common",
    value: "5,000원",
  },
  {
    id: "culture_002",
    name: "문화상품권 1만원",
    description: "서점, 영화관, 공연장 등에서 사용 가능",
    category: "culture",
    price: 1000,
    icon: "🎫",
    rarity: "rare",
    value: "10,000원",
  },
  {
    id: "culture_003",
    name: "문화상품권 2만원",
    description: "서점, 영화관, 공연장 등에서 사용 가능",
    category: "culture",
    price: 2000,
    icon: "🎫",
    rarity: "epic",
    value: "20,000원",
  },
  {
    id: "culture_004",
    name: "문화상품권 5만원",
    description: "서점, 영화관, 공연장 등에서 사용 가능",
    category: "culture",
    price: 5000,
    icon: "🎫",
    rarity: "legendary",
    value: "50,000원",
  },

  // 편의점 상품권 (CU, GS25, 세븐일레븐)
  {
    id: "conv_001",
    name: "CU 모바일상품권 3천원",
    description: "전국 CU 편의점에서 사용 가능",
    category: "convenience",
    price: 300,
    icon: "🏪",
    rarity: "common",
    value: "3,000원",
  },
  {
    id: "conv_002",
    name: "GS25 모바일상품권 5천원",
    description: "전국 GS25 편의점에서 사용 가능",
    category: "convenience",
    price: 500,
    icon: "🏪",
    rarity: "common",
    value: "5,000원",
  },
  {
    id: "conv_003",
    name: "세븐일레븐 상품권 5천원",
    description: "전국 세븐일레븐에서 사용 가능",
    category: "convenience",
    price: 500,
    icon: "🏪",
    rarity: "common",
    value: "5,000원",
  },
  {
    id: "conv_004",
    name: "CU 모바일상품권 1만원",
    description: "전국 CU 편의점에서 사용 가능",
    category: "convenience",
    price: 1000,
    icon: "🏪",
    rarity: "rare",
    value: "10,000원",
  },
  {
    id: "conv_005",
    name: "GS25 모바일상품권 2만원",
    description: "전국 GS25 편의점에서 사용 가능",
    category: "convenience",
    price: 2000,
    icon: "🏪",
    rarity: "epic",
    value: "20,000원",
  },

  // 배달/음식 상품권
  {
    id: "food_001",
    name: "배달의민족 상품권 5천원",
    description: "배민에서 음식 주문 시 사용 가능",
    category: "food",
    price: 500,
    icon: "🍔",
    rarity: "common",
    value: "5,000원",
  },
  {
    id: "food_002",
    name: "배달의민족 상품권 1만원",
    description: "배민에서 음식 주문 시 사용 가능",
    category: "food",
    price: 1000,
    icon: "🍔",
    rarity: "rare",
    value: "10,000원",
  },
  {
    id: "food_003",
    name: "배달의민족 상품권 2만원",
    description: "배민에서 음식 주문 시 사용 가능",
    category: "food",
    price: 2000,
    icon: "🍔",
    rarity: "epic",
    value: "20,000원",
  },
  {
    id: "food_004",
    name: "요기요 상품권 5천원",
    description: "요기요에서 음식 주문 시 사용 가능",
    category: "food",
    price: 500,
    icon: "🍕",
    rarity: "common",
    value: "5,000원",
  },
  {
    id: "food_005",
    name: "쿠팡이츠 상품권 1만원",
    description: "쿠팡이츠에서 음식 주문 시 사용 가능",
    category: "food",
    price: 1000,
    icon: "🍜",
    rarity: "rare",
    value: "10,000원",
  },
  {
    id: "food_006",
    name: "맘스터치 모바일상품권 5천원",
    description: "전국 맘스터치 매장에서 사용 가능",
    category: "food",
    price: 500,
    icon: "🍗",
    rarity: "common",
    value: "5,000원",
  },

  // 카페 상품권
  {
    id: "cafe_001",
    name: "빽다방 아메리카노",
    description: "빽다방 아메리카노 1잔 교환권",
    category: "cafe",
    price: 150,
    icon: "☕",
    rarity: "common",
    value: "1잔",
  },
  {
    id: "cafe_002",
    name: "빽다방 음료 5천원권",
    description: "빽다방에서 사용 가능한 상품권",
    category: "cafe",
    price: 500,
    icon: "☕",
    rarity: "common",
    value: "5,000원",
  },
  {
    id: "cafe_003",
    name: "스타벅스 아메리카노 Tall",
    description: "스타벅스 아메리카노 Tall 사이즈 1잔",
    category: "cafe",
    price: 450,
    icon: "☕",
    rarity: "common",
    value: "1잔",
  },
  {
    id: "cafe_004",
    name: "스타벅스 기프티콘 5천원",
    description: "스타벅스에서 사용 가능한 모바일상품권",
    category: "cafe",
    price: 500,
    icon: "☕",
    rarity: "rare",
    value: "5,000원",
  },
  {
    id: "cafe_005",
    name: "투썸플레이스 5천원권",
    description: "투썸플레이스에서 사용 가능한 상품권",
    category: "cafe",
    price: 500,
    icon: "☕",
    rarity: "common",
    value: "5,000원",
  },
  {
    id: "cafe_006",
    name: "이디야커피 5천원권",
    description: "이디야커피에서 사용 가능한 상품권",
    category: "cafe",
    price: 500,
    icon: "☕",
    rarity: "common",
    value: "5,000원",
  },
  {
    id: "cafe_007",
    name: "메가커피 아메리카노",
    description: "메가커피 아메리카노 1잔 교환권",
    category: "cafe",
    price: 100,
    icon: "☕",
    rarity: "common",
    value: "1잔",
  },
  {
    id: "cafe_008",
    name: "컴포즈커피 아메리카노",
    description: "컴포즈커피 아메리카노 1잔 교환권",
    category: "cafe",
    price: 100,
    icon: "☕",
    rarity: "common",
    value: "1잔",
  },

  // 디지털 콘텐츠
  {
    id: "digital_001",
    name: "구글 플레이 기프트카드 5천원",
    description: "Google Play 스토어에서 사용 가능",
    category: "digital",
    price: 500,
    icon: "🎮",
    rarity: "common",
    value: "5,000원",
  },
  {
    id: "digital_002",
    name: "구글 플레이 기프트카드 1만원",
    description: "Google Play 스토어에서 사용 가능",
    category: "digital",
    price: 1000,
    icon: "🎮",
    rarity: "rare",
    value: "10,000원",
  },
];

export const categoryLabels: Record<ItemCategory, string> = {
  culture: "문화상품권",
  convenience: "편의점",
  food: "배달/음식",
  cafe: "카페",
  digital: "디지털",
};

export const rarityColors: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  common: {
    bg: "bg-gray-50",
    border: "border-gray-300",
    text: "text-gray-700",
  },
  rare: {
    bg: "bg-blue-50",
    border: "border-blue-300",
    text: "text-blue-700",
  },
  epic: {
    bg: "bg-purple-50",
    border: "border-purple-300",
    text: "text-purple-700",
  },
  legendary: {
    bg: "bg-yellow-50",
    border: "border-yellow-400",
    text: "text-yellow-700",
  },
};

export const rarityLabels: Record<string, string> = {
  common: "일반",
  rare: "레어",
  epic: "에픽",
  legendary: "전설",
};
