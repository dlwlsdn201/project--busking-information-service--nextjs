// entities/location/BuskingLocationCard.tsx
import React from 'react';
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  ActionIcon,
  Tooltip,
  CardProps,
} from '@mantine/core';
import {
  IconMapPin,
  IconPhone,
  IconTrash,
  IconEdit,
} from '@tabler/icons-react';
import styled from 'styled-components';
import { Location } from '@features/location/model/location';

interface BuskingLocationCardProps {
  location: Location;
  onEdit?: (location: Location) => void;
  onDelete?: (locationId: string) => void;
}

const StyledCard = styled(Card)<{ children: React.ReactNode } & CardProps>`
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const BuskingLocationCard: React.FC<BuskingLocationCardProps> = ({
  location,
  onEdit,
  onDelete,
}) => {
  return (
    <StyledCard shadow="sm" p="lg" radius="md" withBorder>
      {location.imageUrl && (
        <Card.Section>
          <Image src={location.imageUrl} height={160} alt={location.name} />
        </Card.Section>
      )}

      <Group align="start" mt="md" mb="xs">
        <Text size="lg">{location.name}</Text>
        <Badge
          color={location.requiresPermission ? 'orange' : 'teal'}
          variant="light"
        >
          {location.requiresPermission ? '허가 필요' : '자유 공연'}
        </Badge>
      </Group>

      <Group gap={6} mb="xs">
        <IconMapPin size={16} color="gray" />
        <Text size="sm" color="dimmed">
          {location.address}
        </Text>
      </Group>

      {location.contactInfo && (
        <Group gap={6} mb="xs">
          <IconPhone size={16} color="gray" />
          <Text size="sm" color="dimmed">
            {location.contactInfo}
          </Text>
        </Group>
      )}

      {location.description && (
        <Text size="sm" mt="sm" lineClamp={2}>
          {location.description}
        </Text>
      )}

      {(onEdit || onDelete) && (
        <Group align="right" mt="md">
          {onEdit && (
            <Tooltip label="수정">
              <ActionIcon
                color="blue"
                onClick={() => onEdit(location)}
                variant="light"
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip label="삭제">
              <ActionIcon
                color="red"
                onClick={() => onDelete(location.id)}
                variant="light"
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      )}
    </StyledCard>
  );
};
