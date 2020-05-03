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