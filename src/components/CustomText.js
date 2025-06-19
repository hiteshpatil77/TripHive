import React from 'react';
import {Text} from 'react-native';
import Fonts from '../theme/Fonts';
import Colors from '../theme/Color';

const CustomText = ({children, style, ...props}) => {
  return (
    <Text
      style={[
        {
          fontFamily: Fonts.MontserratRegular,
          color: Colors.textB, // Default font
        },
        style, // Additional styles passed as props
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
