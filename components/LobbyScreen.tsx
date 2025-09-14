import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';

const LobbyScreen: React.FC = () => {
    const gameContext = useContext(GameContext);
    const [copied, setCopied] = useState(false);

    if (!gameContext) return null;
    const { gameState } = gameContext;

    const handleCopy = () => {
        if (gameState.roomId) {
            navigator.clipboard.writeText(gameState.roomId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg w-full max-w-sm text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-2 text-cyan-400">غرفة الانتظار</h2>
            <p className="text-slate-300 mb-4">شارك هذا المعرّف مع صديقك للانضمام.</p>
            <div className="bg-slate-900 rounded-md p-4 mb-4 flex items-center justify-between">
                <span className="text-2xl font-mono tracking-widest text-yellow-400">{gameState.roomId}</span>
                <button
                    onClick={handleCopy}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    {copied ? 'تم النسخ!' : 'نسخ'}
                </button>
            </div>
            <p className="text-slate-400 animate-pulse mb-6">في انتظار لاعب آخر...</p>
        </div>
    );
};

export default LobbyScreen;
