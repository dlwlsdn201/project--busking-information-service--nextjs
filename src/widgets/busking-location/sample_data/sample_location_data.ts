// 타입 정의 (TypeScript 사용 시)

import { BuskingSpot } from '@entities/location/model/spot';

export const SAMPLE_LOCATION_DATA = {
  id: '1',
  name: 'Sample Location',
  address: '123 Sample Street, Sample City',
  lat: 37.5665,
  lng: 126.978,
  description: 'This is a sample location for busking.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// 버스킹 장소 데이터
export const SAMPLE_BUSKING_SPOT_DATA: BuskingSpot[] = [
  {
    id: '1',
    name: '홍대 걷고싶은거리',
    address: '서울특별시 마포구 와우산로 94',
    lat: 37.5665,
    lng: 126.924,
    permitRequired: true,
    contact: '000-0000-0000',
    operatingHours: '평일 18:00 - 22:00\n주말 14:00 - 22:00',
    electricSupply: true,
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=200&fit=crop',
    ],
    notes:
      '• 소음 규제로 22시 이후 공연 금지\n• 주차 공간 부족, 대중교통 이용 권장\n• 우천시 실내 대체 장소 없음',
  },
  {
    id: '2',
    name: '청계천 광장',
    address: '서울특별시 종로구 대학로 116',
    lat: 37.5817,
    lng: 127.0018,
    permitRequired: false,
    contact: '000-0000-0000',
    operatingHours: '매일 09:00 - 21:00',
    electricSupply: false,
    images: [
      'https://images.unsplash.com/photo-1544531586-fbb6cf2d4d5e?w=400&h=200&fit=crop',
    ],
    notes: '• 전기 미제공으로 배터리 앰프 필요\n• 주말 오후 관광객 많음',
  },
];
