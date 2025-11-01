
import React from 'react';
import { ButtonVariant } from '../types';

interface CalculatorButtonProps {
  label: string;
  variant: ButtonVariant;
  onClick: () => void;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, variant, onClick, className = '' }) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case ButtonVariant.NUMBER:
        return 'bg-calc-med-gray hover:bg-gray-600 text-white';
      case ButtonVariant.OPERATOR:
        return 'bg-calc-orange hover:bg-amber-600 text-white';
      case ButtonVariant.SPECIAL:
        return 'bg-calc-light-gray hover:bg-gray-400 text-black';
      default:
        return '';
    }
  };

  const baseClasses = 'h-20 sm:h-24 w-full rounded-full text-3xl sm:text-4xl font-medium flex items-center justify-center focus:outline-none transition-colors duration-150';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;
