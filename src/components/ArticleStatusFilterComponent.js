// Article Status Filter Component
// Filter bar placed the top of the article feed. Contains three buttons "Pending", "Approved", "Rejected" that change
// the type of article displayed and a time window drop down on the right

// Exernal Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
import { LeftPositionedWrapper, RightPositionedWrapper } from '../styledComponents/PositionedWrappers';

const StatusFilterWrapper = styled.div`
    background-color: transparent;
    min-height: 64px;
    flex: 1;
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const StatusButton = styled.button`
    background-color: ${props => props.chosenStatus === props.id ? '#6558f5' : 'white'}; 
    border-radius: 20px;
    margin-right: 15px;
    height: 40px;
    outline: none;
    font-size: 15px;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    min-width: 90px;
    cursor: pointer;
    font-weight: 600;
    color: ${props => props.chosenStatus === props.id ? '#293845' : '#6558f5'};
    border-style: none; 
    padding-left: 20px;
    padding-right: 20px;
`;

class ArticleStatusFilterComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render() {
        return (
            <StatusFilterWrapper>
            <LeftPositionedWrapper>
                <StatusButton 
                id='pending' 
                onClick={this.props.changeStatusFilter} 
                chosenStatus={this.props.statusFilter}
                > 
                Needs Review
                </StatusButton>
                <StatusButton 
                id='approved' 
                onClick={this.props.changeStatusFilter} 
                chosenStatus={this.props.statusFilter}
                > 
                Approved 
                </StatusButton>
                <StatusButton 
                id='rejected' 
                onClick={this.props.changeStatusFilter} 
                chosenStatus={this.props.statusFilter}
                > 
                Rejected 
                </StatusButton>
            </LeftPositionedWrapper>
            <RightPositionedWrapper>
                {/* Add code here for the Time Window Bar */}
            </RightPositionedWrapper>
            </StatusFilterWrapper>
        )
    }
}

export default ArticleStatusFilterComponent;
