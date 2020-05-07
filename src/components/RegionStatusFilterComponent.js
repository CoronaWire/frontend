// City Filter Component
// Component that will have the different location / area filters used by moderators to display the correct
// articles
// Used in /ModeratorCurateComponent

// Comments
// Currently - only two cities and "all"
// Later - extended so that there's scope selection (city, state, etc.) and a drop down for each

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
import TabularButton from '../styledComponents/TabularButton';
import { LeftPositionedWrapper, RightPositionedWrapper, MiddleWrapper } from '../styledComponents/PositionedWrappers';
import { MediumText } from '../styledComponents/Text';


const FiltersWrapper = styled.div`
    width: 100%;
    height: 60px;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-style: solid;
    border-bottom-color: #C6C9D1;
    border-bottom-width: 3px;
`

const CityButton = styled(TabularButton)`
    background-color: transparent;
    padding-top: 20px;
    &:hover {
        border-bottom-color: #6558F5;
    }
`

// Added to make space for the News Source Filter component which will replace the ArticleStatusFilterComponent's place
// Taken from the ArticleStatusFilterComponent


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
    &:hover {
        background-color: #6558f5;
        color: #293845;
    }
    transition: background-color 0.2s ease-in;
`;


class RegionStatusFilterComponent extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render(){
        return(
                <FiltersWrapper>
                    <LeftPositionedWrapper>
                        <CityButton id='all' // #toDo: Make 'all' capitalized in both moderation-app-engine service and ModeratorCurateFunction
                        selectedID={this.props.locationFilter} 
                        onClick={this.props.toggleLocationFilter}
                        >
                            All  
                        </CityButton>
                        <CityButton id='California' 
                        selectedID={this.props.locationFilter} 
                        onClick={this.props.toggleLocationFilter}
                        > 
                        California 
                        </CityButton>
                        <CityButton id='Washington'
                        selectedID={this.props.locationFilter} 
                        onClick={this.props.toggleLocationFilter}
                        > 
                        Washington
                        </CityButton>
                        <CityButton id='Global'
                        selectedID={this.props.locationFilter} 
                        onClick={this.props.toggleLocationFilter}
                        > 
                        Global
                        </CityButton>
                        <CityButton id='National'
                        selectedID={this.props.locationFilter} 
                        onClick={this.props.toggleLocationFilter}
                        > 
                        National
                        </CityButton>
                        <MiddleWrapper>
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
                    </MiddleWrapper>
                    </LeftPositionedWrapper>
                    <RightPositionedWrapper>
                        {/* <NoBorderButton>
                            Add Area
                        </NoBorderButton> */}
                        <MediumText> {this.props.totalArticlesCount} Total Articles </MediumText>

                    </RightPositionedWrapper>
                </FiltersWrapper>
        )
    }
}

export default RegionStatusFilterComponent;