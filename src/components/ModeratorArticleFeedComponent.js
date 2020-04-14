// Moderator Article Feed Component
// Component that shows the moderator the article feeds, whether they are approved, rejected, or pending

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
import GlobalTheme from '../styledComponents/GlobalTheme'
import { CheckboxWrapper, LeftTextWrapper, MiddleTextWrapper, RightTextWrapper } from '../styledComponents/ModeratorArticleFeed';
import ModeratorArticleComponent from './ModeratorArticleComponent'
import { MediumText } from '../styledComponents/TextComponents';

const GreyMediumText = styled(MediumText)`
    color: #646464;
`

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
    height: 16%;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    min-height: 140px;
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

const StatusFilterWrapper = styled.div`
    background-color: transparent;
    min-height: 64px;
    height: 100%;
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    border-top-color: #C3CFD9;
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

// #toRemember #toFix: height of drop down and button needs to be the same
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
    background-color: #6558f5;
    margin-right: 40px;
    border-radius: 3px;
    color: white;
    font-weight: 500;
    width: 120px;
    font-size: 14px;
`;

const TopBarButton = styled(Button)`
    color: #6558f5;
    background-color: transparent;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #6558f5;
    width: auto;
    font-size: 15px;

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
    background-color: ${props => props.chosenStatus == props.id ? '#6558f5' : 'white'}; 
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
    color: ${props => props.chosenStatus == props.id ? '#293845' : '#6558f5'};
    border-style: none; 
    padding-left: 20px;
    padding-right: 20px;
`;

const CityButton = styled.h2`
    font-size: 15px;
    color: ${props => props.chosenLocation == props.id ? '#6558f5' : 'black'};
    font-weight: 500;
    height: 100%;
    padding-top: 20px;
    background-color: white;
    margin-right: 20px;
    display: inline-block;
    border-bottom-style: solid;
    border-bottom-color: ${props => props.chosenLocation == props.id ? '#6558f5' : 'white'};
    border-bottom-width: 3px;
    min-width: 50px;
    text-align: center;
    cursor: pointer;
`


const FeedSortingBar = styled.div`
    height: 40px;
    background-color: ${props => props.GlobalTheme.moderationPlatform.sharedLightGrey};
    display: flex;
    flex-direction: row;
`


const ArticleFeedWrapper = styled.div`
    background-color: transparent;
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

// Same as the one used in ./Checkbox in ./core folder, but here in order to trigger all of the checkboxes
// to be checked
const ParentCheckbox = styled.div`
    height: 10px;
    width: 10px;
    background-color: ${props => props.allArticlesSelected === true ? 'black' : 'white'};
    border: 1px black solid;
    outline: none;
    cursor: pointer;
    border-radius: 3px;
`

class ModeratorArticleFeedComponent extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            filterLocation: '',
            filterArticleStatus: '',
            sortBy: '',
            articleSelected: false,
            allArticlesSelected: false,
            statusFilter: 'pending',
            articleFeed: [
                {
                    title: 'Covid-19 takes 24 deaths in Africa',
                    summary: 'Never forget the day that Covid claimed the lvies of innocent citizens that used to live in America for the past three generations.',
                    source: 'The New York Times',
                    date: '4 days ago',
                },
                {
                    title: 'Covid-19 finally eradicated',
                    summary: 'Finally, the day has come people. The day has come. This is not judgment day but a day of celebration, the celebration of our individuality and more importantly, the celebration of our victory over this deadly and insidious virus that has claimed the lives of so many of our compatriots.',
                    source: 'MLK TV',
                    date: '6 days ago',
                }
            ],
            locationFilter: 'sanfrancisco'
        }
    }


    selectAllArticles = () => {
        this.setState({
            allArticlesSelected: !this.state.allArticlesSelected
        })
    }

    changeStatusFilter = (event) => {
        this.setState({
            statusFilter: event.target.id
        })
    }

    toggleLocationFilter = (event) => {
        this.setState({
            locationFilter: event.target.id
        })
    }

    render(){
        
        return(
            <FeedWrapper>
            <FilterActionsWrapper>
                <FilterWrapper>
                    <CityFilterWrapper>
                        <LeftFilterWrapper>
                            <CityButton id='sanfrancisco' 
                            chosenLocation={this.state.locationFilter} 
                            onClick={this.toggleLocationFilter}
                            > 
                            San Francisco 
                            </CityButton>
                            <CityButton id='seattle'
                            chosenLocation={this.state.locationFilter} 
                            onClick={this.toggleLocationFilter}
                            > 
                            Seattle 
                            </CityButton>
                            <CityButton id='all' 
                            chosenLocation={this.state.locationFilter} 
                            onClick={this.toggleLocationFilter}
                            >
                             All  
                            </CityButton>
                        </LeftFilterWrapper>
                        <RightFilterWrapper>
                            <TopBarButton>
                                Add Area
                            </TopBarButton>
                        </RightFilterWrapper>
                    </CityFilterWrapper>
                    <StatusFilterWrapper>
                        <LeftFilterWrapper>
                            <StatusButton 
                            id='pending' 
                            onClick={this.changeStatusFilter} 
                            chosenStatus={this.state.statusFilter}
                            > 
                            Needs Review 
                            </StatusButton>
                            <StatusButton 
                            id='approved' 
                            onClick={this.changeStatusFilter} 
                            chosenStatus={this.state.statusFilter}
                            > 
                            Approved 
                            </StatusButton>
                            <StatusButton 
                            id='rejected' 
                            onClick={this.changeStatusFilter} 
                            chosenStatus={this.state.statusFilter}
                            > 
                            Rejected 
                            </StatusButton>
                        </LeftFilterWrapper>
                    </StatusFilterWrapper>
                </FilterWrapper>
            </FilterActionsWrapper>
            <MiddleFeedWrapper>
                <FeedSortingBar GlobalTheme={GlobalTheme} >
                    <CheckboxWrapper >
                        <ParentCheckbox  allArticlesSelected={this.state.allArticlesSelected} onClick={this.selectAllArticles} />
                    </CheckboxWrapper>
                    <LeftTextWrapper> 
                        <GreyMediumText> Article </GreyMediumText>
                    </LeftTextWrapper>
                    <MiddleTextWrapper>
                        <GreyMediumText> Source </GreyMediumText>
                    </MiddleTextWrapper>
                    <RightTextWrapper>
                        <MediumText> Published </MediumText>
                    </RightTextWrapper>
                </FeedSortingBar>
                <ArticleFeedWrapper>
                    {
                        this.state.articleFeed.map((articleObject, index) => {
                            return <ModeratorArticleComponent props={articleObject} key={index} allArticlesSelected={this.state.allArticlesSelected} />
                        })
                    }
                </ArticleFeedWrapper>
            </MiddleFeedWrapper>
            <BottomBarWrapper articleSelected={this.state.articleSelected} >
                <BottomBarButton> Add Article </BottomBarButton>
            </BottomBarWrapper>
            </FeedWrapper>
        )
    }
}

export default ModeratorArticleFeedComponent;
