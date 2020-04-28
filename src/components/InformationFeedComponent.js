// Information Feed Component = holds one or more information feeds displayed on the right side
// of the MainDashboard Container

// External Packages
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchArticles } from './../helpers/newsApi';
import { setScopeAction } from './../actionCreators/actions';
// Internal Modules
import { H3, H4, Metadata } from './core';
import { FeedSelector } from './FeedSelector';

// #toFix: make components responsive
// #toDo: decide between show more button that extends feed (limits other features) or simple left and right
// arrow
// #toDo: button that refreshes feed? how to make it automatic? Firebase could still be v useful here.

const FeedWrapper = styled.div`
  padding: 0 24px;
`;

const FeedArticle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const ArticleTitle = styled(H4)`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.newsColors.navy};
`;

const ArticleMetaData = styled(Metadata)`
  color: ${({ theme }) => theme.newsColors.midGrey};
`;

const MoreText = styled(H3)`
  margin-top: 24px;
  color: ${({ theme }) => theme.newsColors.pink};
  cursor: pointer;
  text-transform: uppercase;
`;

const InformationFeedComponent = () => {
  const globalFeed = [
    {title: 'Off to the cafe: Sweden is outlier in virus restrictions', timestamp: '3 hr', source: 'BBC'},
    {title: 'Iran defends virus responses as Syria reports first death', timestamp: '6 hr', source: 'AP'},
    {title: 'North Korea test fires missiles amid worries about outbreak', timestamp: '9 hr', source: 'Al Jazeera'},
    {title: 'Indian authorities send buses to take unemployed to villages', timestamp: '1 d', source: 'Indiatimes'},
    {title: 'South Africa has first death as lockdown begins', timestamp: '1 d', source: 'BBC'},
  ];

  const [activeFeed, setActiveFeed] = useState('national');
  const [feed, setFeed] = useState([]);
  const dispatch = useDispatch();

  const handleFetch = async (scope) => {
    const data = await fetchArticles(activeFeed);
    console.log(data);
    if (data) {
      setFeed(data);
    }
  };

  useEffect(() => {
    handleFetch(activeFeed);
  }, [activeFeed]);

  // #important #toChange: once hte InformationFeedComponent gets "upgraded" to hold both GlobalFeedComponent
  // and NationalFeedComponent (not created yet), then create Wrapper that will hold the two components and set
  // the margin of that to be the DashboardStyling margin
  // or set it to the RightSideContainer? Make it consistent. Currently margin is set to the first child component.
  return (
    <FeedWrapper>
      <FeedSelector activeFeed={activeFeed} setActiveFeed={setActiveFeed} />
      {globalFeed.map((articleObject, index) => (
        <FeedArticle key={index}>
          <ArticleTitle> {articleObject.title} </ArticleTitle>
          <ArticleMetaData>{articleObject.timestamp} - {articleObject.source}</ArticleMetaData>
        </FeedArticle>
      ))}
      <MoreText
        onClick={() => {
          dispatch(setScopeAction(activeFeed));
        }}
      >
        Show more
      </MoreText>
    </FeedWrapper>
  );
};

export default InformationFeedComponent;
