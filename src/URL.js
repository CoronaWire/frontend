export const APPROVE_ARTICLE_URL = 'https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/approve';

export const REJECT_ARTICLE_URL = 'https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/reject';

export const MAKE_ARTICLE_PENDING_URL = 'https://moderatorapi-dot-coronawire-2020.uc.r.appspot.com/articles/review';

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


