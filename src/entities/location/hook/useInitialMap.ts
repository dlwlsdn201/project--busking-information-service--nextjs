import { useKakaoMapScript } from '@shared/hook';
import { useEffect, useRef, useState } from 'react';
import { BuskingSpot } from '../model/spot';
import { useMapMarkers } from './useMapMarkers';

export const useInitialMap = () => {
  const mapContainerRef = useRef<any>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  // TODO - [Zustand 로 이동]
  const [selectedLocation, setSelectedLocation] = useState<BuskingSpot | null>(
    null
  );

  const kakaoMapLoaded = useKakaoMapScript();

  // 선택된 위치가 변경될 때 해당 마커로 이동
  useEffect(() => {
    if (!kakaoMapLoaded || !mapContainerRef.current || !selectedLocation)
      return;

    const position = new window.kakao.maps.LatLng(
      selectedLocation.lat,
      selectedLocation.lng
    );

    mapContainerRef.current.panTo(position);
  }, [kakaoMapLoaded, selectedLocation]);

  // 지도 초기화
  useEffect(() => {
    if (!kakaoMapLoaded || !mapContainerRef.current || mapInstance) return;
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심
      level: 8, // 확대 레벨
    };

    // 카카오 맵 인스턴스 신규 생성
    const kakaoMap = new window.kakao.maps.Map(
      mapContainerRef.current,
      options
    );

    // 확대 축소 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    kakaoMap.addControl(
      zoomControl,
      window.kakao.maps.ControlPosition.TOPRIGHT
    );

    // 지도 타입 컨트롤 추가
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    kakaoMap.addControl(
      mapTypeControl,
      window.kakao.maps.ControlPosition.TOPRIGHT
    );

    setMapInstance(kakaoMap);
  }, [kakaoMapLoaded, mapInstance]);

  useMapMarkers({
    kakaoMap: mapInstance,
  });

  return {
    mapContainerRef,
    mapInstance,
    setSelectedLocation,
  };
};
