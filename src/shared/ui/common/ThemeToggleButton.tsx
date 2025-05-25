'use client';

import { ActionIcon, ActionIconProps } from '@mantine/core';
import { useColorThemeMode } from '@shared/hook';
import { IconMoon, IconSun } from '@tabler/icons-react';
import styled from 'styled-components';

const StyledActionIcon = styled(ActionIcon)<
  ActionIconProps & { children: React.ReactElement; onClick: () => void }
>`
  position: relative;
`;

export const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleColorScheme } = useColorThemeMode();

  return (
    <StyledActionIcon
      onClick={() => toggleColorScheme()}
      size="xl"
      variant="default"
      color={isDarkMode ? 'yellow' : 'blue'}
    >
      {isDarkMode ? <IconSun size={22} /> : <IconMoon size={22} />}
    </StyledActionIcon>
  );
};
