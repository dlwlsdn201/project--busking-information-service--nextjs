// shared/hooks/useLocations.ts
import { useState, useEffect } from 'react';
import { SAMPLE_BUSKING_SPOT_DATA } from '@widgets/busking-location/sample_data/sample_location_data';
import { BuskingSpot } from '@entities/location/model/spot';

export const useLocations = () => {
  // shared/hooks/useLocations.ts (계속)
  const [locations, setLocations] = useState<BuskingSpot[]>([]);
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
        const initialLocations: BuskingSpot[] = SAMPLE_BUSKING_SPOT_DATA;
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
  const addLocation = (location: BuskingSpot) => {
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
  const updateLocation = (updatedLocation: BuskingSpot) => {
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
