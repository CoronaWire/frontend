// Moderator Article Feed Component
// Component that shows the moderator the article feeds, whether they are approved, rejected, or pending

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
// Styled Components
// import { NoBorderButton } from '../styledComponents/Buttons';
// Sub-Components
import CityFilterComponent from './CityFilterComponent'
import ModeratorArticleFeedComponent from './ModeratorArticleFeedComponent';
import ModeratorIndividualArticleComponent from './ModeratorIndividualArticleComponent';
import ModeratorArticleFeedBottomBar from './ModeratorArticleFeedBottomBar'
import ModeratorIndividualArticleBottomBar from './ModeratorIndividualArticleBottomBar';
import ArticleStatusFilterComponent from './ArticleStatusFilterComponent';
import IndividualArticleTopActionComponent from './IndividualArticleTopActionComponent';

// #toDo: create index.jsfile in styled components to get all of components out

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
`;

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
`;

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
// `;

class ModeratorCurateComponent extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            filterLocation: '',
            filterArticleStatus: '',
            sortBy: '',
            articleSelected: false, // Removed functionality for now
            statusFilter: 'pending',
            locationFilter: 'sanfrancisco',
            pageDisplayed: 'articleFeed',
            articleFeed: {
                1: {
                    id: 1,
                    title: 'COVID-19 finally eradicated',
                    summary: 'Finally, the day has come people. The day has come. This is not judgment day but a day of celebration, the celebration of our resilience but more importantly, the celebration of our victory over this deadly and insidious disease that has claimed the lives of so many of our compatriots.',
                    source: 'MLK TV',
                    date: '1 hour ago',
                    mod_status: 'pending',
                },
                2: {
                    id: 2,
                    title: 'COVID-19 death toll reaches 20 million',
                    summary: "In an unexpected turn of events, COVID-19 mutated into a more deadly form of itself, deemed by leading scientists as SUPER-COVID-19. After spreading rapidly throughout the African, Latin American, and Asian continents, the deadly virus' headcount has now reached 20 million people.",
                    source: 'The New York Times',
                    date: '4 days ago',
                    mod_status: 'pending'
                },
                3: {
                    id: 3,
                    title: 'COVID-19 mutates into SUPER-COVID-19',
                    summary: "Honestly, we don't really know what to say here. A month ago, scientists in Wuhan came up with a tested vaccine that was supposed to be shipped across the globe and finally put an end to this crisis, but we just learned yesterday that a new strain of COVID-19 has been rapidly spreading across Sub-saharian Africa. May we all wake up from this bad dream.",
                    source: 'WHO',
                    date: '5 days ago',
                    mod_status: 'pending'
                },
                4: {
                    id: 4,
                    title: 'Tokyo Olympics delayed until further notice',
                    summary: "It's all in the article. The board of directors tried to push for the olympics to take place in 2021, but let's be real here, it would be really stupid and no one would go. After months of deliberation, the board of trustees finally came to this painfully obvious realization and in an attempt to appear cautious and magnanimous, made their decision public yesterday at the Sony stadium.",
                    source: 'From Tokyo With Love?',
                    date: '9 days ago',
                    mod_status: 'pending'
                },
                5: {
                    id: 5,
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
            articleFeedArray: [],
            selectedArticleCounter: 0,
            articleCurrentlyDisplayed: null,
            articleDisplayedIndex: null,

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
        let articleSelectedState = selectedArticles[articleID]
        
        // Ensures that only articles which haven't been approved or rejected yet increment the counter and are added
        // to the list of selected articles. Also ensures that the background doesn't change when clicked.
        if (this.state.articleFeed[articleID].mod_status !== 'Approved' && this.state.articleFeed[articleID].mod_status !== 'Rejected' ) {
            if (articleSelectedState === true) {
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

    approveSeveralArticles = () => {
        let articleFeed = {...this.state.articleFeed};
        let selectedArticles = {...this.state.selectedArticles};
        let countToSubtract = 0;
        // Traverse list of selected articles. If article status is true, it is selected by user, therefore
        // we change the status of that article to 'Approved', revert it's selected status to false,
        // and finally make a call to the back-end to change the status
        Object.keys(this.state.selectedArticles).forEach((key) => {
            const selectedStatus = this.state.selectedArticles[key]
            if (selectedStatus === true){
                articleFeed[key].mod_status = 'Approved';
                // Re-set selection to false
                selectedArticles[key] = false;
                // Ensure to decrement the counter
                countToSubtract += 1
                // Store article ID in array
            }
        })
        
        // Make asynchronous back-end call here with articleID list
        
        // #toResearch: why did one asynchronous call to setState on same property work instead of
        // a few one after the other
        this.setState({selectedArticleCounter: this.state.selectedArticleCounter-countToSubtract});
        this.setState({articleFeed, selectedArticles});
    }

    rejectSeveralArticles = () => {
        let articleFeed = {...this.state.articleFeed};
        let selectedArticles = {...this.state.selectedArticles};
        let countToSubtract = 0;

        // Sames as approveSeveralArticles logic but opposite
        Object.keys(this.state.selectedArticles).forEach((key) => {
            const selectedStatus = this.state.selectedArticles[key]
            if (selectedStatus === true){
                articleFeed[key].mod_status = 'Rejected';
                // Re-set selection to false
                selectedArticles[key] = false;
                // Ensure to decrement the counter
                countToSubtract += 1
                // Store article ID in array
            }
        })
        
        this.setState({selectedArticleCounter: this.state.selectedArticleCounter-countToSubtract});
        // Make asynchronous back-end call here with articleID list
        this.setState({articleFeed, selectedArticles});
    }

    approveIndividualArticle = (articleID) => {
        const articleFeed = {...this.state.articleFeed};
        articleFeed[articleID].mod_status = 'Approved';
        this.setState({articleFeed})
    }

    rejetIndividualArticle = (articleID) => {
        const articleFeed = {...this.state.articleFeed};
        articleFeed[articleID].mod_status = 'Rejected';
        this.setState({articleFeed})
    }
    
    undoArticleApprovalRejection = (articleID) => {
        let articleFeed = {...this.state.articleFeed};
        articleFeed[articleID].mod_status = 'pending';
        this.setState({articleFeed});
    }

    togglePageDisplayed = () => {
        this.setState({
            pageDisplayed: this.state.pageDisplayed === 'articleFeed' ? 'individualArticle' : 'articleFeed'
        })
    }

    selectIndividualArticle = (articleID, articleIndex) => {
        this.setState({
            articleCurrentlyDisplayed: articleID,
            pageDisplayed: this.state.pageDisplayed === 'articleFeed' ? 'individualArticle' : 'articleFeed',
            articleDisplayedIndex: articleIndex,
        })
    }

    nextArticle = () => {
        const { articleDisplayedIndex } = this.state;
        const feedLength = Object.keys(this.state.articleFeed).length;
        this.setState({
            articleDisplayedIndex: articleDisplayedIndex === feedLength-1 ? 0 : articleDisplayedIndex + 1
        })
    }

    previousArticle = () => {
        const { articleDisplayedIndex } = this.state;
        const feedLength = Object.keys(this.state.articleFeed).length;
        this.setState({
            articleDisplayedIndex:  articleDisplayedIndex === 0 ? feedLength - 1 : articleDisplayedIndex-1
        })
    }

    approveAndNextArticle = () => {
        const { articleDisplayedIndex, articleFeed } = this.state;
        const articleKey = Object.keys(articleFeed)[Number(articleDisplayedIndex)];
        const articleObject = articleFeed[articleKey]
        const articleID = articleObject.id;
        this.nextArticle();
        this.approveIndividualArticle(articleID);
    }

    // #toDo: ensure that calculations for length are only done once.
    rejectAndNextArticle = () => {
        const { articleDisplayedIndex, articleFeed } = this.state;
        const articleKey = Object.keys(articleFeed)[Number(articleDisplayedIndex)];
        const articleObject = articleFeed[articleKey]
        const articleID = articleObject.id;
        this.nextArticle();
        this.rejetIndividualArticle(articleID);
    }

    // #toFix: make the CityBUtton a component within itself. Loop through. Code not DRY.
    render(){
        const articleFeedArrayKeys = Object.keys(this.state.articleFeed);
        const currentArticle = this.state.articleFeed[Number(articleFeedArrayKeys[this.state.articleDisplayedIndex])]
        console.log('Article currently displayed index', this.state.articleDisplayedIndex);
        console.log('Current article', currentArticle);
        return(
            <FeedWrapper>
                <FilterActionsWrapper>
                    <FilterWrapper>
                        <CityFilterComponent locationFilter={this.state.locationFilter} toggleLocationFilter={this.toggleLocationFilter} />
                        {
                            this.state.pageDisplayed === 'articleFeed' ?
                            <ArticleStatusFilterComponent statusFilter={this.state.statusFilter} changeStatusFilter={this.changeStatusFilter} />   
                            :
                            <IndividualArticleTopActionComponent 
                            togglePageDisplayed={this.togglePageDisplayed}
                            nextArticle={this.nextArticle}
                            previousArticle={this.previousArticle} 
                            />
                        }
                    </FilterWrapper>
                </FilterActionsWrapper>
                <MiddleFeedWrapper>
                    {
                        this.state.pageDisplayed === 'articleFeed' ?
                        <ModeratorArticleFeedComponent 
                        toggleArticleSelected={this.toggleArticleSelected}
                        undoArticleApprovalRejection={this.undoArticleApprovalRejection}
                        selectedArticles={this.state.selectedArticles}
                        articleFeed={this.state.articleFeed}
                        selectIndividualArticle={this.selectIndividualArticle}
                        />
                        :
                        <ModeratorIndividualArticleComponent articleObject={currentArticle} />
                    }
                </MiddleFeedWrapper>
                {
                    this.state.pageDisplayed === 'articleFeed' ?
                    <ModeratorArticleFeedBottomBar 
                        articleSelected={this.state.articleSelected} 
                        selectedArticleCounter={this.state.selectedArticleCounter}
                        approveSeveralArticles={this.approveSeveralArticles} 
                        rejectSeveralArticles={this.rejectSeveralArticles}
                    />
                    :
                    <ModeratorIndividualArticleBottomBar 
                        approveAndNextArticle={this.approveAndNextArticle}
                        rejectAndNextArticle={this.rejectAndNextArticle}
                    />
                }
            </FeedWrapper>
        )
    }
}

export default ModeratorCurateComponent;
