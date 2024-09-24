import { useEffect } from 'react';

export const usePreventHotKey = () => {
  useEffect(() => {
    const ctrl1 = (e: KeyboardEvent) => (e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'g' || e.key === '©');

    const handler = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        console.log('Prevented hotkey');
      }
    };

    const ignore = (e: KeyboardEvent) => {
      console.log('ignore Fuera: ', ctrl1(e));
      console.log('(e.ctrlKey || e.metaKey)', e.ctrlKey || e.metaKey);
      console.log('e.altKey', e.altKey);
      console.log("e.key === 'g'", e.key === 'g');
      console.log('e.key', e.key);
      if (ctrl1(e)) {
        console.log('ignore Dentro');
        e.preventDefault();
      }
    };

    window.addEventListener('keyup', handler);
    window.addEventListener('keydown', ignore);

    return () => {
      window.removeEventListener('keyup', handler);
      window.removeEventListener('keydown', ignore);
    };
  }, []);
};
