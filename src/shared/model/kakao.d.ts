declare global {
  interface Window {
    kakao: any;
    buskingMap?: {
      nextSlide: (spotId: number) => void;
      prevSlide: (spotId: number) => void;
      goToSlide: (spotId: number, slideIndex: number) => void;
      editSpot: (spotId: number) => void;
      deleteSpot: (spotId: number) => void;
    };
  }
}

export {};
