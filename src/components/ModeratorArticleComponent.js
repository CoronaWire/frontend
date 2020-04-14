// Moderator Article Component
// Styling for the invididual articles displayed to the moderators
// Will have (from left to right) a checkbox, a title / summary of the article, 
// the source of the article itself, and the published date of the article

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components'
// Internal Modules
import { CheckboxWrapper, LeftTextWrapper, MiddleTextWrapper, RightTextWrapper } from '../styledComponents/ModeratorArticleFeed';
import { Checkbox } from './core';
import { LargeText, SmallText } from '../styledComponents/TextComponents';
import GlobalTheme from '../styledComponents/GlobalTheme';

const IndividualArticleWrapper = styled.div`
    background-color: transparent;
    height: 150px;
    width: 100%;
    display:flex;
    flex-direction: row;
    &:hover {
        background-color: ${props => props.GlobalTheme.moderationPlatform.sharedLightGrey};;
    };
    cursor: pointer;
    padding-top: 10px;
`

const ArticleText = styled.div`
    width: auto;
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
`

const ArticleTitle = styled(LargeText)`
    margin-bottom: 5px;
    margin-top: 5px;
`;

const ArticleSummary = styled(SmallText)`
    max-height: 70px;
    overflow-y: scroll;
    color: #646464;
`;

const ArticleMetaDataText = styled(LargeText)`
    background-color: transparent;
`

class ModeratorArticleComponent extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render() {
        const { allArticlesSelected } = this.props;

        return (
            <>
                <IndividualArticleWrapper GlobalTheme={GlobalTheme} >
                    <CheckboxWrapper>
                        <Checkbox allArticlesSelected={allArticlesSelected} />
                    </CheckboxWrapper>
                    <LeftTextWrapper>
                        <ArticleText>
                            <ArticleTitle>
                                {this.props.props.title}
                            </ArticleTitle>
                            <ArticleSummary>
                                {this.props.props.summary}
                            </ArticleSummary>
                        </ArticleText>
                    </LeftTextWrapper>
                    <MiddleTextWrapper>
                        <ArticleMetaDataText> {this.props.props.source} </ArticleMetaDataText>
                    </MiddleTextWrapper>
                    <RightTextWrapper>
                        <ArticleMetaDataText> {this.props.props.date} </ArticleMetaDataText>
                    </RightTextWrapper>
                </IndividualArticleWrapper>
                
            </>
        )
    }
}

export default ModeratorArticleComponent;
