'use client';

import { MantineProvider } from '@mantine/core';
import StyledComponentProvider from './StyledComponentProvider';

export default function ConfigProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentProvider>
      <MantineProvider>{children}</MantineProvider>
    </StyledComponentProvider>
  );
}
