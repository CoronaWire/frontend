import { retry } from './utilities';

export const trackEvent = ({
  category,
  action,
  label,
  value,
}) => {
  const trackFunc = () => {
    const tracker = window.ga.getAll()[0];
    if (tracker) {
      tracker.send('event', category, action, label, value);
    }
  };
  retry(
    () => window && window.ga,
    trackFunc,
  );
};
