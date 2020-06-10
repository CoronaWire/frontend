// Moderator Article Component
// Invididual articles displayed to the moderators. Will have (from left to right) a checkbox, a title / summary
// of the article, the source of the article itself, and the published date of the article
// Props requirements if imported somewhere else:
// - articleObject object, 'checked' variable, 'index' variable (representing the article's key in the parent's local state object)
// and toggleArticleSelected function

// External Packages
import moment from 'moment'; // Not used anymore but might be used later to get a sense of how long ago the different articles were published 
import styled from 'styled-components'
import React, { Component } from 'react';
// Icons
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
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
    font-size: 12px;
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
    background-color: ${props => props.status === null || props.status === false ? '#D3455B' : '#1AAE9F'  }
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
`;

const CenteredSmallerGrid = styled(SmallerGrid)`
    justify-content: center;
    align-items: center;
    display: flex;
`;

const IconsWrapper = styled.div`
    width: auto;
    height: auto;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    visibility: ${props => (props.status === 'approved' || props.status === 'rejected') ? 'visible' : 'hidden'};
`

const IndividualIconWrapper = styled.div`
    height: 30px;
    width: 30px;
    border: 2px #0F0083 solid;
    background-color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 7px;
    margin-right: 7px;
    &:hover {
        background-color: #c7ceff;
    };
    position: relative;
`;

const StarStyles = {
    color: '#0F0083',
    backgroundColor: 'transparent',
    height: '50px',
};

const CloseStyles = {
    color: '#0F0083',
    backgroundColor: 'transparent',
    height: '50px',
};

const DescriptionTextWrapper = styled.div`
    position: absolute;
    top: -30px;
    width: 50px;
    height: 20px;
    background-color: #0F0083;
    border-radius: 5px;
    opacity: ${props => props.isTransparent ? 0 : 1};
    transition: opacity 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DescriptionText = styled.p`
    font-size: 12px;
    text-align: center;
    color: white;
    font-size: 500;
    width: auto;
    height: auto
    display: inline-block;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: transparent;
    vertically-align: middle;
`;

class ModeratorArticleComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
            isFeaturedTransparent: true,
            isDeleteTransparent: true,
        }
        this.toggleArticleSelected = this.props.toggleArticleSelected;
    }

    toggleFeatured = () => {
        let { isFeaturedTransparent } = this.state;
        console.log('Toggle featured is', isFeaturedTransparent);
        this.setState({
            isFeaturedTransparent: !isFeaturedTransparent,
        })
    }

    toggleDesigned = () => {
        let { isDeleteTransparent } = this.state;
        console.log('Toggle designed is', isDeleteTransparent)
        this.setState({
            isDeleteTransparent: !isDeleteTransparent,
        })
    }

    render() {
        const { articleID, articleIndex, articleObject } = this.props;
        const { isFeaturedTransparent, isDeleteTransparent } = this.state;
        const status = articleObject.mod_status
        const publishedTime = articleObject.published_at;
        // console.log('Published Time on article', publishedTime);
        // const publishedAt = removeHoursFromDate(this.props.articleObject.published_at);
        // console.log('Published at after hours removed', publishedAt);
        // const relativeTime = moment(`${publishedTime}`, "YYYY-MM-DDTHH:MM:SSZ").fromNow();
        // console.log('Relative time given by the moment js library', relativeTime);
        let convertedPublishedTime = new Date(publishedTime);
        convertedPublishedTime = convertedPublishedTime.toString()
        convertedPublishedTime = removeStandardTimeFromDate(convertedPublishedTime);

        // Capitalizes mod_status
        const mod_status =  status.charAt(0).toUpperCase() + status.slice(1);
        const hasLongLat = articleObject.longlat;
        const fipsProcessed = articleObject.fips_processed;
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
                            // If article is approved or rejected, then we show whether it was already FIPS processed
                            <StatusCircle status={fipsProcessed} />
                            :
                            <Checkbox checked={this.props.checked} onClick={() => this.props.toggleArticleSelected(articleID)} />

                        }
                    </TinyArticleGrid>
                    {
                        this.props.articleObject.mod_status === 'pending' ?
                        <ArticleGridApproveReject>
                            <ApproveRejectButton id='approve' onClick={() => this.props.approveArticleAndDeleteFromFeed(articleID)}>
                                <Text> Approve </Text>
                            </ApproveRejectButton>
                            <ApproveRejectButton id='reject' onClick={() => this.props.rejectArticleAndDeleteFromFeed(articleID)}>
                                <Text> Reject </Text>
                            </ApproveRejectButton>
                        </ArticleGridApproveReject>
                        :
                        // If article is approved or rejected, we show a status to show whether it has longLat values yet
                        <TinyGrid>
                                <StatusCircle status={hasLongLat} />
                        </TinyGrid>
                    }
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
                    <SmallerGrid>
                        <ArticleMetaDataText> {this.props.articleObject.source_id} </ArticleMetaDataText>
                    </SmallerGrid>
                    <SmallerGrid>
                        <ArticleMetaDataText> {this.props.articleObject.sourceloc} </ArticleMetaDataText>
                    </SmallerGrid>
                    <SmallGrid>
                        <ArticleMetaDataText> {convertedPublishedTime} </ArticleMetaDataText>
                    </SmallGrid>
                    
                    <CenteredSmallerGrid>
                        <IconsWrapper status={this.props.articleObject.mod_status}>
                            <IndividualIconWrapper onMouseEnter={this.toggleFeatured} onMouseLeave={this.toggleFeatured} >
                                <DescriptionTextWrapper isTransparent={isFeaturedTransparent} >
                                     <DescriptionText> Feature </DescriptionText> 
                                </DescriptionTextWrapper>
                                <StarBorderIcon style={StarStyles} />
                            </IndividualIconWrapper>
                            <IndividualIconWrapper onMouseEnter={this.toggleDesigned} onMouseLeave={this.toggleDesigned}>
                                <DescriptionTextWrapper isTransparent={isDeleteTransparent} > 
                                    <DescriptionText> Delete </DescriptionText> 
                                 </DescriptionTextWrapper>
                                <CloseOutlinedIcon style={CloseStyles} onClick={() => this.props.undoArticleApprovalRejection(articleID)} />
                            </IndividualIconWrapper>
                        </IconsWrapper>
                        {/* <ColumnWrapper status={this.props.articleObject.mod_status} >
                            <StatusText status={this.props.articleObject.mod_status}> {mod_status} </StatusText>
                            <UnderlinedMediumText onClick={() => this.props.undoArticleApprovalRejection(articleID)} > Undo </UnderlinedMediumText>
                        </ColumnWrapper> */}
                    </CenteredSmallerGrid>
                </IndividualArticleWrapper>
                
            </>
        )
    }
}

export default ModeratorArticleComponent;
