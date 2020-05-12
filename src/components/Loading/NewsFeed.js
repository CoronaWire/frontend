import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import ContentLoader from 'react-content-loader';
import { H4 } from './../core/Text';

const LoaderText = styled(H4)`
  color: ${({ theme }) => theme.newsColors.midGrey};
  margin-bottom: 8px;
`;

const LoadingContainer = styled.div`
  background: ${({ theme }) => theme.newsColors.white};
  border-radius: 2px;
  ${({ theme }) => `border: 1px solid ${theme.newsColors.lightGrey}`};
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;


const LoaderItem = () => {
  const theme = useContext(ThemeContext);
  return (
    <LoadingContainer>
      <ContentLoader
        backgroundColor={theme.newsColors.loadingGrey}
        foregroundCOlor={theme.newsColors.white}
        viewBox="0 0 684 178"
      >
        <circle cx="28" cy="28" r="12" />
        <rect x="48" y="22" rx="2" ry="2" height="12" width="156" />
        <rect x="16" y="56" rx="2" ry="2" height="18" width="652" />
        <rect x="16" y="94" rx="2" ry="2" height="12" width="652" />
        <rect x="16" y="118" rx="2" ry="2" height="12" width="326" />
        <rect x="16" y="150" rx="2" ry="2" height="12" width="81.5" />
      </ContentLoader>
    </LoadingContainer>
  );
}

const useLoadingText = () => {
  const { scope, location } = useSelector(({ newsFeed }) => newsFeed);
  if (scope === 'local') {
    return `Searching for COVID articles near ${location.name}`;
  }
  return `Searching for ${scope} COVID articles`;
}

export const NewsFeedLoader = ({ showText = true, count = 2 }) => {
  const loadingText = useLoadingText();
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(<LoaderItem key={i} />);
  }
  return (
    <React.Fragment>
      {showText && <LoaderText>{loadingText}</LoaderText>}
      {items}
    </React.Fragment>
  );
};
