import { useEffect, useState } from 'react';

export const GetUserOperatingSystem = () => {
  const [currentOS, setCurrentOS] = useState<'Mac' | 'Other' | 'Windows'>('Other');

  useEffect(() => {
    function getOS() {
      const userAgent = navigator.userAgent.toLowerCase();

      if (userAgent.includes('win')) {
        return 'Windows';
      } else if (userAgent.includes('mac')) {
        return 'Mac';
      } else {
        return 'Other';
      }
    }

    setCurrentOS(getOS());
  }, []);

  return currentOS;
};
