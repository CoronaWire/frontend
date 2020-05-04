// Moderator Individual Article Bottom Bar
// Bar displayed when the "ModeratorIndividualArticleComponent" page is displayed, when a moderator attempts
// to edit an article
// Contains buttons that allow Moderator to approve/reject current article and move to the next one

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
// Internal Modules
import { OutlineButton, AcceptRejectButton } from '../styledComponents/Buttons';
import { LeftPositionedWrapper, RightPositionedWrapper } from '../styledComponents/PositionedWrappers';

// Same as BottomBarWrapper as in the ModeratorArticleFeedBottomBar but requires less customization
// #toDo: maybe move it to one location to keep the code DRY? 
// #unlike the ModeratorArticleBottomBar, height here is set as px instead of %. choose one.
const BottomBarWrapper = styled.div`
    height: 67px;
    background-color: transparent;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top-width: 2px;
    border-top-color: #C3CFD9;
    border-top-style:solid;
`

const DelayOutlineButton = styled(OutlineButton)`
    opacity: ${props => props.disabled === true ? 0.7 : 1};
    cursor: ${props => props.disabled === true ? 'not-allowed' : 'pointer'};
`;

class ModeratorIndividualArticleBottomBar extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
            disabled: false,
        }
    }


    toggleDisabled = () => {
        this.setState({
            disabled: !this.state.disabled
        })
    }

    handleSaveButton = () => {
        // Make sure to disable it for a few seconds once an article is saved
        if (this.state.disabled === false) {
            this.toggleDisabled();
            // Call to higher-order function in order to save article into the DB 
            this.props.saveArticleToDatabase();
            setTimeout(this.toggleDisabled, 5000);
        }
    }

    componentWillUnmount = () => {

    }
    render(){
        return(
                <BottomBarWrapper>
                    <LeftPositionedWrapper>
                        <DelayOutlineButton onClick={this.handleSaveButton} disabled={this.state.disabled} >
                            Save
                        </DelayOutlineButton>
                    </LeftPositionedWrapper>
                    {
                        this.props.statusFilter === 'pending' 
                        &&
                        <RightPositionedWrapper>
                            <AcceptRejectButton status={'reject'} onClick={this.props.rejectAndNextArticle} >
                                Reject and Next
                            </AcceptRejectButton>
                            <AcceptRejectButton status={'approve'} onClick={this.props.approveAndNextArticle} >
                                Approve and Next
                            </AcceptRejectButton>
                        </RightPositionedWrapper>
                    }

                </BottomBarWrapper>
        )
    }
}

export default ModeratorIndividualArticleBottomBar;
