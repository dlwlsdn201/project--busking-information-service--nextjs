// widgets/dashboard-card/index.tsx
import React from 'react';
import {
  Paper,
  Text,
  Group,
  RingProgress,
  Box,
  PaperProps,
  BoxComponentProps,
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

const CardWrapper = styled(Paper)<PaperProps & { children: React.ReactNode }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: 100%;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled(Box)<
  BoxComponentProps & { color: string; children: React.ReactNode }
>`
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
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
`;

const TitleText = styled(Text)`
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
`;

const DescriptionText = styled(Text)<{
  positive?: boolean;
  children: React.ReactNode;
}>`
  font-size: 1rem;
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
  const isPositive = description.includes('+');

  return (
    <CardWrapper withBorder radius="md" p="md">
      <Group gap={'xl'}>
        <Box>
          <TitleText>{title}</TitleText>
          <ValueText>{value}</ValueText>
          <DescriptionText positive={isPositive}>{description}</DescriptionText>
        </Box>

        <Box>
          {progress ? (
            <RingProgress
              size={100}
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
