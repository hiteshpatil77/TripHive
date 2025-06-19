import React from 'react';
import { SvgXml } from 'react-native-svg';

// Example SVG - Checkbox
const checkboxSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
</svg>
`;

// Example SVG - Plus
const plusSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
</svg>
`;

// SVG Components
export const CheckboxIcon = ({ width = 24, height = 24, color = '#000' }) => (
  <SvgXml xml={checkboxSvg} width={width} height={height} color={color} />
);

export const PlusIcon = ({ width = 24, height = 24, color = '#000' }) => (
  <SvgXml xml={plusSvg} width={width} height={height} color={color} />
);

// You can add more SVGs here
const SVGs = {
  checkbox: checkboxSvg,
  plus: plusSvg,
  // Add more SVGs here
};

export default SVGs; 