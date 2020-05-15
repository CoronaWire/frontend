import { retry } from './utilities';

export const trackEvent = ({
  category,
  action,
  label,
  value,
}) => {
  const trackFunc = () => {
    const tracker = typeof window.ga.getAll === 'function' && window.ga.getAll()[0];
    if (tracker) {
      tracker.send('event', category, action, label, value);
    }
  };
  retry(
    () => window && window.ga,
    trackFunc,
  );
};

export const trackTiming = ({
  category,
  variable,
  value,
  label,
}) => {
  const trackFunc = () => {
    const tracker = typeof window.ga.getAll === 'function' && window.ga.getAll()[0];
    if (tracker) {
      tracker.send('timing', category, variable, value, label);
    }
  };
  retry(
    () => window && window.ga,
    trackFunc,
  );
};
