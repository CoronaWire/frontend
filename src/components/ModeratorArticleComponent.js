// Moderator Article Component
// Styling for the invididual articles displayed to the moderators
// Will have (from left to right) a checkbox, a title / summary of the article, 
// the source of the article itself, and the published date of the article

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components'
// Internal Modules
import { CheckboxWrapper, LeftTextWrapper, MiddleTextWrapper, RightTextWrapper } from '../styledComponents/ModeratorArticleFeed';
import { LargeText, SmallText } from '../styledComponents/TextComponents';
import GlobalTheme from '../styledComponents/GlobalTheme';


const IndividualArticleWrapper = styled.div`
    background-color: transparent;
    height: 115px;
    width: 100%;
    display:flex;
    flex-direction: row;
    &:hover {
        background-color: ${props => props.checked === true ? '#B2ACFA' : props.GlobalTheme.moderationPlatform.sharedLightGrey};
    };
    cursor: pointer;
    padding-top: 10px;
    background-color: ${props => props.checked === true ? '#B2ACFA' : 'white'};
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

const Checkbox = styled.div`
    height: 20px;
    width: 20px;
    background-color: ${props => props.checked === true ? '#6558f5' : 'white'};
    border: 1px #6558f5 solid;
    outline: none;
    cursor: pointer;
    border-radius: 3px;

`


class ModeratorArticleComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    toggleCheckbox = () => {
        
    }

    render() {
        return (
            <>
                <IndividualArticleWrapper 
                        GlobalTheme={GlobalTheme} 
                        onClick={() => this.props.toggleArticleSelected(this.props.index)}
                        checked={this.props.checked}
                    >
                    <CheckboxWrapper>
                        <Checkbox checked={this.props.checked} onClick={() => this.props.toggleArticleSelected(this.props.index)} />
                    </CheckboxWrapper>
                    <LeftTextWrapper>
                        <ArticleText>
                            <ArticleTitle>
                                {this.props.articleObject.title}
                            </ArticleTitle>
                            <ArticleSummary>
                                {this.props.articleObject.summary}
                            </ArticleSummary>
                        </ArticleText>
                    </LeftTextWrapper>
                    <MiddleTextWrapper>
                        <ArticleMetaDataText> {this.props.articleObject.source} </ArticleMetaDataText>
                    </MiddleTextWrapper>
                    <RightTextWrapper>
                        <ArticleMetaDataText> {this.props.articleObject.date} </ArticleMetaDataText>
                    </RightTextWrapper>
                </IndividualArticleWrapper>
                
            </>
        )
    }
}

export default ModeratorArticleComponent;
