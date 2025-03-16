import { Post } from '@entities/publicize/post/model/types';
import dayjs from 'dayjs';
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
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-2, 'day').format('YYYY.MM.DD'),
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
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-5, 'day').format('YYYY.MM.DD'),
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
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-25, 'day').format('YYYY.MM.DD'),
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
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-3, 'month').format('YYYY.MM.DD'),
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
  {
    id: '5',
    title: '플루트 클래식 버스킹',
    description: '바흐부터 모차르트까지, 클래식 명곡들을 플루트로 연주합니다.',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-7, 'day').format('YYYY.MM.DD'),
    time: '14:00 - 16:00',
    location: '서울숲 중앙광장',
    category: '클래식',
    region: '서울',
    isFree: true,
    likes: 35,
    authorId: 'user5',
    authorName: '한플룻',
    authorImage: '/images/profiles/user5.jpg',
    createdAt: '2025-03-17T10:00:00Z',
  },
  {
    id: '6',
    title: '인디밴드 신곡 발표회',
    description: '저희 밴드의 새 앨범 수록곡을 최초로 공개합니다!',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-12, 'day').format('YYYY.MM.DD'),
    time: '19:00 - 21:00',
    location: '이대 앞 거리',
    category: '밴드',
    region: '서울',
    isFree: true,
    likes: 123,
    authorId: 'user6',
    authorName: '청춘밴드',
    authorImage: '/images/profiles/user6.jpg',
    createdAt: '2025-03-18T15:30:00Z',
  },
  {
    id: '7',
    title: '즉흥 재즈 잼 세션',
    description: '재즈 뮤지션이라면 누구나 참여 가능한 즉흥 연주 세션입니다.',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-15, 'day').format('YYYY.MM.DD'),
    time: '20:30 - 23:30',
    location: '대전 시청 광장',
    category: '재즈',
    region: '대전',
    isFree: true,
    likes: 67,
    authorId: 'user7',
    authorName: '최재즈',
    authorImage: '/images/profiles/user7.jpg',
    createdAt: '2025-03-19T20:15:00Z',
  },
  {
    id: '8',
    title: '어쿠스틱 듀엣 공연',
    description:
      '기타와 카혼의 특별한 만남, 감성적인 어쿠스틱 무대를 선사합니다.',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-18, 'day').format('YYYY.MM.DD'),
    time: '17:30 - 19:30',
    location: '광주 충장로',
    category: '어쿠스틱',
    region: '광주',
    isFree: false,
    likes: 45,
    authorId: 'user8',
    authorName: '듀엣소리',
    authorImage: '/images/profiles/user8.jpg',
    createdAt: '2025-03-20T16:45:00Z',
  },
  {
    id: '9',
    title: 'K-POP 커버댄스 쇼',
    description: '최신 K-POP 히트곡들을 완벽한 군무로 선보입니다!',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-20, 'day').format('YYYY.MM.DD'),
    time: '15:00 - 17:00',
    location: '부산 서면 중앙로',
    category: '댄스',
    region: '부산',
    isFree: true,
    likes: 156,
    authorId: 'user9',
    authorName: '댄스킹',
    authorImage: '/images/profiles/user9.jpg',
    createdAt: '2025-03-21T13:00:00Z',
  },
  {
    id: '10',
    title: '국악 퓨전 공연',
    description: '전통 국악기와 현대 악기의 특별한 콜라보레이션',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-22, 'day').format('YYYY.MM.DD'),
    time: '16:00 - 18:00',
    location: '인천 문화공원',
    category: '국악',
    region: '인천',
    isFree: true,
    likes: 78,
    authorId: 'user10',
    authorName: '국악소리',
    authorImage: '/images/profiles/user10.jpg',
    createdAt: '2025-03-22T11:30:00Z',
  },
  {
    id: '11',
    title: '블루스 기타 솔로 공연',
    description: '정통 블루스 기타리스트의 감성적인 솔로 공연',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-25, 'day').format('YYYY.MM.DD'),
    time: '19:00 - 21:00',
    location: '대구 동성로',
    category: '블루스',
    region: '대구',
    isFree: false,
    likes: 92,
    authorId: 'user11',
    authorName: '블루스맨',
    authorImage: '/images/profiles/user11.jpg',
    createdAt: '2025-03-23T19:20:00Z',
  },
  {
    id: '12',
    title: '어반 힙합 쇼케이스',
    description: '신진 래퍼들의 새로운 트랙을 최초 공개합니다.',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-28, 'day').format('YYYY.MM.DD'),
    time: '21:00 - 23:00',
    location: '강남 지하철역 앞',
    category: '힙합',
    region: '서울',
    isFree: true,
    likes: 145,
    authorId: 'user12',
    authorName: '힙합킹',
    authorImage: '/images/profiles/user12.jpg',
    createdAt: '2025-03-24T21:00:00Z',
  },
  {
    id: '13',
    title: '보컬 R&B 공연',
    description: '소울풀한 R&B 보컬리스트의 라이브 무대',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-30, 'day').format('YYYY.MM.DD'),
    time: '18:30 - 20:30',
    location: '울산 문화거리',
    category: '보컬',
    region: '울산',
    isFree: true,
    likes: 88,
    authorId: 'user13',
    authorName: '소울보컬',
    authorImage: '/images/profiles/user13.jpg',
    createdAt: '2025-03-25T18:30:00Z',
  },
  {
    id: '14',
    title: '스트릿 퍼포먼스',
    description: '비보잉, 팝핀, 락킹이 어우러진 스트릿 댄스 공연',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-32, 'day').format('YYYY.MM.DD'),
    time: '16:30 - 18:30',
    location: '홍대 놀이터',
    category: '댄스',
    region: '서울',
    isFree: true,
    likes: 167,
    authorId: 'user14',
    authorName: '비보이크루',
    authorImage: '/images/profiles/user14.jpg',
    createdAt: '2025-03-26T16:00:00Z',
  },
  {
    id: '15',
    title: '포크송 어쿠스틱 공연',
    description: '70-80년대 포크송을 어쿠스틱 버전으로 들려드립니다.',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-35, 'day').format('YYYY.MM.DD'),
    time: '17:00 - 19:00',
    location: '대전 엑스포공원',
    category: '어쿠스틱',
    region: '대전',
    isFree: false,
    likes: 73,
    authorId: 'user15',
    authorName: '포크소년',
    authorImage: '/images/profiles/user15.jpg',
    createdAt: '2025-03-27T17:15:00Z',
  },
  {
    id: '16',
    title: '재즈 피아노 솔로',
    description: '빌 에반스 스타일의 감미로운 재즈 피아노 연주',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-38, 'day').format('YYYY.MM.DD'),
    time: '19:30 - 21:30',
    location: '부산 해운대 엘시티 앞',
    category: '재즈',
    region: '부산',
    isFree: true,
    likes: 95,
    authorId: 'user16',
    authorName: '피아노맨',
    authorImage: '/images/profiles/user16.jpg',
    createdAt: '2025-03-28T19:45:00Z',
  },
  {
    id: '17',
    title: '클래식 현악 4중주',
    description: '모차르트와 베토벤의 현악 4중주 작품을 연주합니다.',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-40, 'day').format('YYYY.MM.DD'),
    time: '15:00 - 17:00',
    location: '광주 예술의 거리',
    category: '클래식',
    region: '광주',
    isFree: false,
    likes: 82,
    authorId: 'user17',
    authorName: '클래식앙상블',
    authorImage: '/images/profiles/user17.jpg',
    createdAt: '2025-03-29T15:00:00Z',
  },
  {
    id: '18',
    title: '일렉트로닉 라이브 퍼포먼스',
    description: '신디사이저와 드럼머신을 활용한 일렉트로닉 음악 공연',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-42, 'day').format('YYYY.MM.DD'),
    time: '21:30 - 23:30',
    location: '강남 클럽 거리',
    category: '일렉트로닉',
    region: '서울',
    isFree: true,
    likes: 134,
    authorId: 'user18',
    authorName: '일렉트로',
    authorImage: '/images/profiles/user18.jpg',
    createdAt: '2025-03-30T21:30:00Z',
  },
  {
    id: '19',
    title: '퓨전 국악 버스킹',
    description: '해금과 일렉기타의 특별한 만남',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-45, 'day').format('YYYY.MM.DD'),
    time: '16:00 - 18:00',
    location: '인천 송도 센트럴파크',
    category: '국악',
    region: '인천',
    isFree: true,
    likes: 67,
    authorId: 'user19',
    authorName: '퓨전국악',
    authorImage: '/images/profiles/user19.jpg',
    createdAt: '2025-03-31T16:30:00Z',
  },
  {
    id: '20',
    title: '락밴드 라이브 공연',
    description: '오리지널 곡으로 구성된 열정적인 락밴드의 무대',
    imageUrl: '/sample_post_thumbnail.jpeg',
    date: dayjs().subtract(-48, 'day').format('YYYY.MM.DD'),
    time: '20:00 - 22:00',
    location: '홍대 클럽',
    category: '밴드',
    region: '서울',
    isFree: false,
    likes: 178,
    authorId: 'user20',
    authorName: '락스피릿',
    authorImage: '/images/profiles/user20.jpg',
    createdAt: '2025-04-01T20:00:00Z',
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
        const ITEMS_PER_PAGE = 99999;
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

  console.log({ result });
  return result;
};
