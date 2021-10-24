import { Slider } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { convertToAge, useDebounce } from '../helpers';

const minAgeInterval = 1;

type AgeSliderProps = {
  onChange: (v: number[]) => void;
  min: number;
  max: number;
};

export const AgeSlider: FC<AgeSliderProps> = ({ onChange, min, max }) => {
  const [value, setValue] = useState([min, max]);
  const debouncedValue = useDebounce<number[]>(value, 200);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minAgeInterval) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minAgeInterval);
        setValue([clamped, clamped + minAgeInterval]);
      } else {
        const clamped = Math.max(newValue[1], minAgeInterval);
        setValue([clamped - minAgeInterval, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  useEffect(() => {
    onChange(debouncedValue);
  });

  return (
    <Slider
      valueLabelDisplay='auto'
      valueLabelFormat={convertToAge}
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
    />
  );
};
