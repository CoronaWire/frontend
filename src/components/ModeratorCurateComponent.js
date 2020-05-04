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
import { transformIntoArticleObject, createObjectOfArticleIDs, getSelectedArticles} from '../utilityFunctions';

// URLs
import { ARTICLE_URL, APPROVE_ARTICLE_URL, REJECT_ARTICLE_URL, MAKE_ARTICLE_PENDING_URL, retrieveArticlesURL, retrieveGlobalArticleURL, retrieveNationalArticleURL } from '../URL';

// #toDo: create index.jsfile in styled components to get all of components out
const FeedWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

// #toDo: change names
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
    height: 90%;
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
            numOfArticlesReturned: 0,
            currentlySelectedArticle: {},

        }
        // #comment: articles will be either stored in redux state or locally.
    }


    componentDidMount = async () => {
        const paramObject = {
            status: 'pending', 
            region: 'all',
            offset: 0,
        }
        this.retrieveArticle(paramObject);
    }

    selectAllArticles = () => {
        this.setState({
            allArticlesSelected: !this.state.allArticlesSelected
        })
    }

    retrieveArticle = async (paramObject) => {
        const { status, region, offset} = paramObject;
        let returnedResponse, articlesArray;

        if (region === 'National') {
            const NATIONAL_API_URL = retrieveNationalArticleURL(status, offset);
            returnedResponse = await axios.get(NATIONAL_API_URL);
            articlesArray = returnedResponse.data;
            // #toDo: this needs to be done either on back-end or within the individual component
                     
        } else if (region === 'Global') {
            const GLOBAL_API_URL = retrieveGlobalArticleURL(status, offset);
            returnedResponse = await axios.get(GLOBAL_API_URL);
            articlesArray = returnedResponse.data;
                   
        } else {
            const MODERATOR_API_URL = retrieveArticlesURL(status, region, offset); // #Need to change the offset initially
            returnedResponse = await axios.get(MODERATOR_API_URL);
            articlesArray = returnedResponse.data.articlesArray;
            let articleCount = returnedResponse.data.articleCount[0].count;
            this.setState({articleCount})
        }
        console.log('Returned response from back-end', returnedResponse);
        let articleFeedObject = transformIntoArticleObject(articlesArray)
        let selectedArticlesObject = createObjectOfArticleIDs(articlesArray);
        // console.log('Returned response', returnedResponse);
        // console.log('Article object', articleFeedObject)

        this.setState({
            articleFeed: articleFeedObject,
            selectedArticles: selectedArticlesObject,
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
            region: this.state.locationFilter,
            offset: 0,
        }
        // Call the retrieveArticle function to retrieve articles
        
        // Ensures that we're able to use the numOfArticles returned as an offset later for pagination
        const numOfArticles = Object.keys(this.state.articleFeed).length;
        this.setState({
            numOfArticlesReturned: numOfArticles
        })

        // Makes API call to retrieve the data
        this.retrieveArticle(paramObject);

        // Ensures that we move back to the article feed component 
        this.goBackToArticleFeed()
    }

    toggleLocationFilter = (event) => {
        const location = event.target.id;
        this.setState({
            locationFilter: location
        })

        // #toDo: function name and location in state should be changed
        // Object passed in order to retrieve articles by status
        const paramObject = {
            status: this.state.statusFilter,
            region: location, // #toDo: get rid of this useless ternary operator,
            offset: 0,
        }

        // Ensures that we're able to use the numOfArticles returned as an offset later for pagination
        const numOfArticles = Object.keys(this.state.articleFeed).length;
        this.setState({
            numOfArticlesReturned: numOfArticles
        })

        // Call the retrieveArticle function to retrieve articles
        this.retrieveArticle(paramObject);
        // Makes sure we go back to article feed component
        this.goBackToArticleFeed()
    }

    retrieveMoreArticles = async () => {
        const articleLength = Object.keys(this.state.articleFeed).length;
        console.log(`Offset is ${articleLength}`);
        let status = this.state.statusFilter, region = this.state.locationFilter, offset = articleLength;
        let returnedResponse, URL, articlesArray, articleCount;

        if (region === 'National') {
            URL = retrieveNationalArticleURL(status, offset);
            returnedResponse = await axios.get(URL);
            articlesArray = returnedResponse.data ? returnedResponse.data : [];
        } else if (region === 'Global') {
            URL = retrieveGlobalArticleURL(status, offset);
            returnedResponse = await axios.get(URL);
            articlesArray = returnedResponse.data ? returnedResponse.data : [];
        } else {
            URL = retrieveArticlesURL(status, region, offset);
            returnedResponse = await axios.get(URL);
            articlesArray = returnedResponse.data.articlesArray;
            articleCount = returnedResponse.data.articleCount[0].count;
        }
        console.log(`Returned response`);
        console.log(returnedResponse);
        // #toDo: this needs to be done either on back-end or within the individual component
        let articleFeedObject = transformIntoArticleObject(articlesArray)
        let hashOfArticleIDs = createObjectOfArticleIDs(articlesArray);
 
        // Merge the objects together
        const previousArticleFeed = this.state.articleFeed;
        const previousSelectedArticles = this.state.selectedArticles;
        
        articleFeedObject = Object.assign({}, previousArticleFeed, articleFeedObject);
        hashOfArticleIDs = Object.assign({}, previousSelectedArticles, hashOfArticleIDs);

        this.setState({
            articleFeed: articleFeedObject,
            selectedArticles: hashOfArticleIDs,
            articleCount: articleCount
        })

    }

    // Generally recommended to avoid nesting within React Component state, but in this case, it seems 
    // to be the simplest solution in order to ensure that we can update our components accordingly
    toggleArticleSelected = (articleID) => {
        let selectedArticles = {...this.state.selectedArticles};
        let articleSelectedState = selectedArticles[articleID]
        
        // Ensures that only articles which haven't been approved or rejected yet increment the counter and are added
        // to the list of selected articles. Also ensures that the background doesn't change when clicked.
        if (this.state.articleFeed[articleID].mod_status !== 'approved' && this.state.articleFeed[articleID].mod_status !== 'rejected' ) {
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

    approveSeveralArticles = async () => {
        let articleFeed = {...this.state.articleFeed};
        let selectedArticles = {...this.state.selectedArticles};
        let countToSubtract = 0;

        console.log('Selected articles,', this.state.selectedArticles);
        // Get an array of all the article_ids of the articles selected
        const articleIDArray = getSelectedArticles(this.state.selectedArticles);
        const URL = APPROVE_ARTICLE_URL;
        console.log('Article ID Array about to be approved', articleIDArray);
        // Send request with array of article_ids to server to approve individual or several articles
        let approveArticlesResponse = await axios.put(URL, {
            articleIDArray: articleIDArray, 
        })
        console.log(`Approve Article Response`, approveArticlesResponse)

        // Traverse list of selected articles. If article status is true, it is selected by user, therefore
        // we change the status of that article to 'approved', revert it's selected status to false,
        // and finally make a call to the back-end to change the status
        Object.keys(this.state.selectedArticles).forEach((key) => {
            const selectedStatus = this.state.selectedArticles[key]
            if (selectedStatus === true){

                // Initial approach, simply change the status to "approved so that it can be shown on the front-end"
                // articleFeed[key].mod_status = 'approved';
                // // Re-set selection state to false
                selectedArticles[key] = false;
                // // Ensure to decrement the counter
                // countToSubtract += 1
                // // Store article ID in array

                // Second approach (proposed by Joe in the first QA) is to delete them directly
                this.deleteArticleFromFeed(key);
            }
        })
        
        // Make asynchronous back-end call here with articleID list
        
        // #toResearch: why did one asynchronous call to setState on same property work instead of
        // a few one after the other
        this.setState({selectedArticleCounter: 0});
        this.setState({selectedArticles});
    }

    rejectSeveralArticles = async () => {
        let articleFeed = {...this.state.articleFeed};
        let selectedArticles = {...this.state.selectedArticles};
        let countToSubtract = 0;

        // Get an array of all the article_ids of the articles selected
        const articleIDArray = getSelectedArticles(this.state.selectedArticles);
        const URL = REJECT_ARTICLE_URL;
        // Send request with array of article_ids to server to reject individual or several articles
        let rejectArticlesResponse = await axios.put(URL, {
            articleIDArray: articleIDArray, 
        })
        console.log('Reject Article Response', rejectArticlesResponse)

        // Sames as approveSeveralArticles logic but opposite
        Object.keys(this.state.selectedArticles).forEach((key) => {
            const selectedStatus = this.state.selectedArticles[key]
            if (selectedStatus === true){

                // First method, which modified the state of the article object to ensure that newly rejected articles
                // were displayed with a specific UI based on the 'mod_status' being rejected
                // articleFeed[key].mod_status = 'rejected';
                // Re-set selection to false
                selectedArticles[key] = false;
                // Ensure to decrement the counter
                // countToSubtract += 1
                // Store article ID in array

                // Deletes article from article object
                this.deleteArticleFromFeed(key);
            }
        })
        
        this.setState({selectedArticleCounter: 0});
        // Make asynchronous back-end call here with articleID list
        this.setState({selectedArticles});
    }


    deleteArticleFromFeed = (key) => {
        const articleFeed = {...this.state.articleFeed};
        delete articleFeed[key];
        this.setState({
            articleFeed: articleFeed
        })
    }

    // Both of these functions are only useful if the article status is changed on the 'pending' page
    approveIndividualArticle = async (articleID) => {
        // const articleFeed = {...this.state.articleFeed};
        // articleFeed[articleID].mod_status = 'Approved';
        // this.setState({articleFeed})
        const URL = APPROVE_ARTICLE_URL;
        let articleIDArray = [articleID];
        console.log('article ID Array', articleIDArray)
        try {
            let approveArticleResponse = await axios.put(URL, { articleIDArray: articleIDArray });
            console.log('Approve article', approveArticleResponse);
        } catch (error) {
            console.error(`Error caught in approveIndividualArticle function ${error}`)
        }
    }

    rejetIndividualArticle = async (articleID) => {
        // const articleFeed = {...this.state.articleFeed};
        // articleFeed[articleID].mod_status = 'Rejected';
        // this.setState({articleFeed})
        const URL = REJECT_ARTICLE_URL;
        let articleIDArray = [articleID];
        try {
            let rejectArticleResponse = await axios.put(URL, { articleIDArray: articleIDArray });
            console.log('Reject article', rejectArticleResponse);
        } catch (error) {
            console.error(`Error caught in rejetIndividualArticle function ${error}`)
        }
    }
    
    undoArticleApprovalRejection = async (articleID) => {
        const URL = MAKE_ARTICLE_PENDING_URL;

        // Send call to back-end to ensure article mod_status is changed to pending
        try {
            let makeArticlePendingResponse = await axios.put(URL, {
                articleID: articleID, 
            })
        } catch (error) {
            console.error(`Error caught while attempting to make article ${articleID} pending`)
        }

        // Reflect change in the internal state
        const key = articleID;
        this.deleteArticleFromFeed(key);
        // let articleFeed = {...this.state.articleFeed};
        // articleFeed[articleID].mod_status = 'pending';
        // this.setState({articleFeed});
    }

    togglePageDisplayed = () => {
        this.setState({
            pageDisplayed: this.state.pageDisplayed === 'articleFeed' ? 'individualArticle' : 'articleFeed'
        })

        // Ensures that articles are re-fetched again, in case article data was updated.
        const paramObject = {
            region: this.state.locationFilter,
            status: this.state.statusFilter,
            offset: 0
        }

        this.retrieveArticle(paramObject);
    }

    selectIndividualArticle = (articleID, articleIndex, articleObject) => {
        console.log('Individual article selected', articleID);
        this.setState({
            articleCurrentlyDisplayed: articleID,
            pageDisplayed: this.state.pageDisplayed === 'articleFeed' ? 'individualArticle' : 'articleFeed',
            articleDisplayedIndex: articleIndex,
            currentlySelectedArticle: articleObject
        })
    }

    goBackToArticleFeed = () => {
        this.setState({
            pageDisplayed: 'articleFeed'
        })
    }

    nextArticle = () => {
        let { articleDisplayedIndex } = this.state;
        console.log('Index of article currently displayed', articleDisplayedIndex)
        const feedLength = Object.keys(this.state.articleFeed).length;
        console.log('Article feed length', feedLength);
        const articleFeedArrayKeys = Object.keys(this.state.articleFeed);
        articleDisplayedIndex = articleDisplayedIndex === feedLength-1 ? 0 : articleDisplayedIndex + 1;
        console.log('New article displayed index', articleDisplayedIndex);
        const currentlyDisplayedArticleObject = this.state.articleFeed[articleFeedArrayKeys[this.state.articleDisplayedIndex]]
        console.log('Next article to display', currentlyDisplayedArticleObject);
        this.setState({
            articleDisplayedIndex: articleDisplayedIndex,
            currentlySelectedArticle: currentlyDisplayedArticleObject
        })
    }

    previousArticle = () => {
        let { articleDisplayedIndex } = this.state;
        const feedLength = Object.keys(this.state.articleFeed).length;
        const articleFeedArrayKeys = Object.keys(this.state.articleFeed);
        articleDisplayedIndex = articleDisplayedIndex === 0 ? feedLength - 1 : articleDisplayedIndex-1
        const currentlyDisplayedArticleObject = this.state.articleFeed[articleFeedArrayKeys[this.state.articleDisplayedIndex]]
        this.setState({
            articleDisplayedIndex: articleDisplayedIndex,
            currentlySelectedArticle: currentlyDisplayedArticleObject        
        })
    }

    approveAndNextArticle = () => {
        const { articleDisplayedIndex, articleFeed } = this.state;
        console.log('current article before next called', articleDisplayedIndex);
        const articleKey = Object.keys(articleFeed)[Number(articleDisplayedIndex)];
        const articleObject = articleFeed[articleKey]
        const articleID = articleObject.article_id;
        this.nextArticle();
        console.log('current article ID', articleID);
        this.approveIndividualArticle(articleID);
        this.deleteArticleFromFeed(articleKey);
    }

    // #toDo: ensure that calculations for length are only done once.
    rejectAndNextArticle = () => {
        const { articleDisplayedIndex, articleFeed } = this.state;
        const articleKey = Object.keys(articleFeed)[Number(articleDisplayedIndex)];
        const articleObject = articleFeed[articleKey]
        const articleID = articleObject.article_id;
        this.nextArticle();
        this.rejetIndividualArticle(articleID);
        this.deleteArticleFromFeed(articleKey);

    }

    // Edits the currently selected articles information (ie. title, summary, etc.) in order to send it to the back-end 
    // later and save it
    editArticleInformation = (propertyToEdit, editedText) => {
        // console.log('Currently selected article', this.state.currentlySelectedArticle);
        const articleObject = {...this.state.currentlySelectedArticle};
        articleObject[propertyToEdit] = editedText;
        this.setState({
            currentlySelectedArticle: articleObject
        })
    }

    // As the name suggests, makes a PUT request with data recently edited stored in this.state.currentlySelectedArticle
    // to store the newly edited article in the DB
    // #later: Should we add more editable fields in the moderation platform?
    saveArticleToDatabase = async () => {
        const currentArticleObject  = {...this.state.currentlySelectedArticle};
        const { summary, title, author, city, state, country, article_id, specificity } = currentArticleObject;

        try {
            let updateArticleResponse = await axios.put(ARTICLE_URL, {
                summary: summary,
                title: title,
                author: author,
                city: city,
                state: state,
                country: country,
                article_id: article_id,
                specificity: specificity
            })
            console.log('Save article to database response');
            console.log(updateArticleResponse)
        } catch (error) {
            console.error(`Error caught in saveArticle function ${error}`);
        }
    }

    // #toFix: make the CityBUtton a component within itself. Loop through. Code not DRY.
    render(){
        // Array of all the different article_ids for the articles displayed. Allows us to loop through
        // list of articles when attempting to edit
        const articleFeedArrayKeys = Object.keys(this.state.articleFeed);
        const {articleCount} = this.state;
        // Current article chosen by the user
        // console.log('Index of article displayed', this.state.articleDisplayedIndex)
        // console.log('Current article object', this.state.currentlySelectedArticle);
        // console.log('Article feed', this.state.articleFeed)
        // console.log('Article currently displayed index', this.state.articleDisplayedIndex);
        // console.log('Article currently displayed ', this.state.articleCurrentlyDisplayed);
        // console.log('Current article', currentArticle);

        return(
            <FeedWrapper>
                <FilterActionsWrapper>
                    <FilterWrapper>
                        <CityFilterComponent 
                            locationFilter={this.state.locationFilter} 
                            toggleLocationFilter={this.toggleLocationFilter}
                            articleCount={articleCount} />
                        {
                            this.state.pageDisplayed === 'articleFeed' ?
                            <ArticleStatusFilterComponent 
                            statusFilter={this.state.statusFilter} 
                            changeStatusFilter={this.changeStatusFilter} 
                            articleCount={articleCount}
                            />   
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
                        retrieveMoreArticles={this.retrieveMoreArticles}
                        />
                        :
                        <ModeratorIndividualArticleComponent 
                         articleObject={this.state.currentlySelectedArticle}
                         editArticleInformation={this.editArticleInformation}
                         />
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
                        saveArticleToDatabase={this.saveArticleToDatabase}
                        statusFilter={this.state.statusFilter}
                    />
                }
            </FeedWrapper>
        )
    }
}

export default ModeratorCurateComponent;
