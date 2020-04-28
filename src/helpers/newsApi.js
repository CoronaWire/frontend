import axios from 'axios';

export const fetchArticles = async (scope, location = {}) => {
  const apiUrl = process.env.REACT_APP_NEWS_API_URL;
  try {
    switch (scope) {
      case 'global':
      case 'national':
        return await axios.get(`${apiUrl}/articles/scope/${scope}/`);
      case 'local':
        const { lat, long } = location;
        return await axios.get(`${apiUrl}/articles/scope/local/${lat},${long}/`);
      default:
        return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};
