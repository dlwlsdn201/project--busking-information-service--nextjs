import { useState, useEffect } from 'react';

export const useChartSize = ({
  containerClassName,
}: {
  containerClassName: string;
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const element = document.querySelector(`.${containerClassName}`);

  useEffect(() => {
    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      resizeObserver.observe(element);

      return () => {
        resizeObserver.unobserve(element);
      };
    }
  }, [containerClassName, windowWidth, element]);

  return { containerWidth };
};
