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

/**
 * The function `definePrimaryHotkey` returns the primary
 * hotkey based on the current operating system.
 *
 * @param {OperatingSystem} currentOs - The `currentOs`
 *   parameter is a variable representing the operating
 *   system (OS) on which the function is being executed. It
 *   is of type `OperatingSystem`, which is likely an enum
 *   or a defined type that specifies different operating
 *   systems such as Windows, macOS, Linux, etc. The
 *   function `define.
 * @returns The function `definePrimaryHotkey` returns
 *   either 'CTRL' if the `currentOs` is
 *   `OperatingSystem.windows`, or '⌘' if the `currentOs` is
 *   not `OperatingSystem.windows`.
 */
export const definePrimaryHotkey = (currentOs: OperatingSystem) => {
  return currentOs === OperatingSystem.windows ? 'CTRL' : '⌘';
};
