import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { trackTiming } from './ga';
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

export const usePrevious = (value) => {
	const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useTimingEffect = (scope) => {
  const prevScope = usePrevious(scope);
  const timestamp = useRef(null);

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (prevScope !== scope) {
      trackTiming({
        category: 'homepage',
        variable: `${prevScope}Feed`,
        value: currentTime - timestamp.current,
      });
    }
    timestamp.current = currentTime;
  }, [scope]);

  useEffect(() => {
    return () => {
      const currentTime = new Date().getTime();
      trackTiming({
        category: 'homepage',
        variable: `${scope}Feed`,
        value: currentTime - timestamp.current,
      });
    };
  }, []);
};

export const useCurrentLocation = (onSuccess = () => null) => {
  const dispatch = useDispatch();

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
    onSuccess();
  };

  return () => {
    window.navigator.geolocation.getCurrentPosition(
      handleSetLocation,
      err => {
        console.log(err);
      },
    );
  };
};

export const useOutsideClickEffect = ({ ref, onClick, shouldAttach }) => {
  const handleOutsideClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClick();
    }
  }
  useEffect(() => {
    if (shouldAttach) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [shouldAttach]);
}
