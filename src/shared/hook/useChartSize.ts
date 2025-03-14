import { useState, useEffect } from 'react';

export const useChartSize = ({
  containerClassName,
}: {
  containerClassName: string;
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number | undefined>();

  const element = document?.querySelector(`.${containerClassName}`);

  useEffect(() => {
    const handleResize = () => {
      if (window) setWindowWidth(window?.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
