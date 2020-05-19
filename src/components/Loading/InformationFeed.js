import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import ContentLoader from 'react-content-loader';

const LoadingContainer = styled.div`
  margin-top: 20px;
`;

const LoaderItem = () => {
  const theme = useContext(ThemeContext);
  return (
    <LoadingContainer>
      <ContentLoader
        backgroundColor={theme.newsColors.white}
        foregroundColor={theme.newsColors.white}
        animate={false}
        viewBox="0 0 282 56"
      >
        <rect x="0" y="0" rx="2" ry="2" height="12" width="282" />
        <rect x="0" y="20" rx="2" ry="2" height="12" width="110" />
        <rect x="0" y="44" rx="2" ry="2" height="12" width="80" />
      </ContentLoader>
    </LoadingContainer>
  );
}

export const InformationFeedLoader = () => (
  <React.Fragment>
    <LoaderItem />
    <LoaderItem />
    <LoaderItem />
    <LoaderItem />
  </React.Fragment>
);
