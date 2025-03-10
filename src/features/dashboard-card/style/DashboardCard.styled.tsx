import { Paper, PaperProps, Title } from '@mantine/core';
import styled from 'styled-components';

export const MainCardContainer = styled(Paper)<
  PaperProps & { children: React.ReactNode }
>`
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
`;
export const StyledChartTitle = styled(Title)`
  color: #4c6ef5;
  margin-bottom: 8px;
  font-size: 1.2rem;
`;
