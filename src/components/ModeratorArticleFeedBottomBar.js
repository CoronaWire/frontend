// Moderator Feed Bottom Bar
// Displayed within ./ModeratorArticleFeedComponent
// Bar placed at the bottom of the article feed displayed to the moderators that allows them to
// parse through a list of 'pending', 'accepted', 'rejected' articles in terms of moderator selected areas,
// approve or reject these articles, and finally add articles
// Functionality: Allows moderator to 1. Add Article or 2. Approve / Reject articles 

// External Packages
import styled from 'styled-components';
import React, { PureComponent } from 'react';
// Internal Modules
import GlobalTheme from '../styledComponents/GlobalTheme'
import { LargeText } from '../styledComponents/TextComponents';
import { FilledButton, OutlineButton, AcceptRejectButton } from '../styledComponents/Buttons';
import { LeftPositionedWrapper, RightPositionedWrapper } from '../styledComponents/PositionedWrappers';

const BottomBarWrapper = styled.div`
    height: 67px;
    background-color: ${props => props.selectedArticleCounter ? props.GlobalTheme.moderationPlatform.sharedLightGrey : 'transparent'};
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.selectedArticleCounter ? 'space-between' : 'flex-end'};
    align-items: center;
    border-top-width: 2px;
    border-top-color: #C3CFD9;
    border-top-style:solid;
`

const MiddleWrapper = styled(LeftPositionedWrapper)`
    background-color: transparent;
    justify-content: center;
`

const ArticleSelectedText = styled(LargeText)`
    color: #293845;
`


class ModeratorArticleFeedBottomBar extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }


    render(){
        console.log('props', this.props)
        return(
            <>
            {
                this.props.selectedArticleCounter === 0 ?
                <BottomBarWrapper GlobalTheme={GlobalTheme} >
                    <RightPositionedWrapper>
                        {/* <FilledButton> Add Article </FilledButton> */}
                        <OutlineButton> Made For Local Placeholder </OutlineButton>
                    </RightPositionedWrapper>
                </BottomBarWrapper>
                : 
                <BottomBarWrapper GlobalTheme={GlobalTheme} selectedArticleCounter={this.props.selectedArticleCounter} >
                    <LeftPositionedWrapper>
                        <OutlineButton >
                            Cancel
                        </OutlineButton>
                    </LeftPositionedWrapper>
                    <MiddleWrapper>
                        <ArticleSelectedText>
                            {this.props.selectedArticleCounter} selected
                        </ArticleSelectedText>
                    </MiddleWrapper>
                    <RightPositionedWrapper>
                        <AcceptRejectButton status={'reject'} onClick={this.props.rejectSeveralArticles}>
                            Reject
                        </AcceptRejectButton>
                        <AcceptRejectButton status={'approve'} onClick={this.props.approveSeveralArticles} >
                            Approve
                        </AcceptRejectButton>
                    </RightPositionedWrapper>
                </BottomBarWrapper>
            }
            </>

        )
    }
}

export default ModeratorArticleFeedBottomBar;