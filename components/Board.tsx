import React from 'react';
import type { SquareValue } from '../types';
import Square from './Square';

interface BoardProps {
    squares: SquareValue[];
    onSquareClick: (index: number) => void;
    disabled: boolean;
}

const calculateWinningLine = (squares: SquareValue[]): number[] | null => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return line;
        }
    }
    return null;
};

const Board: React.FC<BoardProps> = ({ squares, onSquareClick, disabled }) => {
    const winningLine = calculateWinningLine(squares);

    return (
        <div className="grid grid-cols-3 gap-3 p-3 bg-slate-900/50 rounded-xl">
            {squares.map((value, index) => (
                <Square
                    key={index}
                    value={value}
                    onClick={() => onSquareClick(index)}
                    isWinning={winningLine?.includes(index) ?? false}
                    disabled={disabled || value !== null}
                />
            ))}
        </div>
    );
};

export default Board;
