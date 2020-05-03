import { useRef, useEffect } from 'react';

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
