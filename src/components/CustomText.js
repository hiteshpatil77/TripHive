import React from 'react';
import {Text} from 'react-native';
import Fonts from '../theme/Fonts';

const CustomText = ({children, style, ...props}) => {
  return (
    <Text
      style={[
        {
          fontFamily: Fonts.MontserratRegular, // Default font
        },
        style, // Additional styles passed as props
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
