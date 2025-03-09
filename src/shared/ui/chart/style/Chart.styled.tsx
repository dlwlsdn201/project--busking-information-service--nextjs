import { Box } from '@mantine/core';
import { CSSProperties } from 'react';
import styled from 'styled-components';

export const ChartContainer = styled(Box)<{
  height?: number;
  children: React.ReactNode;
  style?: CSSProperties;
}>`
  height: ${(props) => props.height || 300}px;
  width: 100%;
`;
