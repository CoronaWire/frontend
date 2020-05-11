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
      const { localType } = options;
      const { countyFipsCode, lat, lng } = location;
      switch (localType) {
        case 'coord':
          return `/articles/scope/local/${lat},${lng}/`;
        case 'fips':
          return `/articles/scope/fips/${countyFipsCode}/`
        default:
          return `/articles/nearby/`;
      }
    default:
      throw new Error('Please specify scope');
      return '';
  }
};

const getLocationQuery = ({ countyFipsCode: fips, lat, lng }) => ({ fips, lat, lng });

export const fetchArticles = async ({
  scope,
  location = {},
  query: { radius, ...query } = {},
  options = {},
}) => {
  const apiUrl = process.env.REACT_APP_NEWS_API_URL;

  const radiusQuery = scope === 'local' && options.localType === 'coord' ? { radius } : {};
  const locationQuery =
    scope === 'local' && options.localType === 'nearby' ? getLocationQuery(location) : {};

  const params = queryToParams({
    ...query,
    ...radiusQuery,
    ...locationQuery,
  });

  const paramsFragment = params ? `?${params}` : '';
  const pathFragment = resolvePath({ location, scope, options });
  try {
    return await axios.get(`${apiUrl}${pathFragment}${paramsFragment}`);
  } catch (err) {
    console.log(err);
    return null;
  }
};
