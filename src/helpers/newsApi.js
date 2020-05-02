import axios from 'axios';

const queryToParams = query => Object.keys(query)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
  .join('&');

const resolvePath = ({ scope, location, options }) => {
  switch (scope) {
    case 'global':
    case 'national':
      return `/articles/scope/${scope}/`;
    case 'local':
      const { countyFipsCode, state, lat, lng } = location;
      const { localType } = options;
      if (localType === 'fips') {
        return `/articles/scope/fips/${countyFipsCode}/`;
      } else if (localType === 'coord') {
        return `/articles/scope/local/${lat},${lng}/`;
      }
      return `/articles/scope/regional/${state}/`;
    default:
      throw new Error('Please specify scope');
      return '';
  }
};

export const fetchArticles = async ({
  scope,
  location = {},
  query = {},
  options = {},
}) => {
  const apiUrl = process.env.REACT_APP_NEWS_API_URL;
  const params = queryToParams({ ...query, status: 'pending' });
  const paramsFragment = params ? `?${params}` : '';
  const pathFragment = resolvePath({ location, scope, options });
  try {
    return await axios.get(`${apiUrl}${pathFragment}${paramsFragment}`);
  } catch (err) {
    console.log(err);
    return null;
  }
};
