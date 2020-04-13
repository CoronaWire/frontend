// Moderator Article Feed Component
// Component that shows the moderator the article feeds, whether they are approved, rejected, or pending

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules


const FeedWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`

const FilterActionsWrapper = styled.div`
    width: 100%;
    height: 20%
    background-color: transparent;
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    min-height: 140px;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: black;
`

const FilterWrapper = styled.div`
    height: auto;
    width: 100%;
    box-sizing: content-box;
    background-color: transparent;
    display: flex;
    flex-direction: column;
`

const CityFilterWrapper = styled.div`
    width: auto;
    height: 50px;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const StatusFilterWrapper = styled(CityFilterWrapper)`
    background-color: transparent;
    height: 70px;
`

// #toFix: middlefeedwrapper and bottomfeedwrapper do not render properly
// will cause issues with different screen sizes, since height is partly % and partly
// fixed
const MiddleFeedWrapper = styled.div`
    width: 100%;
    height: 66%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    min-height: 330px;
`

const BottomBarWrapper = styled.div`
    height: 67px;
    background-color: transparent;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.articleSelected === true ? 'space-between' : 'flex-end'};
    align-items: center;
    border-top-width: 2px;
    border-top-color: black;
    border-top-style:solid;
`

const DropDownText = styled.h3`
    width: 80px;
    font-size: 17px;
    color: black;
    font-weight: 600;
    display: inline-block;
    background-color: transparent;
    margin-left: 20px;
    margin-right: 10px;
`;

const DropDownMenuPlaceholder = styled.div`
    height: 30px;
    width: 200px;
    background-color: transparent;
    border-radius: 5px;
    display: inline-block;
    margin-left: 25px;
    border-style: solid;
    border-width: 1px;
    border-color: black;
`

const PublishRejectWrapper = styled(FilterWrapper)`
    width: 30%;
`

const ButtonWrapper = styled(CityFilterWrapper)`
    justify-content: flex-end;
    padding-right: 14px;
`

// #toRemember: height of drop down and button needs to be the same
// store in global theme?

const Button = styled.div`
    background-color: ${props => props.buttonType === 'Publish' ? 'green' : 'red'};
    height: 30px;
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
`;

const BottomBarButton = styled(Button)`
    background-color: purple;
    margin-right: 40px;
`;

const TopBarButton = styled(Button)`
    color: #242A49;
    background-color: transparent;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #242A49;
    width: auto;
`

const LeftFilterWrapper = styled.div`
    height: 100%;
    background-color: transparent;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const RightFilterWrapper = styled.div`
    height: 100%;
    background-color: transparent;
    margin-right: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const StatusButton = styled.button`
    background-color: #D9CAFF;
    border-radius: 20px;
    margin-right: 15px;
    height: 45px;
    outline: none;
    font-size: 16px;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    min-width: 90px;
`;

class ModeratorArticleFeedComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterLocation: '',
            filterArticleStatus: '',
            sortBy: '',
            articleSelected: false,
        }
    }

    render(){
        return(
            <FeedWrapper>
            <FilterActionsWrapper>
                <FilterWrapper>
                    <CityFilterWrapper>
                        <LeftFilterWrapper>
                            <StatusButton id='sanfrancisco'> San Francisco </StatusButton>
                            <StatusButton id='seattle'> Seattle </StatusButton>
                            <StatusButton id='all'> All </StatusButton>
                        </LeftFilterWrapper>
                        <RightFilterWrapper>
                            <TopBarButton>
                                Add Area
                            </TopBarButton>
                        </RightFilterWrapper>
                    </CityFilterWrapper>
                    <StatusFilterWrapper>
                        <LeftFilterWrapper>
                            <StatusButton id='pending'> Needs Review </StatusButton>
                            <StatusButton id='approved'> Approved </StatusButton>
                            <StatusButton id='rejected'> Rejected </StatusButton>
                        </LeftFilterWrapper>
                    </StatusFilterWrapper>
                </FilterWrapper>
            </FilterActionsWrapper>
            <MiddleFeedWrapper />
            <BottomBarWrapper articleSelected={this.state.articleSelected} >
                <BottomBarButton> Add Article </BottomBarButton>
            </BottomBarWrapper>
            </FeedWrapper>
        )
    }
}

export default ModeratorArticleFeedComponent;
