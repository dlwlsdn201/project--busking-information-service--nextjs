import { useEffect } from 'react';
import { infoWindowContent } from '../ui/InfoWindow';

interface UseInfoWindowProps {
  kakaoMapLoaded: boolean;
  mapInstanceRef: React.MutableRefObject<any>;
  markersRef: React.MutableRefObject<any[]>;
  locations: any[];
  onMarkerClick: (location: any) => void;
}

export const useInfoWindow = ({
  kakaoMapLoaded,
  mapInstanceRef,
  markersRef,
  locations,
  onMarkerClick,
}: UseInfoWindowProps) => {
  // 마커 표시
  useEffect(() => {
    if (!kakaoMapLoaded || !mapInstanceRef.current || !locations.length) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 인포윈도우 표시 위한 상태 추적
    const infoWindows: any[] = [];

    // 마커 생성 및 표시
    locations.forEach((location) => {
      const markerPosition = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      // SECTION - [마커 이미지 설정]
      // const markerImageSrc = location.requiresApprove
      //   ? '/images/marker-orange.png'
      //   : '/images/marker-blue.png';

      // const imageSize = new window.kakao.maps.Size(36, 36);
      // const imageOption = { offset: new window.kakao.maps.Point(18, 36) };
      // const markerImage = new window.kakao.maps.MarkerImage(
      //   markerImageSrc,
      //   imageSize,
      //   imageOption
      // );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: mapInstanceRef.current,
        title: location.name,
        // image: markerImage,
        clickable: true,
      });
      // 인포윈도우 생성
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: infoWindowContent({
          name: location?.name,
          requireApprove: location?.requireApprove,
          imageUrls: location?.imageUrls,
          id: location.id,
        }),
        removable: true,
      });
      infoWindows.push(infoWindow);

      // 이미지 슬라이더 이벤트 등록

      const sliderEl = document.getElementById(`slider-${location.id}`);
      const prevBtn = document.getElementById(`prevBtn-${location.id}`);
      const nextBtn = document.getElementById(`nextBtn-${location.id}`);
      let currentIndex = 0;
      const totalImages = location?.imageUrls.length;
      const imageWidth = 256; // img width와 동일

      // 버튼 클릭 이벤트
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          if (currentIndex > 0) {
            currentIndex--;
            if (sliderEl)
              sliderEl.style.transform = `translateX(${-imageWidth * currentIndex}px)`;
          }
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (currentIndex < totalImages - 1) {
            currentIndex++;
            if (sliderEl)
              sliderEl.style.transform = `translateX(${-imageWidth * currentIndex}px)`;
          }
        });
      }

      // 4) 마커 클릭 → 기존 InfoWindow 닫고, 해당 InfoWindow만 열기
      window.kakao.maps.event.addListener(marker, 'click', () => {
        // 모든 InfoWindow 닫기
        infoWindows.forEach((iw) => iw.close());

        // 현재 위치 인포윈도우 열기
        infoWindow.open(mapInstanceRef.current, marker);

        // 선택된 위치 정보를 상위에 전달
        onMarkerClick(location);

        // 지도 중심 이동
        mapInstanceRef.current.panTo(markerPosition);
      });

      markersRef.current.push(marker);
    });
  }, [kakaoMapLoaded, locations, mapInstanceRef, markersRef, onMarkerClick]);

  // // 클릭 이벤트 등록
  // window.kakao.maps.event.addListener(marker, 'click', () => {
  //   // 다른 인포윈도우 닫기
  //   infoWindows.forEach((iw) => iw.close());

  //   // 현재 인포윈도우 열기
  //   infoWindow.open(mapInstanceRef.current, marker);

  //   // 선택된 위치 데이터 전달
  //   onMarkerClick(location);

  //   // 지도 중심 이동
  //   mapInstanceRef.current.panTo(markerPosition);
  // });

  //     markersRef.current.push(marker);
  //   });
  // }, [kakaoMapLoaded, locations, mapInstanceRef, markersRef, onMarkerClick]);
};
