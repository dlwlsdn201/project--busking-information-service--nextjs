import { Paper, PaperProps, Title } from '@mantine/core';
import styled from 'styled-components';

export const GradientPaper = styled(Paper)<
  PaperProps & { children: React.ReactNode }
>`
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const ChartTitle = styled(Title)`
  color: #4c6ef5;
  margin-bottom: 8px;
  font-size: 1.2rem;
`;
