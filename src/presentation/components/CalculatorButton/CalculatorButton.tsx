import React from 'react';
import {Pressable, Text} from 'react-native';
import globalStyles, {colors} from '../../theme';

export interface Props {
  label: string;
  color?: string;
  doubleSize?: boolean;
  onPress: () => void;
}

const CalculatorButton = ({
  label,
  color = colors.darkGray,
  doubleSize = false,
  onPress = () => {},
}: Props) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={({pressed}) => ({
        ...globalStyles.button,
        backgroundColor: color,
        width: doubleSize ? 170 : 80,
        opacity: pressed ? 0.5 : 1,
      })}>
      <Text
        style={{
          ...globalStyles.buttonText,
          color: color === colors.lightGray ? 'black' : 'white',
        }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default CalculatorButton;