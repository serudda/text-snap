import { OperatingSystem } from '../constants';

/**
 * isNullOrUndefined.
 *
 * - validate if an element is null or undefined.
 *
 * @function
 * @param {any} value - Element to validate.
 * @returns {boolean} Element is null or undefined.
 */
export const isNullOrUndefined = (value: unknown): boolean => value === undefined || value === null;

/**
 * getOS.
 *
 * - Get the current operating system.
 *
 * @function
 * @returns {OperatingSystem} Current operating system.
 */
export const getOS = (userAgent = '') => {
  const userAgentLowerCase = userAgent.toLowerCase();
  if (userAgentLowerCase.includes('win')) {
    return OperatingSystem.windows;
  } else if (userAgentLowerCase.includes('mac')) {
    return OperatingSystem.mac;
  } else {
    return OperatingSystem.other;
  }
};
