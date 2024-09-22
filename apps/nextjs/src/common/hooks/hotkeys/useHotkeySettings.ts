import { useEffect, useState } from 'react';
import { DEFAULT_SHORTCUTS, type ShortcutType } from '~/common/constants';

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
  const [shortcuts, setShortcuts] = useState<ShortcutType>(DEFAULT_SHORTCUTS);
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
    setShortcuts(DEFAULT_SHORTCUTS);
    localStorage.setItem('shortcuts', JSON.stringify(DEFAULT_SHORTCUTS));
  };
  return {
    shortcuts,
    handleShortcutChange,
    resetShortcuts,
  };
};
