import axios from 'axios';

export const fetchFipsInfo = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      `https://geo.fcc.gov/api/census/block/find?latitude=${lat}&longitude=${lng}&format=json`,
    );
    const state = data && data.State && data.State.name;
    const countyFipsCode = data && data.County && data.County.FIPS;
    return { state, countyFipsCode };
  } catch (err) {
    console.log(err);
    return {};
  }
};
