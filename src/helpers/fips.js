import axios from 'axios';

export const fetchFipsInfo = async (lat, lng) => {
  const data await axios.get(
    `https://geo.fcc.gov/api/census/block/find?latitude=${lat}&longitude=${lng}&format=json`,
  );
  console.log(data);
  return data;
};
