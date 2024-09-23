import { useEffect, useState } from 'react';
import { getDefaultShortcuts, GetUserOperatingSystem, type ShortcutType } from '~/common';

/**
 * The `useHotkeySettings` function manages user-defined
 * keyboard shortcuts in a React component, storing them in
 * local storage and providing functions to update and reset
 * the shortcuts.
 *
 * @returns The `useHotkeySettings` custom hook is being
 *   returned, which provides access to the `shortcuts`
 *   state, `handleShortcutChange` function to update
 *   shortcuts, and `resetShortcuts` function to reset
 *   shortcuts to default values.
 */
export const useHotkeySettings = () => {
  const currentOs = GetUserOperatingSystem();
  const [shortcuts, setShortcuts] = useState<ShortcutType>(getDefaultShortcuts(currentOs));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const savedShortcuts = localStorage.getItem('shortcuts');

      if (savedShortcuts) setShortcuts(JSON.parse(savedShortcuts) as ShortcutType);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
  }, [shortcuts, isClient]);

  const handleShortcutChange = (key: keyof ShortcutType, newShortcut: string) => {
    setShortcuts((prevShortcuts) => ({
      ...prevShortcuts,
      [key]: newShortcut,
    }));
  };

  const resetShortcuts = () => {
    setShortcuts(getDefaultShortcuts(currentOs));
    localStorage.setItem('shortcuts', JSON.stringify(getDefaultShortcuts(currentOs)));
  };
  return {
    shortcuts,
    handleShortcutChange,
    resetShortcuts,
  };
};
