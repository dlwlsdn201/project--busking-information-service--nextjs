import { Box } from '@mantine/core';
import { CSSProperties } from 'react';
import styled from 'styled-components';

export const ChartContainer = styled(Box)<{
  height?: number;
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}>`
  height: ${(props) => (props?.height ? `${props?.height}px` : '100%')};
  width: 100%;
  display: flex;
  justify-content: center;
`;
