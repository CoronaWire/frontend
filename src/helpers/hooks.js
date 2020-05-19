import { useRef, useEffect } from 'react';
import { trackTiming } from './ga';

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
