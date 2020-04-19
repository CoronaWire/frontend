// City Filter Component
// Component that will have the different location / area filters used by moderators to display the correct
// articles
// #currently - only two cities and "all"
// #later - extended so that there's scope selection (city, state, etc.) and a drop down for each

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
import TabularButton from '../styledComponents/TabularButton';
import { LeftPositionedWrapper, RightPositionedWrapper } from '../styledComponents/PositionedWrappers';

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
    border-bottom-width: 3px
`

const CityButton = styled(TabularButton)`
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
                        <CityButton id='sanfrancisco' 
                        selectedState={this.props.locationFilter} 
                        onClick={this.props.toggleLocationFilter}
                        > 
                        San Francisco 
                        </CityButton>
                        <CityButton id='seattle'
                        selectedState={this.props.locationFilter} 
                        onClick={this.props.toggleLocationFilter}
                        > 
                        Seattle 
                        </CityButton>
                        <CityButton id='all' 
                        selectedState={this.props.locationFilter} 
                        onClick={this.props.toggleLocationFilter}
                        >
                            All  
                        </CityButton>
                    </LeftPositionedWrapper>
                    {/* <RightPositionedWrapper>
                        <NoBorderButton>
                            Add Area
                        </NoBorderButton>
                    </RightPositionedWrapper> */}
                </CityFilterWrapper>
        )
    }
}

export default CityFilterComponent;