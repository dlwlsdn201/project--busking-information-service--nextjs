import { Text } from '@mantine/core';
import { StyledChartTitle } from '../style/DashboardCard.styled';
import styled from 'styled-components';

const ChartTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

export const ChartTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <ChartTitleContainer>
      <StyledChartTitle order={4} mb={1}>
        {title}
      </StyledChartTitle>
      <Text size="sm" c="dimmed">
        {description}
      </Text>
    </ChartTitleContainer>
  );
};
