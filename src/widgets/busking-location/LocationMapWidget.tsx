// widgets/map/MapContainer.tsx
import { useInfoWindow } from '@entities/location';
import { Location } from '@features/location/model/location';
import { useKakaoMapScript } from '@shared/hook';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface LocationMapWidgetProps {
  locations: Location[];
  selectedLocation: Location | null;
  onMarkerClick: (location: Location) => void;
}

const MapWrapper = styled.div`
  max-width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden; // ✅ 추가!
  z-index: 1; // ✅ 다른 요소들과 겹침 방지

  svg {
    max-width: 100%;
    z-index: -1;
  }
`;

export const LocationMapWidget: React.FC<LocationMapWidgetProps> = ({
  locations,
  selectedLocation,
  onMarkerClick,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const kakaoMapLoaded = useKakaoMapScript();
  const mapInstanceRef = useRef<any>(null);

  // 마커 표시
  useInfoWindow({
    kakaoMapLoaded,
    mapInstanceRef,
    markersRef,
    locations,
    onMarkerClick,
  });

  // 지도 초기화
  useEffect(() => {
    if (!kakaoMapLoaded || !mapRef.current) return;
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심
      level: 8, // 확대 레벨
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);
    mapInstanceRef.current = map;

    // 확대 축소 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 타입 컨트롤 추가
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    return () => {
      // 마커 제거
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [kakaoMapLoaded]);

  // 선택된 위치가 변경될 때 해당 마커로 이동
  useEffect(() => {
    if (!kakaoMapLoaded || !mapInstanceRef.current || !selectedLocation) return;

    const position = new window.kakao.maps.LatLng(
      selectedLocation.latitude,
      selectedLocation.longitude
    );

    mapInstanceRef.current.panTo(position);
  }, [kakaoMapLoaded, selectedLocation]);

  return <MapWrapper ref={mapRef} />;
};
