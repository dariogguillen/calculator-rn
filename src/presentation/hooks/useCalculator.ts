import {useEffect, useRef, useState} from 'react';

enum Operator {
  sum = '+',
  sub = '-',
  mul = '*',
  div = '/',
  unknown = '?',
}
type CalcRes = [number, string, Operator];

const applyOperation = (
  op: Operator,
  num1: number,
  num2: string,
  newOp?: Operator,
): CalcRes => {
  switch (op) {
    case Operator.sum:
      return [num1 + Number(num2), '', newOp || op];
    case Operator.sub:
      return [num1 - Number(num2), '', newOp || op];
    case Operator.mul:
      return [num1 * Number(num2), '', newOp || op];
    case Operator.div:
      return [num1 / Number(num2), '', newOp || op];

    case Operator.unknown:
    default:
      throw new Error(`Operation ${op} not supported`);
  }
};

const useCalculator = () => {
  const [expresion, setExpresion] = useState('0');

  const [result, setResult] = useState(0);

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if (
      !lastOperation.current ||
      Object.values(Operator).includes(expresion.slice(-1) as Operator)
    ) {
      setResult(0);
    } else {
      const [res] = expresion.split('').reduce(
        (prev: CalcRes, curr, index, arr): CalcRes => {
          if (Object.values(Operator).includes(curr as Operator)) {
            if (prev[2] === Operator.unknown) {
              return [Number(prev[1]), '', curr as Operator];
            }
            return applyOperation(prev[2], prev[0], prev[1], curr as Operator);
          } else {
            if (
              index === arr.length - 1 &&
              lastOperation.current !== Operator.unknown
            ) {
              return applyOperation(prev[2], prev[0], prev[1] + curr);
            }
            return [prev[0], prev[1] + curr, prev[2]];
          }
        },
        [0, '', Operator.unknown],
      );
      setResult(res || 0);
    }
  }, [expresion, result, lastOperation]);

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

  const reset = () => {
    setExpresion('0');
    setResult(0);
    lastOperation.current = Operator.unknown;
  };

  const calculate = () => {
    setExpresion(`${result}`);
    setResult(0);
    lastOperation.current = Operator.unknown;
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
    reset,
    deleteLast,
    toggleSign,
    calculate,
    add,
    sub,
    mul,
    div,
  };
};

export default useCalculator;
