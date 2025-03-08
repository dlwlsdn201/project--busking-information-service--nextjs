// widgets/dashboard-card/index.tsx
import React from 'react';
import {
  Paper,
  Text,
  Group,
  RingProgress,
  Box,
  useMantineTheme,
} from '@mantine/core';
import styled from 'styled-components';

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
  progress?: number;
}

const CardWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }
`;

const IconWrapper = styled(Box)<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => `${props.color}10`};
  color: ${(props) => props.color};
`;

const ValueText = styled(Text)`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
`;

const TitleText = styled(Text)`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 8px;
`;

const DescriptionText = styled(Text)<{ positive?: boolean }>`
  font-size: 13px;
  color: ${(props) => (props.positive ? '#40c057' : '#ff6b6b')};
  font-weight: 500;
`;

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
  icon,
  color = '#4c6ef5',
  progress,
}) => {
  const theme = useMantineTheme();
  const isPositive = description.includes('+');

  return (
    <CardWrapper withBorder radius="md" p="md">
      <Group position="apart" noWrap>
        <Box>
          <TitleText>{title}</TitleText>
          <ValueText>{value}</ValueText>
          <DescriptionText positive={isPositive} mt="xs">
            {description}
          </DescriptionText>
        </Box>

        <Box>
          {progress ? (
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: progress, color }]}
              label={
                <Box>
                  {icon && (
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {icon}
                    </Box>
                  )}
                </Box>
              }
            />
          ) : (
            <IconWrapper color={color}>{icon}</IconWrapper>
          )}
        </Box>
      </Group>
    </CardWrapper>
  );
};
