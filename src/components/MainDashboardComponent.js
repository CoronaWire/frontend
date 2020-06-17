// Main Dashboard Component = renders the News Aggregation

// External Packages
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { fetchArticles } from './../helpers/newsApi';
import { setScopeAction } from './../actionCreators/actions';
// Internal Modules
import LoginButton from '../styledComponents/LoginButton';
import GlobalTheme from '../styledComponents/GlobalTheme';
// Components
import SingleNewsComponent from '../components/SingleNewsComponent';
import { media } from './../helpers/media';
import { LocalZeroState } from './ZeroState';
import { Container, H3, H2, Button as BaseButton } from './core';
import { trackEvent } from './../helpers/ga';
import { useTimingEffect } from './../helpers/hooks';
import { NewsFeedLoader } from './Loading/';

const BackToNews = styled(H3)`
  cursor: pointer;
  color: ${({ theme }) => theme.newsColors.primary};
  margin-bottom: 24px;
  text-transform: uppercase;
`;

const Title = styled(H2)`
  color: ${({ theme }) => theme.newsColors.navy};
  margin-bottom: 24px;
  text-transform: uppercase;
`;

const ToggleButton = styled(BaseButton)`
  ${({ theme }) => css`
    background: ${theme.newsColors.midGrey};
    color: ${theme.newsColors.white};
    &:disabled {
      background: ${theme.newsColors.primary};
      cursor: not-allowed;
    }
  `};
  ${({ theme, active }) => active && css`

  `};
  margin-left: 16px;
  &:first-child {
    margin-left: 0;
  }
`;

const ToggleContainer = styled(Container)`
  margin-bottom: 24px;
`;

// #toFix: set margin-left and right of both styled components through Global Theming or through
// # a common stylesheet for a single source of truth
// #toFix: also centralize border-radius of article cards
// #important #toFix: height now set as a static amount of pixels. should be proportions?
const NewsListWrapper = styled.div``;

const OuterWrapper = styled.div``;

const Loading = () => null;

const STARTING_RADIUS = 0.1;

// #mainNewsFeedQuery
const MainDashboardComponent = () => {
  const categories = ['Health', 'Food', 'Public Services', 'Social', 'Housing', 'Labor']; // #toDecide : Finalize number of categories and type of categories

  const [localType, setLocalType] = useState('nearby');
  const [mainFeed, setMainFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [radius, setRadius] = useState(STARTING_RADIUS);
  const dispatch = useDispatch();
  const { scope, location } = useSelector(({ newsFeed }) => newsFeed);
  useTimingEffect(scope);

  const handleFetch = async (scope, location, query, options) => {
    setLoading(true);
    const data = await fetchArticles({ scope, location, query, options });
    const articles = data && data.data;
    if (articles) {
      setMainFeed(articles);
    }
    const length = articles && articles.length;
    // try again with increased radius if using coord
    if (options.localType === 'coord' && scope === 'local' && !length && radius < 0.5) {
      setRadius(query.radius + 0.1);
    } else {
      setLoading(false);
    }
  };

  const handleFetchMore = async () => {
    console.log('fetch more');
    const max = mainFeed && mainFeed[mainFeed.length - 1] && mainFeed[mainFeed.length - 1].id - 1;
    if (!max) {
      return;
    }
    const data = await fetchArticles({
      scope,
      location,
      query: { max, radius },
      options: { localType },
    });
    if (data && data.data && data.data.length) {
      setMainFeed([...mainFeed, ...data.data]);
    } else {
      setHasMore(false);
    }
  }

  useEffect(() => {
    if (radius > STARTING_RADIUS) {
      handleFetch(scope, location, { radius }, { localType });
    }
  }, [radius])

  useEffect(() => {
    handleFetch(
      scope,
      location,
      { radius: STARTING_RADIUS },
      { localType },
    );
    setRadius(STARTING_RADIUS);
    setHasMore(true);
  }, [scope, location, localType]);

  const trackArticleClick = () => {
    trackEvent({
      category: 'homepage',
      action: 'click',
      label: `${scope}Article`,
    })
  };

  const renderFeed = () => !loading ? (
    <InfiniteScroll
      hasMore={hasMore}
      pageStart={0}
      loader={<NewsFeedLoader showText={false} count={1} />}
      loadMore={handleFetchMore}
    >
      <NewsListWrapper>
        {mainFeed.map(article => (
          <SingleNewsComponent
            key={article.id}
            title={article.title}
            publishedAt={article.published_at}
            summary={article.summary}
            articleUrl={article.article_url}
            source={article.source_id}
            onClick={trackArticleClick}
          />
        ))}
      </NewsListWrapper>
    </InfiniteScroll>
  ) : (
    <NewsFeedLoader />
  );

  return (
    <OuterWrapper>
      {scope !== 'local' ? (
        <React.Fragment>
          <BackToNews
            onClick={() => {
              dispatch(setScopeAction('local'));
            }}
          >
            Back to news
          </BackToNews>
          <Title>{`${scope} news`}</Title>
        </React.Fragment>
      ) : (
        false && (
          <React.Fragment>
            <ToggleContainer flexColumn width="100%">
              <Title>{`Showing results for "${localType}"`}</Title>
              <Container>
                <ToggleButton
                  onClick={() => setLocalType('coord')}
                  disabled={localType === 'coord'}
                >
                  Lat / Long
                </ToggleButton>
                <ToggleButton
                  onClick={() => setLocalType('fips')}
                  disabled={localType === 'fips'}
                >
                  FIPS
                </ToggleButton>
                <ToggleButton
                  onClick={() => setLocalType('nearby')}
                  disabled={localType === 'nearby'}
                >
                  Nearby
                </ToggleButton>
              </Container>
            </ToggleContainer>
          </React.Fragment>
        )
			)}
      {!loading && scope === 'local' && !mainFeed.length ? (
        <LocalZeroState />
      ) : (
        renderFeed()
      )}
    </OuterWrapper>
  );
}

export default MainDashboardComponent;
