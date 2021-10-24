import { useEffect, useState } from 'react';

export function getIntersection(array1: any[], array2: any[]) {
  return array1.filter((value) => array2.includes(value));
}

export function useDebounce<T>(value: T, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export function convertAge(age: string) {
  if (age.includes('BBY')) {
    return -age.replace('BBY', '');
  } else {
    return +age.replace('ABY', '');
  }
}

export function convertToAge(number: number) {
  if (number < 0) {
    return Math.abs(+number) + ' BBY';
  } else {
    return number + ' ABY';
  }
}
