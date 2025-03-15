import { Paper, PaperProps, Title } from '@mantine/core';
import styled from 'styled-components';

export const MainCardContainer = styled(Paper)<
  PaperProps & { children: React.ReactNode }
>`
  border-radius: 0.75rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  height: 100%;
  max-height: 22rem;
  min-width: -webkit-fill-available;
`;
export const StyledChartTitle = styled(Title)`
  color: #4c6ef5;
  margin-bottom: 8px;
  font-size: 1.2rem;
`;
