import { useState, useEffect } from 'react';
import { Grid, Pagination, Center, Loader, Text } from '@mantine/core';
import { styled } from 'styled-components';
import { usePosts } from '@entities/publicize/post/hook/usePosts';
import { PostCard } from '@entities/publicize/post/ui/PostCard';

const PostListContainer = styled.div`
  height: 80%;
  margin-top: 0.5rem;
`;

const StyledGrid = styled(Grid)`
  overflow-y: auto;
  height: calc(100% - 0.5rem); // 상단 여백과 필터바 높이를 고려한 값
  padding-right: 1rem;
  position: relative;

  // 스크롤바 스타일링
  &::-webkit-scrollbar {
    width: 0.625rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1ea;
    border-radius: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #3b5bdb;
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
    cursor: pointer;
  }
`;

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  color: #6b7280;
`;

interface FeedListProps {
  region: string | null;
  category: string | null;
  searchQuery: string;
}

export const PublicizePostList = ({
  region,
  category,
  searchQuery,
}: FeedListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, isLoading, totalPages } = usePosts({
    page: currentPage,
    region,
    category,
    searchQuery,
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [region, category, searchQuery]);

  if (isLoading) {
    return (
      <Center style={{ height: '300px' }}>
        <Loader color="indigo" size="lg" />
      </Center>
    );
  }

  if (posts.length === 0) {
    return (
      <NoResultsContainer>
        <Text size="xl" className="mb-2">
          검색 결과가 없습니다
        </Text>
        <Text size="sm" c="dimmed">
          다른 검색어나 필터로 시도해보세요
        </Text>
      </NoResultsContainer>
    );
  }

  return (
    <PostListContainer>
      <StyledGrid gutter="lg" m={0}>
        {posts.map((post) => (
          <Grid.Col
            span={{ base: 12, sm: 6, md: 4, lg: 3 }} //
            key={post.id}
            h={'auto'}
            className="mb-4"
          >
            <PostCard post={post} />
          </Grid.Col>
        ))}
      </StyledGrid>

      {totalPages > 1 && (
        <Center className="mt-8">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
            color="indigo"
            radius="md"
            withEdges
          />
        </Center>
      )}
    </PostListContainer>
  );
};
