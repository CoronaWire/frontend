import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFipsInfo } from './fips';
import { saveLocationToLocalStorage } from './localStorage';
import { setLocationAction } from './../actionCreators/actions';

export const useUpdateEffect = (cb, props) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      cb();
    } else {
      didMountRef.current = true;
    }
  }, props);
};

export const useCurrentLocation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSetLocation = async (position) => {
    const { coords: { latitude: lat, longitude: lng } } = position;
    const fipsData = await fetchFipsInfo(lat, lng);
    const userLocation = {
      lat,
      lng,
      name: 'Current location',
      ...fipsData,
    };

    saveLocationToLocalStorage(userLocation);
    dispatch(
      setLocationAction(userLocation),
    );
    setLoading(false);
  };

  return [
    () => {
      setLoading(true);
      window.navigator.geolocation.getCurrentPosition(
        handleSetLocation,
        err => {
          setLoading(false);
          console.log(err);
        },
      );
    },
    loading,
  ];
};
