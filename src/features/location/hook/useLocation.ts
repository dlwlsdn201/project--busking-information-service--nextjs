// shared/hooks/useLocations.ts
import { useState, useEffect } from 'react';
import { Location } from '@features/location/model/location';

export const useLocations = () => {
  // shared/hooks/useLocations.ts (계속)
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터 로딩
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        // 실제 구현에서는 API 호출로 대체
        // 현재는 로컬 스토리지에서 데이터를 가져오는 방식으로 구현
        // const storedLocations = localStorage.getItem('buskingLocations');
        // if (storedLocations) {
        //   setLocations(JSON.parse(storedLocations));
        // } else {
        // 초기 샘플 데이터
        const initialLocations: Location[] = [
          {
            id: '1',
            name: '홍대 걷고싶은거리',
            address: '서울특별시 마포구 와우산로 94',
            latitude: 37.5558,
            longitude: 126.9227,
            requiresApprove: true,
            contactInfo: '02-323-1234',
            description:
              '홍대 앞 인기 버스킹 장소. 주말 오후 2시부터 10시까지 공연 가능. 사전 허가 필요.',
            imageUrls: ['/sample_location1.jpg', '/sample_location2.jpg'],
          },
          {
            id: '2',
            name: '해운대 버스킹존',
            address: '부산광역시 해운대구 해운대해변로 264',
            latitude: 35.1584,
            longitude: 129.1601,
            requiresApprove: true,
            contactInfo: '051-749-4000',
            description:
              '해운대 해변가 공연장. 여름 시즌에 특히 인기가 많음. 사전 예약제.',
            imageUrls: ['/sample_location1.jpg', '/sample_location2.jpg'],
          },
          {
            id: '3',
            name: '대학로 마로니에공원',
            address: '서울특별시 종로구 대학로 116',
            latitude: 37.5812,
            longitude: 127.0017,
            requiresApprove: false,
            description: '자유롭게 버스킹 가능한 공간. 전기 콘센트 없음.',
            imageUrls: ['/sample_location1.jpg', '/sample_location2.jpg'],
          },
        ];
        setLocations(initialLocations);
        localStorage.setItem(
          'buskingLocations',
          JSON.stringify(initialLocations)
        );
        // }
      } catch (error) {
        console.error('위치 데이터 로딩 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // 위치 추가
  const addLocation = (location: Location) => {
    const updatedLocations = [...locations, location];
    setLocations(updatedLocations);
    localStorage.setItem('buskingLocations', JSON.stringify(updatedLocations));
  };

  // 위치 삭제
  const deleteLocation = (locationId: string) => {
    const updatedLocations = locations.filter((loc) => loc.id !== locationId);
    setLocations(updatedLocations);
    localStorage.setItem('buskingLocations', JSON.stringify(updatedLocations));
  };

  // 위치 수정
  const updateLocation = (updatedLocation: Location) => {
    const updatedLocations = locations.map((loc) =>
      loc.id === updatedLocation.id ? updatedLocation : loc
    );
    setLocations(updatedLocations);
    localStorage.setItem('buskingLocations', JSON.stringify(updatedLocations));
  };

  return {
    locations,
    isLoading,
    addLocation,
    deleteLocation,
    updateLocation,
  };
};
