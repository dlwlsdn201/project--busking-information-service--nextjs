'use client';

import { Container } from '@mantine/core';
import { useState } from 'react';
import { styled } from 'styled-components';
import {
  CreatePostButton,
  PublicizeFilterBar,
  PublicizePostList,
} from '@features/publicize';

const StyledContainer = styled(Container)`
  padding: 2rem 1rem;
  max-width: 75rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const PublicizeWidget = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`min-h-screen`}>
      <StyledContainer>
        <div className="flex w-full md:flex-row justify-end items-start md:items-center mb-6">
          <CreatePostButton />
        </div>

        <PublicizeFilterBar
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <PublicizePostList
          region={selectedRegion}
          category={selectedCategory}
          searchQuery={searchQuery}
        />
      </StyledContainer>
    </div>
  );
};
