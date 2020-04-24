// Moderator Article Feed Component
// Component that lists all of the articles displayed to the moderators

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
import GlobalTheme from '../styledComponents/GlobalTheme';
import { MediumText } from '../styledComponents/TextComponents';
import { TinyGrid, LargeGrid, SmallGrid } from '../styledComponents/GridLayout';
// Sub-Components
import ModeratorArticleComponent from './ModeratorArticleComponent'

const GreyMediumText = styled(MediumText)`
    color: #646464;
`

const ArticleFeedTitleBar = styled.div`
    height: 40px;
    background-color: ${props => props.GlobalTheme.moderationPlatform.sharedLightGrey};
    display: flex;
    flex-direction: row;
`;

const ArticleFeedWrapper = styled.div`
    background-color: transparent;
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

class ModeratorArticleFeedComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render(){
        const arr = Object.keys(this.props.articleFeed);
        console.log('Article feed array', arr);
        return(
            <>
            <ArticleFeedTitleBar GlobalTheme={GlobalTheme} >
                <TinyGrid >
                    {/* <ParentCheckbox  allArticlesSelected={this.state.allArticlesSelected} onClick={this.selectAllArticles} /> */}
                </TinyGrid>
                <LargeGrid> 
                    <GreyMediumText> Article </GreyMediumText>
                </LargeGrid>
                <SmallGrid>
                    <GreyMediumText> Source </GreyMediumText>
                </SmallGrid>
                <SmallGrid>
                    <GreyMediumText> Published </GreyMediumText>
                </SmallGrid>
                <SmallGrid>
                    <MediumText> Status </MediumText>
                </SmallGrid>
            </ArticleFeedTitleBar>
            <ArticleFeedWrapper>
                {
                    Object.keys(this.props.articleFeed).map((objectKey, index) => {
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
                                />
                    })
                }
            </ArticleFeedWrapper>
        </>
        )
    }
}

export default ModeratorArticleFeedComponent;