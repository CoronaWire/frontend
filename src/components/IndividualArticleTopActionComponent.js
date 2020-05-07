// Individual Article Top Action Component
// Component displayed above the "IndividualArticleComponent" that allows a user to move to the next / previous
// article, and also to go back to the previous page of all article feedsà

// Exernal Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
import { LeftPositionedWrapper, RightPositionedWrapper } from '../styledComponents/PositionedWrappers';
import { OutlineButton } from '../styledComponents/Buttons';
import { UnderlinedMediumText } from '../styledComponents/Text';

const ActionsWrapper = styled.div`
    background-color: transparent;
    min-height: 64px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SmallOutlineButton = styled(OutlineButton)`
    margin-left: 20px;
    width: 80px;
`

class IndividualArticleTopActionComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render() {
        return (
            <ActionsWrapper>
            <LeftPositionedWrapper>
                <UnderlinedMediumText onClick={this.props.togglePageDisplayed}> Back to Article </UnderlinedMediumText>
            </LeftPositionedWrapper>
            <RightPositionedWrapper>
                <SmallOutlineButton onClick={this.props.previousArticle}> Previous </SmallOutlineButton>
                <SmallOutlineButton onClick={this.props.nextArticle}> Next </SmallOutlineButton>
            </RightPositionedWrapper>
            </ActionsWrapper>
        )
    }
}

export default IndividualArticleTopActionComponent;