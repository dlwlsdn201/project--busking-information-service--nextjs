import { useEffect } from 'react';
import { useLocations } from '@features/location';
import { useLocationStore } from '@store/index';

export const useMapMarkers = ({
  kakaoMap,
}: {
  kakaoMap: kakao.maps.Map | null;
}) => {
  const { locations } = useLocations();
  /* TODO -[수정 Form Modal 구현] */
  // const [ { open }] = useDisclosure(false);
  const { setEditLocation, setIsInfoModalOpen } = useLocationStore();

  // 마커들 생성
  useEffect(() => {
    if (!kakaoMap) return;
    // const markerImage = createMarkerImage();
    locations.forEach((spot) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(spot.lat, spot.lng),
        // image: markerImage,
        title: spot.name,
        clickable: true,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        setIsInfoModalOpen(true);
        setEditLocation(spot);
      });

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div style="width:100%;text-align:center;padding:5px; color: black;">${spot.name}</div>`,
      });
      window.kakao.maps.event.addListener(marker, 'mouseover', () => {
        // 마커에 마우스 오버 시 동작
        infoWindow.open(kakaoMap, marker);
      });
      window.kakao.maps.event.addListener(marker, 'mouseout', () => {
        // 마커에서 마우스 아웃 시 동작
        infoWindow.close();
      });

      // kakaoMap 인스턴스 위에 marker를 올려줌
      marker.setMap(kakaoMap);
    });
  }, [kakaoMap, locations, setEditLocation, setIsInfoModalOpen]);
};
