// shared/hooks/useKakaoMapScript.ts
import { useState, useEffect } from 'react';

export const useKakaoMapScript = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      setLoaded(true);
      return;
    }

    // 이미 스크립트가 로드중인 경우
    const kakaoMapScript = document.getElementById('kakao-map-script');
    if (kakaoMapScript) {
      kakaoMapScript.addEventListener('load', () => {
        setLoaded(true);
      });
      return;
    }

    // 스크립트 로드
    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        setLoaded(true);
      });
    });

    document.head.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      script.removeEventListener('load', () => {
        setLoaded(true);
      });
    };
  }, []);

  return loaded;
};
