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
import { LeftPositionedWrapper, RightPositionedWrapper } from '../styledComponents/PositionedWrappers';
import { MediumText } from '../styledComponents/Text';

const CityFilterWrapper = styled.div`
    width: auto;
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
`

class CityFilterComponent extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render(){
        return(
                <CityFilterWrapper>
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
                    </LeftPositionedWrapper>
                    
                    <RightPositionedWrapper>
                        {/* <NoBorderButton>
                            Add Area
                        </NoBorderButton> */}
                        <MediumText> {this.props.articleCount} Total Articles </MediumText>

                    </RightPositionedWrapper>
                </CityFilterWrapper>
        )
    }
}

export default CityFilterComponent;