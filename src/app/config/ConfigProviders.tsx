'use client';

import { MantineProvider } from '@mantine/core';

// Mantine 다크모드/라이트모드 전환을 위한 예시
export default function ConfigProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
  );
}
