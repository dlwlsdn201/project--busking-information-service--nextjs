// widgets/map/MapContainer.tsx
import { useInitialMap } from '@entities/location/hook/useInitialMap';
import styled from 'styled-components';

// 동적 임포트로 SSR 방지

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

export const LocationMapWidget = () => {
  const { mapContainerRef } = useInitialMap();

  // 지도 초기화

  return <MapWrapper ref={mapContainerRef} />;
};
