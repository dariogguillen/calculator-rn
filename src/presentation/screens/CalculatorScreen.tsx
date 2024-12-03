import React from 'react';
import {Text, View} from 'react-native';
import globalStyles, {colors} from '../theme';
import CalculatorButton, {ButtonProps} from '../components/CalculatorButton';

const CalculatorScreen = () => {
  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text style={globalStyles.mainResult}>1500</Text>
        <Text style={globalStyles.subResult}>15</Text>
      </View>
      {buttons.map(row => (
        <View style={globalStyles.row}>
          {row.map(button => (
            <CalculatorButton {...button} />
          ))}
        </View>
      ))}
    </View>
  );
};
type RowButton = ButtonProps[];
const buttons: RowButton[] = [
  [
    {onPress: () => console.log('C'), label: 'C', color: colors.lightGray},
    {onPress: () => console.log('+/-'), label: '+/-', color: colors.lightGray},
    {onPress: () => console.log('del'), label: 'del', color: colors.lightGray},
    {onPress: () => console.log('/'), label: '/', color: colors.orange},
  ],
  [
    {onPress: () => console.log('7'), label: '7'},
    {onPress: () => console.log('8'), label: '8'},
    {onPress: () => console.log('9'), label: '9'},
    {onPress: () => console.log('X'), label: 'X', color: colors.orange},
  ],
  [
    {onPress: () => console.log('4'), label: '4'},
    {onPress: () => console.log('5'), label: '5'},
    {onPress: () => console.log('6'), label: '6'},
    {onPress: () => console.log('-'), label: '-', color: colors.orange},
  ],
  [
    {onPress: () => console.log('1'), label: '1'},
    {onPress: () => console.log('2'), label: '2'},
    {onPress: () => console.log('3'), label: '3'},
    {onPress: () => console.log('+'), label: '+', color: colors.orange},
  ],
  [
    {onPress: () => console.log('0'), label: '0', doubleSize: true},
    {onPress: () => console.log('.'), label: '.'},
    {onPress: () => console.log('='), label: '=', color: colors.orange},
  ],
];

export default CalculatorScreen;
