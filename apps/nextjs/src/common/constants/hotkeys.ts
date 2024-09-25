import { getOS } from '../utils';
import { OperatingSystem } from './general';

const currentOs = getOS(navigator.userAgent);

export const primaryHotkey = currentOs === OperatingSystem.windows ? 'CTRL' : '⌘';
