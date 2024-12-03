import {useRef, useState} from 'react';

enum Operator {
  sum = '+',
  sub = '-',
  mul = '*',
  div = '/',
}

const useCalculator = () => {
  const [expresion, setExpresion] = useState('0');

  const [result, setResult] = useState('');

  const lastOperation = useRef<Operator>();

  const buildExpresion = (str: string | Operator) => {
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
      if (expresion === '-0') {
        if (str === '0') {
          return;
        }
        return setExpresion('-' + str);
      }
      // Remove zero if the first is not a decimal point
      if (expresion[1] !== '.' && expresion[0] !== '-') {
        return setExpresion(expresion.slice(1));
      }
    }
    setExpresion(expresion + str);
  };

  const softReset = () => {
    setExpresion('0');
    setResult('');
  };

  const deleteLast = () => {
    if (
      expresion.length === 1 ||
      (expresion.length === 2 && expresion.includes('-'))
    ) {
      return setExpresion('0');
    }
    setExpresion(expresion.slice(0, -1));
  };

  const toggleSign = () => {
    if (expresion.includes('-')) {
      return setExpresion(expresion.replace('-', ''));
    }
    setExpresion('-' + expresion);
  };

  //last character not an operator
  const validateLastOperator = (): boolean => {
    const lastStr = expresion.slice(-1);
    return !Object.values(Operator).includes(lastStr as Operator);
  };

  const add = () => {
    lastOperation.current = Operator.sum;
    if (validateLastOperator()) {
      buildExpresion(Operator.sum);
    }
  };

  const sub = () => {
    lastOperation.current = Operator.sub;
    if (validateLastOperator()) {
      buildExpresion(Operator.sub);
    }
  };

  const mul = () => {
    lastOperation.current = Operator.mul;
    if (validateLastOperator()) {
      buildExpresion(Operator.mul);
    }
  };

  const div = () => {
    lastOperation.current = Operator.div;
    if (validateLastOperator()) {
      buildExpresion(Operator.div);
    }
  };

  return {
    // props
    expresion,
    result,
    // methods
    buildExpresion,
    softReset,
    deleteLast,
    toggleSign,
    add,
    sub,
    mul,
    div,
  };
};

export default useCalculator;
