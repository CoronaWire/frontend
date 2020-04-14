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
import TabularButton from '../styledComponents/TabularButton';

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

const CityButton = styled(TabularButton)`
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
            articleSelected: false, // Removed functionality for now
            allArticlesSelected: false,
            statusFilter: 'pending',
            articleFeed: {
                1: {
                    title: 'COVID-19 finally eradicated',
                    summary: 'Finally, the day has come people. The day has come. This is not judgment day but a day of celebration, the celebration of our resilience but more importantly, the celebration of our victory over this deadly and insidious disease that has claimed the lives of so many of our compatriots.',
                    source: 'MLK TV',
                    date: '1 hour ago',
                },
                2: {
                    title: 'COVID-19 death toll reaches 20 million',
                    summary: "In an unexpected turn of events, COVID-19 mutated into a more deadly form of itself, deemed by leading scientists as SUPER-COVID-19. After spreading rapidly throughout the African, Latin American, and Asian continents, the deadly virus' headcount has now reached 20 million people.",
                    source: 'The New York Times',
                    date: '4 days ago',
                }
            },
            locationFilter: 'sanfrancisco',
            selectedArticles: {
                1: false,
                2: false,
            }
        }
        // #comment: articles will be either stored in redux state or locally.
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

    // Generally recommended to avoid nesting within React Component state, but in this case, it seems 
    // to be the simplest solution in order to ensure that we can update our components accordingly
    toggleArticleSelected = (articleID) => {
        let selectedArticles = {...this.state.selectedArticles};
        selectedArticles[articleID] = !selectedArticles[articleID];
        this.setState({selectedArticles})
    }

    render(){
        return(
            <FeedWrapper>
            <FilterActionsWrapper>
                <FilterWrapper>
                    <CityFilterWrapper>
                        <LeftFilterWrapper>
                            <CityButton id='sanfrancisco' 
                            selectedState={this.state.locationFilter} 
                            onClick={this.toggleLocationFilter}
                            > 
                            San Francisco 
                            </CityButton>
                            <CityButton id='seattle'
                            selectedState={this.state.locationFilter} 
                            onClick={this.toggleLocationFilter}
                            > 
                            Seattle 
                            </CityButton>
                            <CityButton id='all' 
                            selectedState={this.state.locationFilter} 
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
                        {/* <ParentCheckbox  allArticlesSelected={this.state.allArticlesSelected} onClick={this.selectAllArticles} /> */}
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
                        Object.keys(this.state.articleFeed).map((objectKey) => {
                            console.log('Object keys', objectKey);
                            const articleObject = this.state.articleFeed[objectKey];
                            const articleKey = Number(objectKey)
                            return <ModeratorArticleComponent 
                                articleObject={articleObject} 
                                key={objectKey} 
                                toggleArticleSelected={this.toggleArticleSelected}
                                checked={this.state.selectedArticles[articleKey]}
                                index={articleKey}
                                />
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
