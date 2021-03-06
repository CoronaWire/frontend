// Moderator Article Feed Component
// Component that lists all of the articles displayed to the moderators

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
import GlobalTheme from '../styledComponents/GlobalTheme';
import { SmallText } from '../styledComponents/Text';
import { TinyGrid, LargeGrid, SmallGrid, SmallerGrid } from '../styledComponents/GridLayout';
import { OutlineButton } from '../styledComponents/Buttons';

// Sub-Components
import ModeratorArticleComponent from './ModeratorArticleComponent'

const BoldSmallText = styled(SmallText)`
    color: #646464;
    font-weight: 600;
`;


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

class ModeratorArticleFeedComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render(){
        const articleKeysArray = Object.keys(this.props.articleFeed);
        return(
            <>
            <ArticleFeedTitleBar GlobalTheme={GlobalTheme} >
                <TinyGrid >
                    <BoldSmallText> Select </BoldSmallText>
                </TinyGrid>
                <TinyGrid>
                    {/* Added here in order to make the alignment consistent with the below elements */}
                </TinyGrid>
                <LargeGrid> 
                    <BoldSmallText> Article </BoldSmallText>
                </LargeGrid>
                <SmallGrid>
                    <BoldSmallText> Source </BoldSmallText>
                </SmallGrid>
                <SmallGrid>
                    <BoldSmallText> Published </BoldSmallText>
                </SmallGrid>
                <SmallGrid>
                    <BoldSmallText> Status </BoldSmallText>
                </SmallGrid>
            </ArticleFeedTitleBar>
            <ArticleFeedWrapper>
                {
                    articleKeysArray.map((objectKey, index) => {
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
                                />
                    })
                }
                <EndOfFeedContainer>
                    {
                        articleKeysArray.length > 0 && <Button onClick={this.props.retrieveMoreArticles}> Load more Articles </Button>
                    }
                </EndOfFeedContainer>
            </ArticleFeedWrapper>
        </>
        )
    }
}

export default ModeratorArticleFeedComponent;
