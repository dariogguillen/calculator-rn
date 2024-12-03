import React from 'react';
import {Text, View} from 'react-native';
import globalStyles, {colors} from '../theme';
import CalculatorButton, {ButtonProps} from '../components/CalculatorButton';
import useCalculator from '../hooks';

const CalculatorScreen = () => {
  const {
    expresion,
    result,
    buildExpresion,
    softReset,
    deleteLast,
    toggleSign,
    add,
    sub,
    mul,
    div,
  } = useCalculator();
  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text adjustsFontSizeToFit style={globalStyles.subResult}>
          {expresion}
        </Text>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={globalStyles.mainResult}>
          {result}
        </Text>
      </View>
      {buttons(
        buildExpresion,
        softReset,
        deleteLast,
        toggleSign,
        add,
        sub,
        mul,
        div,
      ).map(row => (
        <View key={row[0].label} style={globalStyles.row}>
          {row.map(button => (
            <CalculatorButton key={button.label} {...button} />
          ))}
        </View>
      ))}
    </View>
  );
};
type RowButton = ButtonProps[];
const buttons = (
  buildExpresion: (s: string) => void,
  softReset: () => void,
  deleteLast: () => void,
  toggleSign: () => void,
  add: () => void,
  sub: () => void,
  mul: () => void,
  div: () => void,
): RowButton[] => [
  [
    {onPress: softReset, label: 'C', color: colors.lightGray},
    {onPress: toggleSign, label: '+/-', color: colors.lightGray},
    {onPress: deleteLast, label: 'del', color: colors.lightGray},
    {onPress: div, label: '/', color: colors.orange},
  ],
  [
    {onPress: () => buildExpresion('7'), label: '7'},
    {onPress: () => buildExpresion('8'), label: '8'},
    {onPress: () => buildExpresion('9'), label: '9'},
    {onPress: mul, label: 'X', color: colors.orange},
  ],
  [
    {onPress: () => buildExpresion('4'), label: '4'},
    {onPress: () => buildExpresion('5'), label: '5'},
    {onPress: () => buildExpresion('6'), label: '6'},
    {onPress: sub, label: '-', color: colors.orange},
  ],
  [
    {onPress: () => buildExpresion('1'), label: '1'},
    {onPress: () => buildExpresion('2'), label: '2'},
    {onPress: () => buildExpresion('3'), label: '3'},
    {onPress: add, label: '+', color: colors.orange},
  ],
  [
    {onPress: () => buildExpresion('0'), label: '0', doubleSize: true},
    {onPress: () => buildExpresion('.'), label: '.'},
    {onPress: () => console.log('='), label: '=', color: colors.orange},
  ],
];

export default CalculatorScreen;
