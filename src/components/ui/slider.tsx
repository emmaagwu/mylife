// src/components/ui/slider.tsx
import React from 'react';

interface SliderProps {
  value: number[]; // Accept an array of numbers
  onValueChange: (value: number[]) => void; // Change the type to accept an array
  max: number; // Add max prop for the slider
  step: number; // Add step prop for the slider
  className?: string; // Add className prop for styling
}

const Slider: React.FC<SliderProps> = ({ value, onValueChange, max, step, className }) => {
  return (
    <input
      type="range"
      value={value[0]} // Use the first value in the array for the slider
      min={0} // Set minimum value
      max={max} // Use the max prop
      step={step} // Use the step prop
      onChange={(e) => onValueChange([Number(e.target.value)])} // Pass an array to onValueChange
      className={className} // Apply the className prop
    />
  );
};

export { Slider };