
import React, { useState } from 'react';
import CalculatorButton from './components/CalculatorButton';
import { ButtonVariant } from './types';

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? NaN : a / b;
      default: return b;
    }
  };

  const handleNumberClick = (num: string) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForOperand) {
        setDisplayValue('0.');
        setWaitingForOperand(false);
        return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };
  
  const handleOperatorClick = (op: string) => {
    const currentValue = parseFloat(displayValue);
    
    if (previousValue !== null && operator && !waitingForOperand) {
        const result = calculate(previousValue, currentValue, operator);
        if(isNaN(result)) {
            setDisplayValue('Error');
        } else {
            setDisplayValue(String(result));
        }
        setPreviousValue(result);
    } else {
        setPreviousValue(currentValue);
    }
    
    setWaitingForOperand(true);
    setOperator(op);
  };

  const handleEqualsClick = () => {
    const currentValue = parseFloat(displayValue);
    if (operator && previousValue !== null) {
      const result = calculate(previousValue, currentValue, operator);
      if(isNaN(result)) {
            setDisplayValue('Error');
      } else {
          setDisplayValue(String(result));
      }
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setOperator(null);
    setPreviousValue(null);
    setWaitingForOperand(false);
  };

  const handleToggleSignClick = () => {
    setDisplayValue(String(parseFloat(displayValue) * -1));
  };
  
  const handlePercentageClick = () => {
    setDisplayValue(String(parseFloat(displayValue) / 100));
  };

  const formatDisplayValue = (value: string): string => {
    if (value === 'Error' || value === 'NaN') {
      return 'Error';
    }
    const [integer, decimal] = value.split('.');
    const formattedInteger = parseFloat(integer).toLocaleString('en-US', {
        maximumFractionDigits: 0,
    });
    let result = decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
    // Limit total length to prevent overflow, adjust as needed
    if (result.length > 15) {
        return parseFloat(value).toExponential(5);
    }
    return result;
  }

  return (
    <div className="min-h-screen bg-calc-dark-gray flex items-center justify-center font-sans">
      <div className="w-full max-w-xs sm:max-w-sm p-2">
        <div className="bg-black rounded-3xl p-4 shadow-2xl">
          <div className="text-white text-6xl font-light text-right mb-4 p-4 break-words">
            {formatDisplayValue(displayValue)}
          </div>
          <div className="grid grid-cols-4 gap-3">
            <CalculatorButton label={displayValue === '0' ? 'AC' : 'C'} variant={ButtonVariant.SPECIAL} onClick={handleClearClick} />
            <CalculatorButton label="±" variant={ButtonVariant.SPECIAL} onClick={handleToggleSignClick} />
            <CalculatorButton label="%" variant={ButtonVariant.SPECIAL} onClick={handlePercentageClick} />
            <CalculatorButton label="÷" variant={ButtonVariant.OPERATOR} onClick={() => handleOperatorClick('÷')} />

            <CalculatorButton label="7" variant={ButtonVariant.NUMBER} onClick={() => handleNumberClick('7')} />
            <CalculatorButton label="8" variant={ButtonVariant.NUMBER} onClick={() => handleNumberClick('8')} />
            <CalculatorButton label="9" variant={ButtonVariant.NUMBER} onClick={() => handleNumberClick('9')} />
            <CalculatorButton label="×" variant={ButtonVariant.OPERATOR} onClick={() => handleOperatorClick('×')} />

            <CalculatorButton label="4" variant={ButtonVariant.NUMBER} onClick={() => handleNumberClick('4')} />
            <CalculatorButton label="5" variant={ButtonVariant.NUMBER} onClick={() => handleNumberClick('5')} />
            <CalculatorButton label="6" variant={ButtonVariant.NUMBER} onClick={() => handleNumberClick('6')} />
            <CalculatorButton label="-" variant={ButtonVariant.OPERATOR} onClick={() => handleOperatorClick('-')} />

            <CalculatorButton label="1" variant={ButtonVariant.NUMBER} onClick={() => handleNumberClick('1')} />
            <CalculatorButton label="2" variant={ButtonVariant.NUMBER} onClick={() => handleNumberClick('2')} />
            <CalculatorButton label="3" variant={ButtonVariant.NUMBER} onClick={() => handleNumberClick('3')} />
            <CalculatorButton label="+" variant={ButtonVariant.OPERATOR} onClick={() => handleOperatorClick('+')} />

            <CalculatorButton label="0" variant={ButtonVariant.NUMBER} onClick={() => handleNumberClick('0')} className="col-span-2" />
            <CalculatorButton label="." variant={ButtonVariant.NUMBER} onClick={handleDecimalClick} />
            <CalculatorButton label="=" variant={ButtonVariant.OPERATOR} onClick={handleEqualsClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
