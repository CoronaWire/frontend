
const LOCATION_KEY = 'covidwire.location';

export const saveLocationToLocalStorage = location => {
  if (localStorage) {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
  }
};

export const getLocationFromLocalStorage = () => {
  if (localStorage) {
    const item = localStorage.getItem(LOCATION_KEY);
    return item ? JSON.parse(item) : null;
  }
  return null;
};
