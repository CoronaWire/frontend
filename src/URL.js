export const APPROVE_ARTICLE_URL = 'https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/approve';

export const REJECT_ARTICLE_URL = 'https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/reject';

export const ARTICLE_URL = 'https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles';

export const MAKE_ARTICLE_PENDING_URL = 'https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/review';

export const MAKE_ARTICLE_FEATURED = 'https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/feature';

export const retrieveArticlesURL = (status, region, offset) => {
    return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/status/${status}/region/${region}/offset/${offset}`;
};

export const retrieveLocalArticlesURL = (region, status, maxID) => {
    if (maxID === undefined) {
        return `https://coronawire-2020.uc.r.appspot.com/articles/scope/regional/${region}?status=${status}`;
    } else {
        return `https://coronawire-2020.uc.r.appspot.com/articles/scope/regional/${region}?status=${status}&max=${maxID}`;
    }
};

export const retrieveGlobalArticleURL = (status, offset) => {
    return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/scope/global?status=${status}&offset=${offset}`
}

export const retrieveNationalArticleURL = (status, offset) => {
    return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/scope/national?status=${status}&offset=${offset}`
}

export const retrieveArticleURL = (scope, status, paramObject) => {
    const { state, offset, sourceArray } = paramObject; 

    let sourceString = '';
    if (sourceArray.length > 0) {
        sourceString = sourceArray.join(',');
    }

    // Status will always be provided
    if (scope === 'global') {
        if (sourceArray.length > 0) {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/scope/global?status=${status}&offset=${offset}&sources=${sourceString}`;
        } else {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/scope/global?status=${status}&offset=${offset}`;
        } 
    } else if (scope === 'national') {
        if (sourceArray.length > 0) {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/scope/national?status=${status}&offset=${offset}&sources=${sourceString}`;
        } else {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/scope/national?status=${status}&offset=${offset}`;
        } 
    } else if (scope === 'all') {
        if (sourceArray.length > 0) {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/scope/all?status=${status}&offset=${offset}&sources=${sourceString}`;
        } else {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/scope/all?status=${status}&offset=${offset}`;
        } 
    } else if (scope === 'state') {
        if (sourceArray.length > 0) {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/scope/state?state=${state}&status=${status}&offset=${offset}&sources=${sourceString}`;
        } else {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/scope/state?state=${state}&status=${status}&offset=${offset}`;
        } 
    }
}

export const retrieveCountURL = (scope, status, paramObject) => {
    const { state, offset, sourceArray } = paramObject; 

    let sourceString = '';
    if (sourceArray.length > 0) {
        sourceString = sourceArray.join(',');
    }

    // Status will always be provided
    if (scope === 'global') {
        if (sourceArray.length > 0) {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/count/scope/global?status=${status}&offset=${offset}&sources=${sourceString}`;
        } else {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/count/scope/global?status=${status}&offset=${offset}`;
        } 
    } else if (scope === 'national') {
        if (sourceArray.length > 0) {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/count/scope/national?status=${status}&offset=${offset}&sources=${sourceString}`;
        } else {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/count/scope/national?status=${status}&offset=${offset}`;
        } 
    } else if (scope === 'all') {
        if (sourceArray.length > 0) {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/count/scope/all?status=${status}&offset=${offset}&sources=${sourceString}`;
        } else {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/count/scope/all?status=${status}&offset=${offset}`;
        } 
    } else if (scope === 'state') {
        if (sourceArray.length > 0) {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/count/scope/state?state=${state}&status=${status}&offset=${offset}&sources=${sourceString}`;
        } else {
            return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/count/scope/state?state=${state}&status=${status}&offset=${offset}`;
        } 
    }
}

export const retrieveStateSources = (state) => {
    return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/sources/scope/state?state=${state}`;
}

export const retrieveAllSources = () => {
    return `https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/sources`
}