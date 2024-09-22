import { useEffect, useState } from 'react';
import { DEFAULT_SHORTCUTS, type ShortcutType } from '~/common/constants';

/**
 * The useHotkeySettings function manages and persists
 * user-defined keyboard shortcuts in a React application.
 *
 * @returns The `useHotkeySettings` custom hook is being
 *   returned. It returns an object with two properties:
 *
 *   1. `shortcuts`: The current state of shortcuts, initialized
 *        with `DEFAULT_SHORTCUTS` or retrieved from
 *        localStorage.
 *   2. `handleShortcutChange`: A function that updates the
 *        shortcuts state when a shortcut key is changed.
 */
export const useHotkeySettings = () => {
  const [shortcuts, setShortcuts] = useState<ShortcutType>(DEFAULT_SHORTCUTS);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const savedShortcuts = localStorage.getItem('shortcuts');

      if (savedShortcuts) {
        setShortcuts(JSON.parse(savedShortcuts) as ShortcutType);
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    }
  }, [shortcuts, isClient]);

  const handleShortcutChange = (key: keyof ShortcutType, newShortcut: string) => {
    setShortcuts((prevShortcuts) => ({
      ...prevShortcuts,
      [key]: newShortcut,
    }));
  };
  return {
    shortcuts,
    handleShortcutChange,
  };
};
