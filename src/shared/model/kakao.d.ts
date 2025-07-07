declare global {
  interface Window {
    kakao: {
      maps: {
        Map: new (container: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        InfoWindow: new (options: any) => any;
        LatLng: new (lat: number, lng: number) => any;
        event: {
          addListener: (target: any, type: string, handler: () => void) => void;
        };
        services: {
          Places: new () => any;
          Status: {
            OK: string;
          };
        };
      };
    };
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
