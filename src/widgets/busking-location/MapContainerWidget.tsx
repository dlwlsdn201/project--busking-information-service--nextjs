// widgets/map/MapContainer.tsx
import { Location } from '@features/location/model/location';
import { useKakaoMapScript } from '@shared/hook';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface MapContainerWidgetProps {
  locations: Location[];
  selectedLocation: Location | null;
  onMarkerClick: (location: Location) => void;
}

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

export const MapContainerWidget: React.FC<MapContainerWidgetProps> = ({
  locations,
  selectedLocation,
  onMarkerClick,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const kakaoMapLoaded = useKakaoMapScript();
  const mapInstanceRef = useRef<any>(null);

  // 지도 초기화
  useEffect(() => {
    if (!kakaoMapLoaded || !mapRef.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심
      level: 7,
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);
    mapInstanceRef.current = map;

    // 확대 축소 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // 지도 타입 컨트롤 추가
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    return () => {
      // 마커 제거
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [kakaoMapLoaded]);

  // 마커 표시
  useEffect(() => {
    if (!kakaoMapLoaded || !mapInstanceRef.current || !locations.length) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 인포윈도우 표시 위한 상태 추적
    const infowindows: any[] = [];

    // 마커 생성 및 표시
    locations.forEach((location) => {
      const markerPosition = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      // 마커 이미지 설정
      const markerImageSrc = location.requiresPermission
        ? '/images/marker-orange.png'
        : '/images/marker-blue.png';

      const imageSize = new window.kakao.maps.Size(36, 36);
      const imageOption = { offset: new window.kakao.maps.Point(18, 36) };
      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageSrc,
        imageSize,
        imageOption
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: mapInstanceRef.current,
        title: location.name,
        image: markerImage,
        clickable: true,
      });

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `
      <div class="p-2 rounded bg-white shadow-md text-center">
        <div class="font-bold text-indigo-600">${location.name}</div>
        <div class="text-xs text-gray-500">${location.requiresPermission ? '허가 필요' : '자유 공연'}</div>
      </div>
    `,
        removable: true,
      });
      infowindows.push(infowindow);

      // 클릭 이벤트 등록
      window.kakao.maps.event.addListener(marker, 'click', () => {
        // 다른 인포윈도우 닫기
        infowindows.forEach((iw) => iw.close());

        // 현재 인포윈도우 열기
        infowindow.open(mapInstanceRef.current, marker);

        // 선택된 위치 데이터 전달
        onMarkerClick(location);

        // 지도 중심 이동
        mapInstanceRef.current.panTo(markerPosition);
      });

      markersRef.current.push(marker);
    });
  }, [kakaoMapLoaded, locations, onMarkerClick]);

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
