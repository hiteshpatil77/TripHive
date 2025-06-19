import React from 'react';
import { SvgXml } from 'react-native-svg';

// Checkbox SVG
export const checkboxSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" stroke-width="2"/>
  <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

// Radio Button SVG
export const radioSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
  <circle cx="12" cy="12" r="6" fill="currentColor"/>
</svg>
`;

// Input Field SVG
export const inputFieldSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
</svg>
`;

// Components
export const Checkbox = ({ width = 24, height = 24, color = '#000' }) => (
  <SvgXml xml={checkboxSvg} width={width} height={height} color={color} />
);

export const Radio = ({ width = 24, height = 24, color = '#000' }) => (
  <SvgXml xml={radioSvg} width={width} height={height} color={color} />
);

export const InputField = ({ width = 24, height = 24, color = '#000' }) => (
  <SvgXml xml={inputFieldSvg} width={width} height={height} color={color} />
);

export default {
  checkbox: checkboxSvg,
  radio: radioSvg,
  inputField: inputFieldSvg,
}; 