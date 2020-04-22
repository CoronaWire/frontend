// Moderator Article Feed Component
// Component that shows the moderator the article feeds, whether they are approved, rejected, or pending

// External Packages
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
// Utility Function
import { transformIntoArticleObject, createObjectOfArticleIDs } from '../utilityFunctions';

// #toDo: create index.jsfile in styled components to get all of components out
const MODERATOR_API_URL = 'https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/status/';

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
            locationFilter: 'all',
            pageDisplayed: 'articleFeed',
            articleFeed: {},
            selectedArticles: {},
            articleFeedArray: [],
            selectedArticleCounter: 0,
            articleCurrentlyDisplayed: null,
            articleDisplayedIndex: null,

        }
        // #comment: articles will be either stored in redux state or locally.
    }


    componentDidMount = async () => {
        const paramObject = {
            status: 'pending', 
            region: undefined
        }
        this.retrieveArticle(paramObject);
    }

    selectAllArticles = () => {
        this.setState({
            allArticlesSelected: !this.state.allArticlesSelected
        })
    }

    retrieveArticle = async (paramObject) => {
        const { status, region } = paramObject;
        let returnedResponse;
        if (region == undefined) {
            const allArticlesURL = MODERATOR_API_URL + `${status}`;
            returnedResponse = await axios.get(allArticlesURL);
        } else {
            const articlesWithinRegionURL = MODERATOR_API_URL + `${status}` + '/region/' + `${region}`;
            console.log('about to make call to ', articlesWithinRegionURL);
            returnedResponse = await axios.get(articlesWithinRegionURL);
        }
        const articlesArray = returnedResponse.data;
        const articleFeedObject = transformIntoArticleObject(articlesArray)
        const articleIDObject = createObjectOfArticleIDs(articlesArray);
        console.log('Returned response', returnedResponse);
        console.log('Article object', articleFeedObject)
        this.setState({
            articleFeed: articleFeedObject,
            selectedArticles: articleIDObject
        })
    }

    // #toDo: use the same verbs. change or toggle. toggle is more for buttons, change is better here.
    changeStatusFilter = (event) => {
        const status = event.target.id;
        this.setState({
            statusFilter: status
        })
        
        // Object passed in order to retrieve articles by status
        const paramObject = {
            status: status,
            region: this.state.locationFilter === "all" ? undefined : this.state.locationFilter
        }
        // Call the retrieveArticle function to retrieve articles
        this.retrieveArticle(paramObject);
    }

    toggleLocationFilter = (event) => {
        const location = event.target.id;
        this.setState({
            locationFilter: location
        })
        console.log('location shifted', location)

        // #toDo: function name and location in state should be changed
        // Object passed in order to retrieve articles by status
        const paramObject = {
            status: this.state.statusFilter,
            region: location === "all" ? undefined : location
        }
        // Call the retrieveArticle function to retrieve articles
        this.retrieveArticle(paramObject);
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
        // Array of all the different article_ids for the articles displayed. Allows us to loop through
        // list of articles when attempting to edit
        const articleFeedArrayKeys = Object.keys(this.state.articleFeed);
        // Current article chosen by the user
        const currentArticle = this.state.articleFeed[articleFeedArrayKeys[this.state.articleDisplayedIndex]]
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
