// Single News Component = News Card displayed in the Main Dashboard Component
// Contains News / Tweeter information: Title of News, Summary or Tweet, Timestamp, and Link to URL

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import GlobalTheme from '../styledComponents/GlobalTheme';
import { Text } from './core';

// #toAsk #UIUX: how is width / height going to change with mobile responsiveness?

const NewsComponentStyling = {
    height: '76%'
}

const SingleNewsWrapper = styled.div`
    border-radius: 5px;
    border: 1px solid #B0B0B0;
    display: flex,
    flex-direction: column;
    background-color: transparent;
    margin-bottom: 15px;
    overflow: hidden;
`;

const NewsData = styled.div`
    border-bottom: 1px solid #B0B0B0;
    padding: 24px 45px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

// #toDo: set up URL container and above component's height so they automatically complement each other
const URLContainer = styled.div`
    background-color: transparent;
    height: 40px;
    padding: 11px 46px;
`
const NewsTimeStamp = styled(Text)`
    font-size: 14px;
    color: grey;
    margin-bottom: 20px;
`
// #toDo #UIUX: what happens if title/text too long? Cut off at X amount of characters. Or set overflow-x hidden.
const NewsText = styled(Text)`
  color: black;
  font-size: 18px;
  font-family: ${props => props.GlobalTheme.generalApplication.articleSummaryFont};
`;

const NewsTitle = styled(NewsText)`
  font-style: bold;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: ${props => props.GlobalTheme.generalApplication.articleTitleFont};
`

const DataSource = styled(Text)`
  font-size: 14px;
  color: black;
`

// #toDo #UIUX #UXUI: is the whole URL container a link or just the website / twitter text?
const DataType = styled.span`
  color: grey;
  cursor: pointer;
`

const SingleNewsComponent = ({
  props: { timeStamp, title, summary, source, newsType } = {},
}) => {
  return (
    <SingleNewsWrapper>
        <NewsData GlobalTheme={GlobalTheme}>
          <NewsTimeStamp>
            {timeStamp}
          </NewsTimeStamp>
          <NewsTitle GlobalTheme={GlobalTheme}>
            {title}
          </NewsTitle>
          <NewsText GlobalTheme={GlobalTheme}>
            {summary}
          </NewsText>
        </NewsData>
        <URLContainer GlobalTheme={GlobalTheme} >
          <DataSource>
            {source}
            <DataType>
              {` - ${newsType}`}
            </DataType>
          </DataSource>
        </URLContainer>
    </SingleNewsWrapper>
  );
}

export default SingleNewsComponent;
