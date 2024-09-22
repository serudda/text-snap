import { useCallback, useEffect, useState } from 'react';
import { SINGLE_ALPHANUMERIC_CHAR_REGEX } from '~/common';

/**
 * The `useRecordHotkeys` function in TypeScript allows for
 * recording and storing a set of hotkeys pressed by the
 * user.
 *
 * @returns The `useRecordHotkeys` custom hook is returning
 *   an object with the following properties and methods:
 *
 *   - `keys`: a Set containing the currently recorded hotkeys.
 *   - `start`: a function to start recording hotkeys (clears
 *       the current keys sets`isRecording` to true)
 *   - `stop`: a function to stop recording hotkeys (sets
 *       `isRecording` to false)
 */

export const useRecordHotkeys = () => {
  const [keys, setKeys] = useState<Set<string>>(new Set());
  const [isRecording, setIsRecording] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();

      const { key, ctrlKey, altKey, shiftKey } = event;
      const newKeys = new Set(keys);

      if (ctrlKey) newKeys.add('Ctrl');
      if (altKey) newKeys.add('Alt');
      if (shiftKey) newKeys.add('Shift');

      if (SINGLE_ALPHANUMERIC_CHAR_REGEX.test(key)) {
        newKeys.add(key);
      }

      setKeys(newKeys);
    },
    [keys],
  );

  useEffect(() => {
    if (isRecording) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const start = () => {
    setKeys(new Set());
    setIsRecording(true);
  };

  const stop = () => setIsRecording(false);

  return {
    keys,
    start,
    stop,
    isRecording,
  };
};
