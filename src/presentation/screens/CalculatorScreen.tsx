import React from 'react';
import {Text, View} from 'react-native';
import globalStyles from '../theme';

const CalculatorScreen = () => {
  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text style={globalStyles.mainResult}>1500</Text>
        <Text style={globalStyles.subResult}>15</Text>
      </View>
    </View>
  );
};

export default CalculatorScreen;
