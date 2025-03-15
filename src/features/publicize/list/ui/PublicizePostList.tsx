import { useState, useEffect } from 'react';
import { Grid, Pagination, Center, Loader, Text } from '@mantine/core';
import { styled } from 'styled-components';
import { usePosts } from '@entities/publicize/post/hook/usePosts';
import { FeedCard } from '@entities/publicize/post/ui/PostCard';

const StyledGrid = styled(Grid)`
  margin-top: 2rem;
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
        <Text size="xl" weight={500} className="mb-2">
          검색 결과가 없습니다
        </Text>
        <Text size="sm" color="dimmed">
          다른 검색어나 필터로 시도해보세요
        </Text>
      </NoResultsContainer>
    );
  }

  return (
    <>
      <StyledGrid>
        {posts.map((post) => (
          <Grid.Col
            key={post.id}
            x={12}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            className="mb-4"
          >
            <FeedCard post={post} />
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
    </>
  );
};
