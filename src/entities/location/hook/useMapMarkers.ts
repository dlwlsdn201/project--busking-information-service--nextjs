import { useEffect, useState } from 'react';
import { BuskingSpot } from '../model/spot';
import { useLocations } from '@features/location';
// import { useDisclosure } from '@mantine/hooks';

export const useMapMarkers = ({
  kakaoMap,
}: {
  kakaoMap: kakao.maps.Map | null;
}) => {
  const [currentSlides, setCurrentSlides] = useState<{ [key: number]: number }>(
    {}
  );

  const { locations } = useLocations();
  /* TODO -[수정 Form Modal 구현] */
  // const [ { open }] = useDisclosure(false);
  // const { /editLocation, setEditLocation } = useLocationStore();

  // 수정/삭제 핸들러
  const editSpot = (spotId: number) => {
    console.log('Edit spot:', spotId);
    open();
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

  // Custom overlay 컨텐츠 생성
  const createOverlayContent = (spot: BuskingSpot) => {
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
      <div class="marker-popup">
        <div class="popup-header">
          <div class="location-title-container">
            <span class="location-title">
              ${spot.name}
            </span>
            <span class="close" onclick="() => overlay.setMap(null)" title="닫기">x</span>
          </div>
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
  // const createMarkerImage = () => {
  //   const markerImageSrc =
  //     'https://png.pngtree.com/png-vector/20210214/ourmid/pngtree-location-marker-png-image_2921053.jpg';

  //   return new window.kakao.maps.MarkerImage(
  //     markerImageSrc,
  //     new window.kakao.maps.Size(32, 40),
  //     { offset: new window.kakao.maps.Point(16, 40) }
  //   );
  // };

  const addOverlayCloseEvent = (overlay: {
    getContent: () => Element | null;
    setMap: (arg0: null) => void;
    spotId: string | number;
  }) => {
    const overlayContentElement = overlay.getContent();
    if (!overlayContentElement) return;
    // 닫기 버튼 클릭 이벤트 등록
    const closeButton = overlayContentElement.querySelector('.close');
    if (!closeButton) return;
    closeButton.addEventListener('click', () => {
      overlay.setMap(null);
      setCurrentSlides((prev) => ({ ...prev, [overlay.spotId]: 0 }));
    });
  };

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

      const createOverlayContentElement = (spot: BuskingSpot): HTMLElement => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = createOverlayContent(spot); // 기존 함수는 문자열 반환
        return wrapper.firstElementChild as HTMLElement;
      };

      const overlay = new window.kakao.maps.CustomOverlay({
        content: createOverlayContentElement(spot),
        position: marker.getPosition(),
        removable: true,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        overlay.setMap(kakaoMap);
        setCurrentSlides((prev) => ({ ...prev, [spot.id]: 0 }));
      });

      marker.setMap(kakaoMap);

      addOverlayCloseEvent(overlay);
    });
  }, [kakaoMap, locations, currentSlides]);

  // 전역 함수 등록
  useEffect(() => {
    // 캐러셀 제어 함수들
    const updateCarousel = (spotId: number, nextSlideIdx: number) => {
      const carousel = document.getElementById(`carousel-${spotId}`);
      if (!carousel) return;
      const currentSlide = nextSlideIdx || 0;
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
      setTimeout(() => updateCarousel(spotId, newSlide), 0);
    };

    const prevSlide = (spotId: number) => {
      const spot = locations.find(
        (spotItem: BuskingSpot) => Number(spotItem.id) === spotId
      );
      if (!spot) return;

      const totalSlides = spot.images.length;
      const newSlide = (currentSlides[spotId] - 1 + totalSlides) % totalSlides;

      setCurrentSlides((prev) => ({ ...prev, [spotId]: newSlide }));
      setTimeout(() => updateCarousel(spotId, newSlide), 0);
    };

    const goToSlide = (spotId: number, slideIndex: number) => {
      setCurrentSlides((prev) => ({ ...prev, [spotId]: slideIndex }));
      setTimeout(() => updateCarousel(spotId, slideIndex), 0);
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
};
