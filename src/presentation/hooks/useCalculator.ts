import {useState} from 'react';

const useCalculator = () => {
  const [expresion, setExpresion] = useState('0');

  const buildExpresion = (str: string) => {
    if (expresion.includes('.') && str === '.') {
      return;
    }
    if (expresion.startsWith('0') || expresion.startsWith('-0')) {
      // add one decimal point
      if (str === '.') {
        return setExpresion(expresion + str);
      }
      // Evaluete zero without decimal point
      if (expresion.length === 1) {
        return setExpresion(str);
      }
      // Remove zero if the first is not a decimal point
      if (expresion[1] !== '.') {
        return setExpresion(expresion.slice(1));
      }
    }
    setExpresion(expresion + str);
  };

  const softReset = () => {
    setExpresion('0');
  };

  const deleteLast = () => {
    if (expresion.length === 1) {
      return setExpresion('0');
    }
    setExpresion(expresion.slice(0, -1));
  };

  return {
    // props
    expresion,
    // methods
    buildExpresion,
    softReset,
    deleteLast,
  };
};

export default useCalculator;
