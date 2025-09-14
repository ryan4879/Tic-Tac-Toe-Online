import React from 'react';
import type { SquareValue } from '../types';
import XIcon from './icons/XIcon';
import OIcon from './icons/OIcon';

interface SquareProps {
    value: SquareValue;
    onClick: () => void;
    isWinning: boolean;
    disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning, disabled }) => {
    const baseClasses = "flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-lg transition-all duration-200 ease-in-out";
    const bgClasses = isWinning 
        ? "bg-emerald-500/30" 
        : "bg-slate-800";
    
    const hoverClasses = !disabled && !value ? 'hover:bg-slate-700' : '';
    const cursorClasses = disabled ? 'cursor-not-allowed' : 'cursor-pointer';

    return (
        <button 
            className={`${baseClasses} ${bgClasses} ${hoverClasses} ${cursorClasses}`} 
            onClick={onClick}
            disabled={disabled}
            aria-label={`Square ${value || 'empty'}`}
        >
            {value === 'X' && <XIcon className="w-16 h-16 md:w-20 md:h-20" />}
            {value === 'O' && <OIcon className="w-16 h-16 md:w-20 md:h-20" />}
        </button>
    );
};

export default Square;
