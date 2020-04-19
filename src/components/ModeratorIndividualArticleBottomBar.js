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

const LargeAcceptRejectButton = styled(AcceptRejectButton)`
    width: 140px;
`

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

class ModeratorIndividualArticleBottomBar extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render(){
        return(
                <BottomBarWrapper >
                    <LeftPositionedWrapper>
                        <OutlineButton >
                            Save
                        </OutlineButton>
                    </LeftPositionedWrapper>
                    <RightPositionedWrapper>
                        <LargeAcceptRejectButton status={'reject'}>
                            Reject and Next
                        </LargeAcceptRejectButton>
                        <LargeAcceptRejectButton status={'approve'}>
                            Approve and Next
                        </LargeAcceptRejectButton>
                    </RightPositionedWrapper>
                </BottomBarWrapper>
        )
    }
}

export default ModeratorIndividualArticleBottomBar;
