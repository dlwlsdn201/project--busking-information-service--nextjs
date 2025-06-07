import { useEffect, useState } from 'react';
import { BuskingSpot } from '../model/spot';
import { useLocations } from '@features/location';

export const useMapMarkers = ({ kakaoMap, setSelectedLocation }) => {
  const [markers, setMarkers] = useState<BuskingSpot[]>([]);
  const [currentSlides, setCurrentSlides] = useState<{ [key: number]: number }>(
    {}
  );

  const { locations } = useLocations();

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };
  // 수정/삭제 핸들러
  const editSpot = (spotId: number) => {
    console.log('Edit spot:', spotId);
    // 수정 로직 구현
    alert(`${spotId}번 장소 수정 기능`);
  };

  const deleteSpot = (spotId: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      console.log('Delete spot:', spotId);
      // 삭제 로직 구현
      alert(`${spotId}번 장소 삭제됨`);
    }
  };

  // InfoWindow 컨텐츠 생성
  const createInfoWindowContent = (spot: BuskingSpot) => {
    const permitBadge = spot.permitRequired
      ? '<span class="permit-badge permit-required">허가 필요</span>'
      : '<span class="permit-badge permit-not-required">허가 불필요</span>';

    const electricStatus = spot.electricSupply
      ? '<div class="status-indicator status-available"><div class="status-dot"></div>이용 가능</div>'
      : '<div class="status-indicator status-unavailable"><div class="status-dot"></div>이용 불가</div>';

    const imageCarousel =
      spot.images.length > 0
        ? `
      <div class="image-carousel">
        <div class="carousel-container" id="carousel-${spot.id}">
          ${spot.images
            .map(
              (img) => `
            <div class="carousel-slide" style="background-image: url('${img}')"></div>
          `
            )
            .join('')}
        </div>
        ${
          spot.images.length > 1
            ? `
          <button class="carousel-arrow prev" onclick="window.buskingMap.prevSlide(${spot.id})">‹</button>
          <button class="carousel-arrow next" onclick="window.buskingMap.nextSlide(${spot.id})">›</button>
          <div class="carousel-nav">
            ${spot.images
              .map(
                (_, index) => `
              <div class="nav-dot ${index === 0 ? 'active' : ''}" onclick="window.buskingMap.goToSlide(${spot.id}, ${index})"></div>
            `
              )
              .join('')}
          </div>
        `
            : ''
        }
      </div>
    `
        : '';

    return `
      <div class="marker-popup" style="width: 340px;">
        <div class="popup-header">
          <div class="location-title">${spot.name}</div>
          ${permitBadge}
        </div>
        
        ${imageCarousel}
        
        <div class="popup-content">
          <div class="info-section">
            <div class="info-label">운영 시간</div>
            <div class="info-value">${spot.operatingHours.replace(/\n/g, '<br>')}</div>
          </div>

          <div class="info-section">
            <div class="info-label">전기 제공</div>
            ${electricStatus}
          </div>

          <div class="info-section">
            <div class="info-label">기타 사항</div>
            <div class="info-value">${spot.notes.replace(/\n/g, '<br>')}</div>
          </div>

          <div class="action-buttons">
            <button class="btn btn-edit" onclick="window.buskingMap.editSpot(${spot.id})">수정</button>
            <button class="btn btn-delete" onclick="window.buskingMap.deleteSpot(${spot.id})">삭제</button>
          </div>
        </div>
      </div>
    `;
  };

  // 커스텀 마커 이미지 생성
  const createMarkerImage = () => {
    const markerImageSrc =
      'data:image/svg+xml;base64,' +
      'PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAzMiA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMu' +
      'b3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEM3LjE2MyAwIDAgNy4xNjMgMCAxNmMwIDE2IDE2IDI0IDE2IDI0czE2LTggMTYtMjRDMzIgNy4xNjMgMjQuODM3IDAgMTYgMHoiIGZpbGw9IiM2NjdlZWEiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI4IiBmaWxsPSJ3aGl0ZSIvPjx0ZXh0IHg9IjE2IiB5PSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY2N2VlYSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9ImJvbGQiPsKfjI08L3RleHQ+PC9zdmc+';

    return new window.kakao.maps.MarkerImage(
      markerImageSrc,
      new window.kakao.maps.Size(32, 40),
      { offset: new window.kakao.maps.Point(16, 40) }
    );
  };

  // 마커들 생성
  useEffect(() => {
    if (!kakaoMap.current) return;
    console.log('true');
    const markerImage = createMarkerImage();
    const infoWindows: any[] = [];
    locations.forEach((spot) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(spot.lat, spot.lng),
        image: markerImage,
        title: spot.name,
        clickable: true,
      });

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: createInfoWindowContent(spot),
        removable: true,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        infoWindows.forEach((iw) => iw.close());
        infoWindow.open(kakaoMap, marker);
        setCurrentSlides((prev) => ({ ...prev, [spot.id]: 0 }));
      });

      console.log('kakaoMap:', kakaoMap);
      // marker.setMap(kakaoMap.current);
      infoWindows.push(infoWindow);
    });
    console.log({ location, infoWindows });
    setMarkers(infoWindows);
    console.groupEnd();
  }, [kakaoMap, locations]);

  // 전역 함수 등록
  useEffect(() => {
    // 캐러셀 제어 함수들
    const updateCarousel = (spotId: number) => {
      const carousel = document.getElementById(`carousel-${spotId}`);
      if (!carousel) return;

      const currentSlide = currentSlides[spotId] || 0;
      carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

      const navDots = carousel.parentNode?.querySelectorAll('.nav-dot');
      navDots?.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    };

    const nextSlide = (spotId: number) => {
      const spot = locations.find(
        (spotItem: BuskingSpot) => Number(spotItem.id) === spotId
      );
      if (!spot) return;

      const totalSlides = spot.images.length;
      const newSlide = (currentSlides[spotId] + 1) % totalSlides;

      setCurrentSlides((prev) => ({ ...prev, [spotId]: newSlide }));
      setTimeout(() => updateCarousel(spotId), 0);
    };

    const prevSlide = (spotId: number) => {
      const spot = locations.find(
        (spotItem: BuskingSpot) => Number(spotItem.id) === spotId
      );
      if (!spot) return;

      const totalSlides = spot.images.length;
      const newSlide = (currentSlides[spotId] - 1 + totalSlides) % totalSlides;

      setCurrentSlides((prev) => ({ ...prev, [spotId]: newSlide }));
      setTimeout(() => updateCarousel(spotId), 0);
    };

    const goToSlide = (spotId: number, slideIndex: number) => {
      setCurrentSlides((prev) => ({ ...prev, [spotId]: slideIndex }));
      setTimeout(() => updateCarousel(spotId), 0);
    };

    window.buskingMap = {
      nextSlide,
      prevSlide,
      goToSlide,
      editSpot,
      deleteSpot,
    };

    return () => {
      delete window.buskingMap;
    };
  }, [locations, currentSlides]);

  return { markers };
};
