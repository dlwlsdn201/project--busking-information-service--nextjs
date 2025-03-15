import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Button,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { IconHeart, IconMapPin, IconCalendar } from '@tabler/icons-react';
import { styled } from 'styled-components';
import Link from 'next/link';
import { Post } from '@entities/publicize/post/model/types';

const StyledCard = styled(Card)<{ isDark: boolean; children: React.ReactNode }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  overflow: hidden;
  border-radius: 12px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px
      rgba(0, 0, 0, ${(props) => (props.isDark ? '0.4' : '0.1')});
  }
`;
const CardImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  height: 180px;
`;

const DateBadge = styled(Badge)<{ children: React.ReactNode }>`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
`;

interface FeedCardProps {
  post: Post;
}

export const FeedCard = ({ post }: FeedCardProps) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <StyledCard p="lg" radius="md" withBorder isDark={isDark}>
      <CardImageContainer>
        <DateBadge color="indigo" size="lg">
          {post.date}
        </DateBadge>
        <Image
          src={post.imageUrl}
          alt={post.title}
          height={180}
          radius="md"
          className="object-cover"
        />
      </CardImageContainer>

      <Group position="apart" mt="md" mb="xs">
        <Text
          weight={700}
          className={`text-lg ${isDark ? 'text-indigo-300' : 'text-indigo-800'} line-clamp-1`}
        >
          {post.title}
        </Text>
        <Badge color={post.isFree ? 'green' : 'blue'} variant="light">
          {post.isFree ? '무료' : '유료'}
        </Badge>
      </Group>

      <Group spacing="xs" className="mb-2">
        <IconMapPin
          size={16}
          className={isDark ? 'text-gray-400' : 'text-gray-500'}
        />
        <Text size="sm" color="dimmed" className="line-clamp-1">
          {post.location}
        </Text>
      </Group>

      <Group spacing="xs" className="mb-2">
        <IconCalendar
          size={16}
          className={isDark ? 'text-gray-400' : 'text-gray-500'}
        />
        <Text size="sm" color="dimmed">
          {post.time}
        </Text>
      </Group>

      <Text size="sm" color="dimmed" className="line-clamp-2 mb-3 flex-1">
        {post.description}
      </Text>

      <Group
        position="apart"
        className={`mt-auto pt-2 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}
      >
        <Group spacing="xs">
          <ActionIcon variant="light" color="pink" radius="md">
            <IconHeart size={18} />
          </ActionIcon>
          <Text size="sm" color="dimmed">
            {post.likes}
          </Text>
        </Group>

        <Link href={`/feed/${post.id}`} passHref>
          <Button variant="subtle" color="indigo" compact>
            자세히 보기
          </Button>
        </Link>
      </Group>
    </StyledCard>
  );
};
