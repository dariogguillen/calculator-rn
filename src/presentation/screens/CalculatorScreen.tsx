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
    reset,
    deleteLast,
    toggleSign,
    calculate,
    add,
    sub,
    mul,
    div,
  } = useCalculator();
  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text adjustsFontSizeToFit style={globalStyles.mainResult}>
          {expresion}
        </Text>
        <Text style={globalStyles.subResult}>{result || ''}</Text>
      </View>
      {buttons(
        buildExpresion,
        reset,
        deleteLast,
        toggleSign,
        calculate,
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
  reset: () => void,
  deleteLast: () => void,
  toggleSign: () => void,
  calculate: () => void,
  add: () => void,
  sub: () => void,
  mul: () => void,
  div: () => void,
): RowButton[] => [
  [
    {onPress: reset, label: 'C', color: colors.lightGray},
    {
      onPress: toggleSign,
      label: '+/-',
      color: colors.lightGray,
      disabled: true, // TODO: fix toggle sign
    },
    {onPress: deleteLast, label: 'del', color: colors.lightGray},
    {onPress: div, label: '÷', color: colors.orange},
  ],
  [
    {onPress: () => buildExpresion('7'), label: '7'},
    {onPress: () => buildExpresion('8'), label: '8'},
    {onPress: () => buildExpresion('9'), label: '9'},
    {onPress: mul, label: 'x', color: colors.orange},
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
    {onPress: calculate, label: '=', color: colors.orange},
  ],
];

export default CalculatorScreen;
