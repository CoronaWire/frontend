// Moderator Article Component
// Invididual articles displayed to the moderators. Will have (from left to right) a checkbox, a title / summary
// of the article, the source of the article itself, and the published date of the article
// Props requirements if imported somewhere else:
// - articleObject object, 'checked' variable, 'index' variable (representing the article's key in the parent's local state object)
// and toggleArticleSelected function

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components'
import moment from 'moment';
// Internal Modules
import GlobalTheme from '../styledComponents/GlobalTheme';
import { TinyGrid, LargeGrid, SmallGrid, SmallerGrid } from '../styledComponents/GridLayout';
import { LargeText, SmallText, UnderlinedMediumText, MediumText } from '../styledComponents/Text';
import { removeHoursFromDate, removeStandardTimeFromDate } from '../utilityFunctions';
import { timeSince } from './../helpers/datetime';

const IndividualArticleWrapper = styled.div`
    background-color: transparent;
    height: 125px;
    width: 100%;
    display:flex;
    flex-direction: row;
    &:hover {
        background-color: ${props => props.checked === true ? '#B2ACFA' : props.GlobalTheme.moderationPlatform.sharedLightGrey};
    };
    cursor: pointer;
    background-color: ${props => props.checked === true ? '#B2ACFA' : 'white'};
    flex-shrink: 0;
`;



const ArticleText = styled.div`
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
`;

const ArticleImage = styled.img`
    height: 100%;
    width: 200px;
`;

const ArticleTitle = styled(LargeText)`
    margin-bottom: 5px;
    margin-top: 5px;
`;

const ArticleSummary = styled(SmallText)`
    max-height: 70px;
    overflow-y: scroll;
    color: #646464;
`;

const ArticleMetaDataText = styled(MediumText)`
    background-color: transparent;
    font-size: 13px;
`

// #toDo #globalTheme: move colors up to global theme
const StatusText = styled(ArticleMetaDataText)`
    color: ${props => props.status === 'approved' ? '#1AAE9F' : '#D3455B' };
    font-weight: 500;
    visibility: inherit;
    margin-bottom: 10px;
`

const Checkbox = styled.div`
    height: 15px;
    width: 15px;
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
    background-color: ${props => props.status === 'approved' ? '#1AAE9F' : '#D3455B' }
`

// #toFix #toDo: create a core component that styles column
const ColumnWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    visibility: ${props => (props.status === 'approved' || props.status === 'rejected') ? 'visible' : 'hidden'};
`

const LargeArticleGrid = styled(LargeGrid)`
    display: flex;
    flex-direction: row;
`;

const TinyArticleGrid = styled(TinyGrid)`
    &:hover {
        background-color: ${props => props.modStatus != 'pending' ? 'transparent' : '#B2ACFA'};
    }
`
const ArticleGridApproveReject = styled(TinyGrid)`
    flex-direction: column;
    background-color: transparent;
    height: 100%;
`

const ApproveRejectButton = styled.div`
    height: 50%;
    width: 100%;
    background-color: ${props => props.id === 'approve' ?   '#1AAE9F' : '#D3455B'};
    text-align: center;
    align-items: center;
    color: white;
    display: flex;
    font-size: 14px;
    font-weight: 500;
    &:hover {
        background-color: ${props => props.id === 'approve' ?   '#179a8d' : '#ad384a'};
    } 
`

const Text = styled.p`
    color: white;
    font-size: 14px;
    text-align: center;
    width: 100%;
`

class ModeratorArticleComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
        this.toggleArticleSelected = this.props.toggleArticleSelected;
    }

    render() {
        const { articleID, articleIndex, articleObject } = this.props;
        const status = articleObject.mod_status
        const publishedTime = articleObject.published_at;
        // console.log('Published Time on article', publishedTime);
        // const publishedAt = removeHoursFromDate(this.props.articleObject.published_at);
        // console.log('Published at after hours removed', publishedAt);
        // const relativeTime = moment(`${publishedTime}`, "YYYY-MM-DDTHH:MM:SSZ").fromNow();
        // console.log('Relative time given by the moment js library', relativeTime);
        let readable = new Date(publishedTime);
        readable = readable.toString()
        readable = removeStandardTimeFromDate(readable);

        // Capitalizes mod_status
        const mod_status =  status.charAt(0).toUpperCase() + status.slice(1)
        return (
            <>
                <IndividualArticleWrapper 
                        GlobalTheme={GlobalTheme} 
                        // onClick={() => this.props.toggleArticleSelected(articleID)}
                        checked={this.props.checked}
                        
                    >
                    <TinyArticleGrid onClick={() => this.props.toggleArticleSelected(articleID)} modStatus={this.props.articleObject.mod_status}>
                        {
                            (this.props.articleObject.mod_status === 'approved' || this.props.articleObject.mod_status === 'rejected') ?
                            <StatusCircle status={this.props.articleObject.mod_status} />
                            :
                            <Checkbox checked={this.props.checked} onClick={() => this.props.toggleArticleSelected(articleID)} />

                        }
                    </TinyArticleGrid>
                    <ArticleGridApproveReject>
                        { this.props.articleObject.mod_status === 'pending' &&
                            <>
                            <ApproveRejectButton id='approve' onClick={() => this.props.approveArticleAndDeleteFromFeed(articleID)}>
                                <Text> Approve </Text>
                            </ApproveRejectButton>
                            <ApproveRejectButton id='reject' onClick={() => this.props.rejectArticleAndDeleteFromFeed(articleID)}>
                                <Text> Reject </Text>
                            </ApproveRejectButton>
                            </>
                        }
                    </ArticleGridApproveReject>
                    <LargeArticleGrid onClick={() =>this.props.selectIndividualArticle(articleID, articleIndex, articleObject)} id={articleID}>
                        {/* <ArticleImage src={this.props.articleObject.image_url} /> */}
                        <ArticleText>
                            <ArticleTitle>
                                {this.props.articleObject.title}
                            </ArticleTitle>
                            <ArticleSummary>
                                {this.props.articleObject.summary}
                            </ArticleSummary>
                        </ArticleText>
                    </LargeArticleGrid>
                    <SmallGrid>
                        <ArticleMetaDataText> {this.props.articleObject.source_id} </ArticleMetaDataText>
                    </SmallGrid>
                    <SmallGrid>
                        <ArticleMetaDataText> {readable} </ArticleMetaDataText>
                    </SmallGrid>
                    <SmallGrid>
                        <ColumnWrapper status={this.props.articleObject.mod_status} >
                            <StatusText status={this.props.articleObject.mod_status}> {mod_status} </StatusText>
                            <UnderlinedMediumText onClick={() => this.props.undoArticleApprovalRejection(articleID)} > Undo </UnderlinedMediumText>
                        </ColumnWrapper>
                    </SmallGrid>
                </IndividualArticleWrapper>
                
            </>
        )
    }
}

export default ModeratorArticleComponent;
