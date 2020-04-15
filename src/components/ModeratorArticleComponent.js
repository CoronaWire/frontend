// Moderator Article Component
// Invididual articles displayed to the moderators. Will have (from left to right) a checkbox, a title / summary
// of the article, the source of the article itself, and the published date of the article
// Props requirements if imported somewhere else:
// - articleObject object, 'checked' variable, 'index' variable (representing the article's key in the parent's local state object)
// and toggleArticleSelected function

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components'
// Internal Modules
import { TinyLayoutSpace, LargeLayoutSpace, SmallLayoutSpace } from '../styledComponents/ModeratorArticleFeed';
import { LargeText, SmallText, UnderlinedMediumText } from '../styledComponents/TextComponents';
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

// #toDo #globalTheme: move colors up to global theme
const StatusText = styled(ArticleMetaDataText)`
    color: ${props => props.status === 'Approved' ? '#1AAE9F' : '#D3455B'};
    font-weight: 500;
    visibility: inherit;
    margin-bottom: 10px;
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

// #toDo #globalTheme: move colors up to global theme
const StatusCircle = styled.div`
    height: 15px;
    width: 15px;
    border-radius: 50%;
    outline: none;
    background-color: ${props => props.status === 'Approved' ? '#1AAE9F' : '#D3455B'}
`

// #toFix #toDo: create a core component that styles column
const ColumnWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    visibility: ${props => (props.status === 'Approved' || props.status === 'Rejected')? 'visible' : 'hidden'};
`

class ModeratorArticleComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render() {
        console.log('articleObject', this.props.articleObject)
        console.log('article index', this.props.index)
        return (
            <>
                <IndividualArticleWrapper 
                        GlobalTheme={GlobalTheme} 
                        onClick={() => this.props.toggleArticleSelected(this.props.index)}
                        checked={this.props.checked}
                    >
                    <TinyLayoutSpace>
                        {
                            (this.props.articleObject.mod_status === 'Approved' || this.props.articleObject.mod_status === 'Rejected') ?
                            <StatusCircle status={this.props.articleObject.mod_status} />
                            :
                            <Checkbox checked={this.props.checked} onClick={() => this.props.toggleArticleSelected(this.props.index)} />

                        }
                    </TinyLayoutSpace>
                    <LargeLayoutSpace>
                        <ArticleText>
                            <ArticleTitle>
                                {this.props.articleObject.title}
                            </ArticleTitle>
                            <ArticleSummary>
                                {this.props.articleObject.summary}
                            </ArticleSummary>
                        </ArticleText>
                    </LargeLayoutSpace>
                    <SmallLayoutSpace>
                        <ArticleMetaDataText> {this.props.articleObject.source} </ArticleMetaDataText>
                    </SmallLayoutSpace>
                    <SmallLayoutSpace>
                        <ArticleMetaDataText> {this.props.articleObject.date} </ArticleMetaDataText>
                    </SmallLayoutSpace>
                    <SmallLayoutSpace>
                        <ColumnWrapper status={this.props.articleObject.mod_status} >
                            <StatusText> {this.props.articleObject.mod_status} </StatusText>
                            <UnderlinedMediumText> Undo </UnderlinedMediumText>
                        </ColumnWrapper>
                    </SmallLayoutSpace>
                </IndividualArticleWrapper>
                
            </>
        )
    }
}

export default ModeratorArticleComponent;
