import { Post } from '@entities/publicize/post/model/types';
import { useEffect, useState } from 'react';

interface UsePostsProps {
  page: number;
  region: string | null;
  category: string | null;
  searchQuery: string;
}

interface UsePostsResult {
  posts: Post[];
  isLoading: boolean;
  totalPages: number;
  error: Error | null;
}

// 임시 샘플 데이터
const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    title: '어쿠스틱 기타 버스킹',
    description:
      '잔잔한 어쿠스틱 기타 선율로 여러분의 저녁을 따뜻하게 물들여 드립니다.',
    imageUrl: '/images/sample-busking-1.jpg',
    date: '2025.03.20',
    time: '18:00 - 20:00',
    location: '강남 스타일 파크',
    category: '어쿠스틱',
    region: '서울',
    isFree: true,
    likes: 42,
    authorId: 'user1',
    authorName: '김기타',
    authorImage: '/images/profiles/user1.jpg',
    createdAt: '2025-03-12T09:00:00Z',
  },
  {
    id: '2',
    title: '재즈 트리오 스페셜 공연',
    description:
      '피아노, 베이스, 드럼으로 구성된 재즈 트리오의 특별한 공연을 준비했습니다. 표준 재즈부터 현대 재즈까지 다양한 레퍼토리.',
    imageUrl: '/images/sample-busking-2.jpg',
    date: '2025.03.22',
    time: '19:30 - 21:30',
    location: '홍대 프리덤 스퀘어',
    category: '재즈',
    region: '서울',
    isFree: false,
    likes: 28,
    authorId: 'user2',
    authorName: '박재즈',
    authorImage: '/images/profiles/user2.jpg',
    createdAt: '2025-03-14T14:22:00Z',
  },
  {
    id: '3',
    title: '팝 보컬 커버 공연',
    description:
      '인기 팝송과 케이팝 메들리를 준비했습니다. 함께 노래하고 즐겨요!',
    imageUrl: '/images/sample-busking-3.jpg',
    date: '2025.03.25',
    time: '17:00 - 19:00',
    location: '부산 해운대 해변',
    category: '보컬',
    region: '부산',
    isFree: true,
    likes: 57,
    authorId: 'user3',
    authorName: '이보컬',
    authorImage: '/images/profiles/user3.jpg',
    createdAt: '2025-03-15T08:30:00Z',
  },
  {
    id: '4',
    title: '힙합 프리스타일 쇼케이스',
    description:
      '언더그라운드 래퍼들의 프리스타일 배틀과 라이브 공연이 펼쳐집니다.',
    imageUrl: '/images/sample-busking-4.jpg',
    date: '2025.03.28',
    time: '20:00 - 23:00',
    location: '대구 중앙로 지하철역 앞',
    category: '힙합',
    region: '대구',
    isFree: true,
    likes: 89,
    authorId: 'user4',
    authorName: '정래퍼',
    authorImage: '/images/profiles/user4.jpg',
    createdAt: '2025-03-16T18:45:00Z',
  },
];

export const usePosts = ({
  page,
  region,
  category,
  searchQuery,
}: UsePostsProps): UsePostsResult => {
  const [result, setResult] = useState<UsePostsResult>({
    posts: [],
    isLoading: true,
    totalPages: 0,
    error: null,
  });

  useEffect(() => {
    // API 호출을 모방하는 비동기 처리
    setResult((prev) => ({ ...prev, isLoading: true }));

    setTimeout(() => {
      try {
        // 필터링 로직
        let filteredPosts = [...SAMPLE_POSTS];

        if (region) {
          filteredPosts = filteredPosts.filter(
            (post) => post.region === region
          );
        }

        if (category) {
          filteredPosts = filteredPosts.filter(
            (post) => post.category === category
          );
        }

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredPosts = filteredPosts.filter(
            (post) =>
              post.title.toLowerCase().includes(query) ||
              post.description.toLowerCase().includes(query) ||
              post.authorName.toLowerCase().includes(query)
          );
        }

        // 페이지네이션
        const ITEMS_PER_PAGE = 8;
        const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
        const paginatedPosts = filteredPosts.slice(
          (page - 1) * ITEMS_PER_PAGE,
          page * ITEMS_PER_PAGE
        );

        setResult({
          posts: paginatedPosts,
          isLoading: false,
          totalPages,
          error: null,
        });
      } catch (error) {
        setResult({
          posts: [],
          isLoading: false,
          totalPages: 0,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    }, 600); // API 호출 지연시간 시뮬레이션
  }, [page, region, category, searchQuery]);

  return result;
};
