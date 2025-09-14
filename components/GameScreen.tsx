import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Board from './Board';
import Modal from './Modal';
import XIcon from './icons/XIcon';
import OIcon from './icons/OIcon';

const GameScreen: React.FC = () => {
    const gameContext = useContext(GameContext);

    if (!gameContext) return null;
    const { gameState, dispatch } = gameContext;
    const { board, currentPlayer, players, winner } = gameState;

    const mySymbol = sessionStorage.getItem('tic-tac-toe-player');
    const isMyTurn = currentPlayer === mySymbol;

    const handleSquareClick = (index: number) => {
        // Redundant check as board is disabled, but good for safety
        if (!isMyTurn) return;
        dispatch({ type: 'MAKE_MOVE', payload: { index } });
    };
    
    const handleReset = () => {
        dispatch({type: 'RESET_GAME'})
    }

    const handleGoHome = () => {
        dispatch({type: 'GO_HOME'})
    }

    const winnerInfo = players.find(p => p.symbol === winner);
    const turnMessage = winner ? 'انتهت اللعبة!' : isMyTurn ? 'دورك الآن' : `انتظر دور ${players.find(p => p.symbol === currentPlayer)?.name}`;

    const PlayerCard: React.FC<{ player: typeof players[0], isActive: boolean }> = ({ player, isActive }) => (
        <div className={`p-4 rounded-lg transition-all duration-300 ${isActive ? 'bg-cyan-500/20 ring-2 ring-cyan-500' : 'bg-slate-800/50'}`}>
            <div className="flex items-center gap-3">
                {player.symbol === 'X' ? <XIcon className="w-8 h-8"/> : <OIcon className="w-8 h-8"/>}
                <div>
                    <p className="font-bold text-lg">{player.name}</p>
                    <p className="text-sm text-slate-400">النقاط: {player.score}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center gap-6 w-full animate-fade-in">
             <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <PlayerCard player={players[0]} isActive={currentPlayer === 'X'} />
                <PlayerCard player={players[1]} isActive={currentPlayer === 'O'} />
            </div>
            
            <p className="text-lg font-semibold text-yellow-300 h-6">{turnMessage}</p>

            <Board squares={board} onSquareClick={handleSquareClick} disabled={!isMyTurn || !!winner} />

            <Modal isOpen={!!winner}>
                <h2 className="text-3xl font-bold mb-4">
                    {winner === 'draw' ? 'انتهت بالتعادل!' : `🎉 الفائز هو ${winnerInfo?.name}`}
                </h2>
                {winner === 'draw' 
                    ? <p className="text-slate-300 mb-6">مباراة رائعة! حصل كلا اللاعبين على نقطتين.</p>
                    : <p className="text-slate-300 mb-6">تهانينا! لقد حصلت على 10 نقاط.</p>
                }
                <div className="flex justify-center gap-4">
                     <button
                        onClick={handleReset}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
                    >
                        العب مرة أخرى
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
                    >
                        العودة للرئيسية
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default GameScreen;
