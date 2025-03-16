'use client';

// import { Container } from '@mantine/core';
import { useState } from 'react';
// import { styled } from 'styled-components';
import {
  CreatePostButton,
  PublicizeFilterBar,
  PublicizePostList,
} from '@features/publicize';
import styled from 'styled-components';

const StyledContainer = styled.div`
  min-height: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  row-gap: 0.75em;
  overflow-x: hidden;
`;

export const PublicizeWidget = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <StyledContainer>
      <InnerWrapper>
        <div className="flex w-full max-h-[10%] md:flex-row justify-end items-start md:items-center mb-6">
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
      </InnerWrapper>
    </StyledContainer>
  );
};
