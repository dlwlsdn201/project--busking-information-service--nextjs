'use client';

import {
  ActionIcon,
  ActionIconProps,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledActionIcon = styled(ActionIcon)<
  ActionIconProps & { children: React.ReactElement; onClick: () => void }
>`
  position: relative;
`;

export const ThemeToggleButton: React.FC = () => {
  const [isMounted, setMounted] = useState(false);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (!isMounted) setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <StyledActionIcon
      onClick={() => toggleColorScheme()}
      size="xl"
      variant="default"
      color={isDark ? 'yellow' : 'blue'}
    >
      {isDark ? <IconSun size={22} /> : <IconMoon size={22} />}
    </StyledActionIcon>
  );
};
