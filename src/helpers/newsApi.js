import axios from 'axios';

const queryToParams = query =>
  Object.keys(query).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&');

export const fetchArticles = async ({
  scope,
  location = {},
  query = {},
}) => {
  const apiUrl = process.env.REACT_APP_NEWS_API_URL;
  const params = queryToParams({ ...query, status: 'pending' });
  const paramsFragment = params ? `?${params}` : '';
  try {
    switch (scope) {
      case 'global':
      case 'national':
        return await axios.get(`${apiUrl}/articles/scope/${scope}/${paramsFragment}`);
      case 'local':
        const { state } = location;
        return await axios.get(`${apiUrl}/articles/scope/regional/${state}/${paramsFragment}`);
      default:
        return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};
