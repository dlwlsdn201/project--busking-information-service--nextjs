import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Button,
  ActionIcon,
  useMantineColorScheme,
  BadgeProps,
  CardProps,
} from '@mantine/core';
import dayjs from 'dayjs';
import { IconHeart, IconMapPin, IconCalendar } from '@tabler/icons-react';
import { styled } from 'styled-components';
import Link from 'next/link';
import { Post } from '@entities/publicize/post/model/types';

const StyledCard = styled(Card)<
  CardProps & { isDark: boolean; children: React.ReactNode }
>`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  overflow: hidden;
  border-radius: 0.75rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px
      rgba(0, 0, 0, ${(props) => (props.isDark ? '0.4' : '0.1')});
  }
`;
const CardImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  height: 180px;
`;

const DateBadge = styled(Badge)<BadgeProps & { children: React.ReactNode }>`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
`;

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const dDayElement = (eventDate: string) => {
    const nowDate = dayjs();
    const dDayValue: number = Math.abs(
      dayjs(eventDate).diff(nowDate, 'day') + 1
    );

    const color = dDayValue < 3 ? '#ff5050' : 'indigo';

    return (
      <DateBadge color={color} size="lg">
        {dDayValue === 0 ? 'D-day' : `${dDayValue}-day`}
      </DateBadge>
    );
  };

  return (
    <StyledCard padding="lg" radius="md" withBorder isDark={isDark}>
      <CardImageContainer>
        {dDayElement(post.date)}
        <Image
          src={post.imageUrl}
          alt={post.title}
          h={300}
          fit="cover"
          radius="md"
          // className="object-fit"
        />
      </CardImageContainer>

      <Group justify="apart" mt="md" mb="xs" gap="sm">
        <Text
          size="xl"
          className={`font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-800'} line-clamp-1`}
        >
          {post.title}
        </Text>
        <Badge color={post.isFree ? 'green' : 'blue'} variant="light">
          {post.isFree ? '무료' : '유료'}
        </Badge>
      </Group>

      <Group gap="xs" className="mb-2">
        <IconMapPin
          size={16}
          className={isDark ? 'text-gray-400' : 'text-gray-500'}
        />
        <Text size="md" c="dimmed" className="line-clamp-1">
          {post.location}
        </Text>
      </Group>

      <Group gap="xs" className="mb-2">
        <IconCalendar
          size={16}
          className={isDark ? 'text-gray-400' : 'text-gray-500'}
        />
        <Text size="md" c="dimmed">
          {post.date}
        </Text>
        <Text size="md" c="dimmed">
          {post.time}
        </Text>
      </Group>

      <Text size="md" c="dimmed" className="line-clamp-2 mb-3 flex-1">
        {post.description}
      </Text>

      <Group
        justify="apart"
        className={`mt-auto pt-2 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}
      >
        <Group gap="xs">
          <ActionIcon variant="light" color="pink" radius="md">
            <IconHeart size={18} />
          </ActionIcon>
          <Text size="sm" color="dimmed">
            {post.likes}
          </Text>
        </Group>

        <Link href={`/feed/${post.id}`} passHref>
          <Button variant="subtle" color="indigo">
            자세히 보기
          </Button>
        </Link>
      </Group>
    </StyledCard>
  );
};
