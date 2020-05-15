// Information Feed Component = holds one or more information feeds displayed on the right side
// of the MainDashboard Container

// External Packages
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchArticles } from './../helpers/newsApi';
import { setScopeAction } from './../actionCreators/actions';
// Internal Modules
import { H3, H4, Metadata, Link } from './core';
import { FeedSelector } from './FeedSelector';
import { timeSince } from './../helpers/datetime';
import { trackEvent } from './../helpers/ga';
import { capitalize } from './../helpers/utilities';

// #toFix: make components responsive
// #toDo: decide between show more button that extends feed (limits other features) or simple left and right
// arrow
// #toDo: button that refreshes feed? how to make it automatic? Firebase could still be v useful here.

const FeedWrapper = styled.div`
  width: 100%;
`;

const FeedArticle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const ArticleTitle = styled(H4)`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.newsColors.navy};
  &:hover {
    opacity: 0.7;
  }
`;

const ArticleMetaData = styled(Metadata)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.newsColors.midGrey};
`;

const MoreText = styled(H3)`
  margin-top: 24px;
  color: ${({ theme }) => theme.newsColors.pink};
  cursor: pointer;
  text-transform: uppercase;
`;

const InformationFeedComponent = () => {
  const [activeFeed, setActiveFeed] = useState('national');
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFetch = async (scope) => {
    setLoading(true);
    const data = await fetchArticles({ scope: activeFeed });
    if (data && data.data) {
      setFeed(data.data.slice(0, 5));
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetch(activeFeed);
  }, [activeFeed]);

  const trackArticleClick = () => {
    trackEvent({
      category: `${activeFeed}Feed`,
      action: 'click',
      label: `${activeFeed}Article`,
    });
  };

  return (
    <FeedWrapper>
      <FeedSelector activeFeed={activeFeed} setActiveFeed={setActiveFeed} />
      {!loading && feed.map((article) => (
        <FeedArticle key={article.id}>
          <Link onClick={trackArticleClick} href={article.article_url} target="_blank">
            <ArticleTitle> {article.title} </ArticleTitle>
          </Link>
          <ArticleMetaData>{timeSince(article.published_at)} - {article.source_id}</ArticleMetaData>
        </FeedArticle>
      ))}
      <MoreText
        onClick={() => {
          trackEvent({
            category: 'homepage',
            action: 'click',
            label: `showMore${capitalize(activeFeed)}`,
          });
          dispatch(setScopeAction(activeFeed));
        }}
      >
        Show more
      </MoreText>
    </FeedWrapper>
  );
};

export default InformationFeedComponent;
