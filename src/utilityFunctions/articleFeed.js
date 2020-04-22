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

export const removeHoursFromDate = (dateString) => {
    const dateArray = dateString.split('T');
    const actualDate = dateArray[0];
    return actualDate;
}