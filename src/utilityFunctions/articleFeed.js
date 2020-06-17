// Utility Functions that will be used within the Article Feed Components / Functionality


/*
 * Reformats the returned article array into a hash table to allow faster queries
 *
 * @param {array} articleArray: Array of article objects retrieved from the SQL database
 * @returns {object} An object with article IDs as keys and their respective value to be the article with 
 * the corresponding key
 * 
 * @example: If input [{id: 1, article_id: 'ZHaozurja19349', title: 'Covid eradicated', author: 'Ambrose Bierce'}]
 * Result --> { 1 : {id: 1, article_id: 'ZHaozurja19349', title: 'Covid eradicated', author: 'Ambrose Bierce'} }
 *
*/
export const transformIntoArticleObject = (articleArray) => {
    let articlesObject = {};
    let length = articleArray.length;
    for (let i=0; i<length; i++) {
        let individualArticleObject = articleArray[i];
        let { article_id } = individualArticleObject;
        articlesObject[article_id] = individualArticleObject;
    }
    return articlesObject;
}


/*
 * Creates an object with article_ids as keys set to false, in order to enable users to select articles 
 * and approve / reject them in bulk
 *
 * @param {array} articleArray: Array of article objects retrieved from the SQL database
 * @returns {object} An object with article IDs as keys all set to false
 * 
 * @example: If input [{id: 1, article_id: 'ZHaozurja19349', title: 'Covid eradicated', author: 'Ambrose Bierce'}]
 * Result --> { 1 : false }
 *
*/
export const createObjectOfArticleIDs = (articleArray) => {
    let articlesObject = {};
    let length = articleArray.length;
    for (let i=0; i<length; i++) {
        let individualArticleObject = articleArray[i];
        let { article_id } = individualArticleObject;
        articlesObject[article_id] = false;
    }
    return articlesObject;
}

/*
 *
 * Analyzes object of articles and returns an array of all article_ids currently selected by the moderator
 * 
 * Purpose: allows to send an array of article_ids with the /approve or /reject request to the server in order
 * to process articles as a batch
 * Location: Used in the .ModeratorCurateComponent
 * 
 * @params {object} selectedArticlesObject: An object that holds the all the currently displayed articles's 
 * ids, each set to either true or false, depending on whether they have been selected for "approval"/'rejection'
 * by the moderator
 * 
 * @returns {array} An array of all the articles currently selected (that have their ids set to true)
 * 
 * @example 
 * input --> selectedArticlesObject = { '1ABC': true, '2DCF': true, '3FER': false}
 * output --> ['1ABC', '2DCF'] --> because only '1ABC' and '2DCF' are set to true, meaning that they have been
 * selected by moderator
 *
 */

export const getSelectedArticles = (selectedArticlesObject) => {
    let articleIDs = Object.keys(selectedArticlesObject);
    let arrayOfSelectedArticles = []
    articleIDs.forEach((id) => {
        let isArticleSelected = selectedArticlesObject[id];
        if (isArticleSelected === true) {
            arrayOfSelectedArticles.push(id);
        } 
    })
    return arrayOfSelectedArticles;
}

/*
 *
 * Takes a string of the form 'YYYY-MM-DDTHH-MM-SS' (representing time) and removes the hours, min, secs
 * thus returning 'YYYY-MM-DD'
 * 
 * @params {string} dateString: String representing the date of the format above (found in .published_at column 
 * of each article)
 * 
 * @returns {string} Re-formatted date string of form 'YYYY-MM-DD'
 *
 */

export const removeHoursFromDate = (dateString) => {
    const dateArray = dateString.split('T');
    const actualDate = dateArray[0];
    return actualDate;
}

/*
*
* As the name suggests.
*
*/
export const countNumOfArticles = (articlesArray) => {
    return articlesArray.length;
}

/*
* Takes a string like this 'Wed May 06 2020 20:18:12 GMT-0400 (Eastern Daylight Time)'
* and makes it like this 'Wed May 06 2020 20:18:12'
*
* I know, pretty revolutionary stuff.
* Used in ../components/ModeratorArticleComponent to format the date returned by the Date()  object
*/

export const removeStandardTimeFromDate = (dateString) => {
    let dateStringLength = dateString.length;
    let counter = 0;
    let index = 0;
    for (let i=0; i < dateStringLength; i++) {
        let currentChar = dateString[i];
        if (currentChar === ':') {
            counter += 1;
        }
        if (counter === 2) {
            index = i+3;
            break;
        }
    }
    return dateString.slice(0,index);
}

/*
*
*  Removes the Day 'Monday' and the time from the string returned by the
* removeStandardTimeFromDate function above
* I.e.  Wed Jun 09 2060 20:00:00 --> Jun 09 2060
*
*/
export const removeDayAndTime = (dateString) => {
    let dateArray = dateString.split(' ');
    let finalDateString = '';

    finalDateString = finalDateString + dateArray[1] + ' ';
    finalDateString = finalDateString + dateArray[2] + ' ';
    finalDateString = finalDateString + dateArray[3];

    // console.log('Final date', finalDateString);
    return finalDateString;
}

/*
*   Removes an element from array. If input array [1,4, 39, 32] and element=39
*   Then output --> [1,4,32]
*
*   Used initially to remove the selected newsSource from the array of newsSources 
*   Present in ../components/ModeratorCurateComponent
*/
export const removeElementFromArray = (element, array) => {
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    };
    return array;
}


/**
 * 
 * Updates the individual article object in the feed object with the article's most up to date information
 * Eg. Let's assume we have a feed has articles { 2: {...}, 45: {...}} where article with key 2 is an article about 
 * 'Uber firing 3,000 people'
 * If the user updates information about this article and saves it, this ensures that it's saved in the local state
 * of the article so that it's consistent with what it's in the database, before the feed is retrieved again
 * 
 * @param {Object} articleFeed Object feed of all the articles that were retrieved
 * @param {Object} articleObject Object of the article that we are going to update in the above articleFeed object
 */

export const updateArticleObjectInFeed = (articleFeed, articleObject) => {
    const { article_id } = articleObject;
    const objectKeys = Object.keys(articleObject);
    console.log('Article object keys', objectKeys);
    let objectOfArticleInFeed = {...articleFeed[article_id]};
    for (let i=0; i < objectKeys.length; i++) {
        let currentKey = objectKeys[i];
        objectOfArticleInFeed[currentKey] = articleObject[currentKey];
    }
    console.log('Final Article Object', objectOfArticleInFeed);
    return objectOfArticleInFeed;
}

/**
 * 
 * Removes the elements in elementsToDelete from arrayList
 * Currently used in ./RegionStatusFilterComponent to remove the 'California' and 'Washington' state
 * from the list of states retrieved from the database
 * 
 * @param {Array} arrayList Array of elements
 * @param {Object} elementsToDelete Object of elements to be deleted from arrayList
 * 
 */

export const deleteElementFromArray  = (arrayList, elementsToDelete ) => {

    let finalArray = [];
    let length = arrayList.length;

    for (let i=0; i<length; i++) {

        let currentLocation = arrayList[i];
        
        // If the current location is not present in the object, then we can safely add it to the final array
        if (elementsToDelete[currentLocation] == undefined) {
            finalArray.push(currentLocation)
        }
    }
    
    return finalArray;

}