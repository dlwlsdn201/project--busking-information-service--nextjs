'use client';

import { createTheme, MantineProvider } from '@mantine/core';
import { RESPONSIVE_BREAKPOINTS } from '@app/config/responsive';

const convertPxToRem = (px: number): `${number}rem` =>
  (px / 16 + 'rem') as `${number}rem`;

// Mantine 다크모드/라이트모드 전환을 위한 예시
export const MantineProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = createTheme({
    breakpoints: {
      xs: convertPxToRem(RESPONSIVE_BREAKPOINTS.mobile),
      sm: convertPxToRem(RESPONSIVE_BREAKPOINTS.tablet),
      md: convertPxToRem(RESPONSIVE_BREAKPOINTS.laptop),
      lg: convertPxToRem(RESPONSIVE_BREAKPOINTS.desktop),
      xl: convertPxToRem(RESPONSIVE_BREAKPOINTS['desktop-lg']),
    },
  });

  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      {children}
    </MantineProvider>
  );
};
