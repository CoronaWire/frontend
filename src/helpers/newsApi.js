import axios from 'axios';

const queryToParams = query => Object.keys(query)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
  .join('&');

const getQueryParams = ({
  audience,
  query,
  location: { countyFipsCode },
}) => {
  switch (audience) {
    case 'global':
    case 'national':
      return { audience, ...query };
    default:
      return { fips: countyFipsCode, ...query };
  }
}

export const fetchArticles = async ({
  scope,
  location = {},
  query: { radius, ...query } = {},
  options = {},
}) => {
  const apiUrl = process.env.REACT_APP_NEWS_API_URL;

  const queryParams = getQueryParams({ audience: scope, location, query });

  const params = queryToParams(queryParams);
  const paramsFragment = params ? `?${params}` : '';
  try {
    return await axios.get(`${apiUrl}/scored${paramsFragment}`);
  } catch (err) {
    console.log(err);
    return null;
  }
};
