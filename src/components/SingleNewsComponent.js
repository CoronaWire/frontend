// Single News Component = News Card displayed in the Main Dashboard Component
// Contains News / Tweeter information: Title of News, Summary or Tweet, Timestamp, and Link to URL

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules

// #toAsk #UIUX: how is width / height going to change with mobile responsiveness?

const SingleNewsWrapper = styled.div`
    height: 145px;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: #B0B0B0;
    display: flex,
    flex-direction: column;
    background-color: transparent;
    margin-bottom: 15px;
`;

// #toDo: set padding between the news Data and the URL container from centralized place
// #toFix: styling of second part of container
// #toDo: add absolute positioned arrow on the side
const NewsData = styled.div`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #B0B0B0;
    width: auto;
    height: 76%;
    background-color: transparent;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 7px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

// #toDo: set up URL container and above component's height so they automatically complement each other
const URLContainer = styled.div`
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: transparent;
    padding-left: 15px;
    padding-right: 15px;

`
const NewsTimeStamp = styled.h4`
    font-size: 11px;
    color: grey;
    margin-top: 6px;
    margin-bottom: 6px;
`
// #toDo: what happens if title/text too long? Cut off at X amount of characters. Or set overflow-x hidden.
const NewsText = styled.p`
    color: black;
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: 12px;
    
`;

const NewsTitle = styled(NewsText)`
    font-style: bold;
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 600;

`

const DataSource = styled.p`
    display: inline-block;
    width: auto;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 5px;
    background-color: transparent;
    font-size: 11px;
    color: black;
`

// #toDo #UIUX #UXUI: is the whole URL container a link or just the website / twitter text?
const DataType = styled(DataSource)`
    display: inline-block;
    width: auto;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 5px;
    background-color: transparent;
    font-size: 11px;
    color: grey;
    cursor: pointer;
`


class SingleNewsComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render(){
        // #toFix: props nested inside of props. 
        const {props} = this.props;
        return (
            <SingleNewsWrapper>
                <NewsData>
                    <NewsTimeStamp>
                        {props.timeStamp}
                    </NewsTimeStamp>
                    <NewsTitle>
                        {props.title}
                    </NewsTitle>
                    <NewsText> 
                        {props.summary}
                    </NewsText>
                </NewsData>
                <URLContainer>
                    <DataSource>
                        {props.source}
                    </DataSource>
                    <DataType>
                        {props.newsType}
                    </DataType>
                </URLContainer>
            </SingleNewsWrapper>
        )
    }
}

export default SingleNewsComponent;
