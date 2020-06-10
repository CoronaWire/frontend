// Moderator Article Feed Component
// Component that lists all of the articles displayed to the moderators

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
import GlobalTheme from '../styledComponents/GlobalTheme';
import { SmallText } from '../styledComponents/Text';
import { TinyGrid, LargeGrid, SmallGrid, SmallerGrid, SmallestGrid } from '../styledComponents/GridLayout';
import { OutlineButton, NoBorderButton } from '../styledComponents/Buttons';

// Sub-Components
import ModeratorArticleComponent from './ModeratorArticleComponent'

const BoldSmallText = styled(SmallText)`
    color: #646464;
    font-weight: 600;
`;

const BoldSmallerText = styled(BoldSmallText)`
    font-size: 9px;
`

const ArticleFeedTitleBar = styled.div`
    height: 40px;
    background-color: ${props => props.GlobalTheme.moderationPlatform.sharedLightGrey};
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
`;

const ArticleFeedWrapper = styled.div`
    background-color: transparent;
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const EndOfFeedContainer = styled.div`
    background-color: rt;
    display: flex;
    justify-content: center;
    width: 100%;
`;


const Button = styled(OutlineButton)`
    margin-top: 20px;
    margin-bottom: 20px;
    &:hover {
        color: white;
        background-color: rgb(24,11,255);
    }
    transition: background-color 0.2s ease-in, color 0.2s ease-in;
`

const DisabledButton = styled(OutlineButton)`
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: not-allowed;
`

const FeedWrapper = styled.div`
    background-color: white;
    color:black;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CenterFeedMessage = styled.h4`
    font-weight: 600;
    color: black;
    font-size:20px;
    text-align: center;
`
const ARTICLE_RETRIEVAL_BATCH_LENGTH = 30;

class ModeratorArticleFeedComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render(){
        const articleKeysArray = Object.keys(this.props.articleFeed);
        let articlesArrayLength = articleKeysArray.length;
        console.log('Articles Array Length', articlesArrayLength);
    
        const { modStatus, loadingStatus, howManyExtraArticlesRetrieved } = this.props;

        const ArticlesDisplayed = articleKeysArray.map((objectKey, index) => {
                                const articleObject = this.props.articleFeed[objectKey];
                                const articleKey = objectKey;
                                return <ModeratorArticleComponent 
                                        articleObject={articleObject} 
                                        key={articleKey} 
                                        toggleArticleSelected={this.props.toggleArticleSelected}
                                        checked={this.props.selectedArticles[articleKey]}
                                        articleID={articleKey}
                                        articleIndex={index}
                                        undoArticleApprovalRejection={this.props.undoArticleApprovalRejection}
                                        selectIndividualArticle={this.props.selectIndividualArticle}
                                        approveArticleAndDeleteFromFeed={this.props.approveArticleAndDeleteFromFeed}
                                        rejectArticleAndDeleteFromFeed={this.props.rejectArticleAndDeleteFromFeed}
                                        featureArticle={this.props.featureArticle}
                                        unfeatureArticle={this.props.unfeatureArticle}
                                        />
                                })

        const FeedLoadingMessage = loadingStatus === 'loading' ?
                                    <FeedWrapper>
                                        <CenterFeedMessage> Loading... </CenterFeedMessage>
                                    </FeedWrapper>
                                    : 
                                    <FeedWrapper>
                                        <CenterFeedMessage> No articles to display </CenterFeedMessage>
                                    </FeedWrapper>

        console.log('Number of articles retrived by Load More button', howManyExtraArticlesRetrieved);

        const LoadMoreButton = howManyExtraArticlesRetrieved === 0  || articlesArrayLength < ARTICLE_RETRIEVAL_BATCH_LENGTH ?
                            <DisabledButton disabled> No more articles to load </DisabledButton>
                            :
                            <Button onClick={this.props.retrieveMoreArticles}> Load more Articles </Button>

        return(
            <>
            <ArticleFeedTitleBar GlobalTheme={GlobalTheme} >
                    {
                    modStatus === 'pending' ? 
                    <>
                    <TinyGrid >
                        <BoldSmallText> SELECT </BoldSmallText>
                    </TinyGrid>
                    <TinyGrid>
                        {/* Added here in order to make the alignment consistent with the below elements */}
                    </TinyGrid>
                    </>
                    : 
                    <>
                    <TinyGrid >
                        <BoldSmallerText> PROCESSED </BoldSmallerText>
                    </TinyGrid>
                    <TinyGrid>
                        <BoldSmallerText> GEOSET </BoldSmallerText>
                    </TinyGrid>
                    </>
                    }
                <LargeGrid> 
                    <BoldSmallText> ARTICLE </BoldSmallText>
                </LargeGrid>
                <SmallerGrid>
                    <BoldSmallText> SOURCE </BoldSmallText>
                </SmallerGrid>
                <SmallerGrid>
                    <BoldSmallText> PRIMARY LOCATION </BoldSmallText>
                </SmallerGrid>
                <SmallestGrid>
                    <BoldSmallText> PUBLISHED </BoldSmallText>
                </SmallestGrid>
                <SmallestGrid>
                    <BoldSmallText> STATUS </BoldSmallText>
                </SmallestGrid>
                <SmallestGrid>
                    <BoldSmallText> ACTIONS </BoldSmallText>
                </SmallestGrid>
            </ArticleFeedTitleBar>
            <ArticleFeedWrapper>
                {   loadingStatus === 'loaded' ?
                    <>
                    {
                        articlesArrayLength === 0 ?
                        <FeedWrapper>
                            <CenterFeedMessage> All recent articles have been reviewed. Please check back later. </CenterFeedMessage>
                        </FeedWrapper>
                        :
                        <>
                        { ArticlesDisplayed }
                        </>
                    }
                    <EndOfFeedContainer>
                        {
                            articleKeysArray.length > 0 && 
                            <>
                            {LoadMoreButton}
                            </>
                        }
                    </EndOfFeedContainer>
                    </>
                    :
                    <>
                    {
                        FeedLoadingMessage
                    }
                    </>
                }
            </ArticleFeedWrapper>
        </>
        )
    }
}

export default ModeratorArticleFeedComponent;
