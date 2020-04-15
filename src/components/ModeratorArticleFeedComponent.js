// Moderator Article Feed Component
// Component that shows the moderator the article feeds, whether they are approved, rejected, or pending

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
import GlobalTheme from '../styledComponents/GlobalTheme'
// #toFix: don't like those names, change them. grid is better name.
import { TinyLayoutSpace, LargeLayoutSpace, SmallLayoutSpace } from '../styledComponents/ModeratorArticleFeed';
// import { NoBorderButton } from '../styledComponents/Buttons';
// #toDo: create index.jsfile in styled components to get all of components out?
import ModeratorArticleComponent from './ModeratorArticleComponent'
import { MediumText } from '../styledComponents/TextComponents';
import TabularButton from '../styledComponents/TabularButton';
import ModeratorFeedBottomBar from './ModeratorFeedBottomBar'

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
// const ParentCheckbox = styled.div`
//     height: 10px;
//     width: 10px;
//     background-color: ${props => props.allArticlesSelected === true ? 'black' : 'white'};
//     border: 1px black solid;
//     outline: none;
//     cursor: pointer;
//     border-radius: 3px;
// `

class ModeratorArticleFeedComponent extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            filterLocation: '',
            filterArticleStatus: '',
            sortBy: '',
            articleSelected: false, // Removed functionality for now
            statusFilter: 'pending',
            locationFilter: 'sanfrancisco',
            articleFeed: {
                1: {
                    title: 'COVID-19 finally eradicated',
                    summary: 'Finally, the day has come people. The day has come. This is not judgment day but a day of celebration, the celebration of our resilience but more importantly, the celebration of our victory over this deadly and insidious disease that has claimed the lives of so many of our compatriots.',
                    source: 'MLK TV',
                    date: '1 hour ago',
                    mod_status: 'pending',
                },
                2: {
                    title: 'COVID-19 death toll reaches 20 million',
                    summary: "In an unexpected turn of events, COVID-19 mutated into a more deadly form of itself, deemed by leading scientists as SUPER-COVID-19. After spreading rapidly throughout the African, Latin American, and Asian continents, the deadly virus' headcount has now reached 20 million people.",
                    source: 'The New York Times',
                    date: '4 days ago',
                    mod_status: 'pending'
                },
                3: {
                    title: 'COVID-19 mutates into SUPER-COVID-19',
                    summary: "Honestly, we don't really know what to say here. A month ago, scientists in Wuhan came up with a tested vaccine that was supposed to be shipped across the globe and finally put an end to this crisis, but we just learned yesterday that a new strain of COVID-19 has been rapidly spreading across Sub-saharian Africa. May we all wake up from this bad dream.",
                    source: 'WHO',
                    date: '5 days ago',
                    mod_status: 'pending'
                },
                4: {
                    title: 'Tokyo Olympics delayed until further notice',
                    summary: "It's all in the article. The board of directors tried to push for the olympics to take place in 2021, but let's be real here, it would be really stupid and no one would go. After months of deliberation, the board of trustees finally came to this painfully obvious realization and in an attempt to appear cautious and magnanimous, made their decision public yesterday at the Sony stadium.",
                    source: 'Tokyo Dearly',
                    date: '9 days ago',
                    mod_status: 'pending'
                },
                5: {
                    title: 'Super Smash Bros Battle released',
                    summary: "Some scientists have falsely and viciously declared that playing violent video games leads to more violent behavior throughout adulthood. We beg to differ. Nintendo has finally released a new Super Smash and this was the day that we've all been waiting for. Thank you.",
                    source: 'Freaks & Geeks Games',
                    date: '10 days ago',
                    mod_status: 'pending'
                }
            },
            selectedArticles: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
            },
            selectedArticleCounter: 0
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
        console.log('selecting article')
        let selectedArticles = {...this.state.selectedArticles};
        let currentArticleState = selectedArticles[articleID]
        
        // Ensures that only articles which haven't been approved or rejected yet increment the counter and are added
        // to the list of selected articles. Also ensures that the background doesn't change when clicked.
        if (this.state.articleFeed[articleID].mod_status !== 'Approved' && this.state.articleFeed[articleID].mod_status !== 'Rejected' ) {
            if (currentArticleState === true) {
                this.setState({
                    selectedArticleCounter: this.state.selectedArticleCounter - 1
                })
            } else {
                this.setState({
                    selectedArticleCounter: this.state.selectedArticleCounter + 1
                })  
            }
            selectedArticles[articleID] = !selectedArticles[articleID];
            this.setState({selectedArticles})
        }
    }

    approveArticles = () => {
        let articleFeed = {...this.state.articleFeed};
        let selectedArticles = {...this.state.selectedArticles};

        // Traverse list of selected articles. If article status is true, it is selected by user, therefore
        // we change the status of that article to 'Approved', revert it's selected status to false,
        // and finally make a call to the back-end to change the status
        Object.keys(this.state.selectedArticles).forEach((key) => {
            const selectedStatus = this.state.selectedArticles[key]
            if (selectedStatus === true){
                articleFeed[key].mod_status = 'Approved';
                selectedArticles[key] = false;
                // Store article ID in array
            }
        })
        
        // Make asyncrhonous back-end call here with articleID list
        
        this.setState({articleFeed, selectedArticles});
    }

    rejectArticles = () => {
        let articleFeed = {...this.state.articleFeed};
        let selectedArticles = {...this.state.selectedArticles};

        // Sames as approveArticles logic but opposite
        Object.keys(this.state.selectedArticles).forEach((key) => {
            const selectedStatus = this.state.selectedArticles[key]
            if (selectedStatus === true){
                articleFeed[key].mod_status = 'Rejected';
                selectedArticles[key] = false;
                // Store article ID in array
            }
        })
        
        // Make asynchronous back-end call here with articleID list
        this.setState({articleFeed, selectedArticles});
    }

    // #toFix: make the CityBUtton a component within itself. Loop through. Code not DRY.
    render(){
        console.log('Article selected', this.state.selectedArticles)
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
                        {/* <RightFilterWrapper>
                            <NoBorderButton>
                                Add Area
                            </NoBorderButton>
                        </RightFilterWrapper> */}
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
                        <RightFilterWrapper>
                            {/* Add code here for the Time Window Bar */}
                        </RightFilterWrapper>
                    </StatusFilterWrapper>
                </FilterWrapper>
            </FilterActionsWrapper>
            <MiddleFeedWrapper>
                <FeedSortingBar GlobalTheme={GlobalTheme} >
                    <TinyLayoutSpace >
                        {/* <ParentCheckbox  allArticlesSelected={this.state.allArticlesSelected} onClick={this.selectAllArticles} /> */}
                    </TinyLayoutSpace>
                    <LargeLayoutSpace> 
                        <GreyMediumText> Article </GreyMediumText>
                    </LargeLayoutSpace>
                    <SmallLayoutSpace>
                        <GreyMediumText> Source </GreyMediumText>
                    </SmallLayoutSpace>
                    <SmallLayoutSpace>
                        <GreyMediumText> Published </GreyMediumText>
                    </SmallLayoutSpace>
                    <SmallLayoutSpace>
                        <MediumText> Status </MediumText>
                    </SmallLayoutSpace>
                </FeedSortingBar>
                <ArticleFeedWrapper>
                    {
                        Object.keys(this.state.articleFeed).map((objectKey) => {
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
            <ModeratorFeedBottomBar 
                articleSelected={this.state.articleSelected} 
                selectedArticleCounter={this.state.selectedArticleCounter}
                approveArticles={this.approveArticles} 
                rejectArticles={this.rejectArticles}
            />
            </FeedWrapper>
        )
    }
}

export default ModeratorArticleFeedComponent;
