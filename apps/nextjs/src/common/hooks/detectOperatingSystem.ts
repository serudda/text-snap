import { useEffect, useState } from 'react';
import { OperatingSystem } from '../constants';

export const GetUserOperatingSystem = () => {
  const [currentOS, setCurrentOS] = useState<OperatingSystem>(OperatingSystem.other);

  useEffect(() => {
    const getOS = () => {
      const userAgent = navigator.userAgent.toLowerCase();

      if (userAgent.includes('win')) {
        return OperatingSystem.windows;
      } else if (userAgent.includes('mac')) {
        return OperatingSystem.mac;
      } else {
        return OperatingSystem.other;
      }
    };

    setCurrentOS(getOS());
  }, []);

  return currentOS;
};
