import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import useLocalStorage from '../hooks/useLocalStorage';

const HomeScreen: React.FC = () => {
    const gameContext = useContext(GameContext);
    const [playerName, setPlayerName] = useLocalStorage('playerName', 'اللاعب 1');
    const [joinRoomId, setJoinRoomId] = useState('');
    
    if (!gameContext) return null;
    const { dispatch, gameState } = gameContext;

    useEffect(() => {
        // Clear any previous errors when component mounts or player name changes
        dispatch({ type: 'SET_ERROR', payload: null });
    }, [dispatch]);


    const handleCreateRoom = () => {
        if (!playerName.trim()) {
            dispatch({ type: 'SET_ERROR', payload: 'الرجاء إدخال اسمك أولاً.' });
            return;
        }
        dispatch({ type: 'SET_ERROR', payload: null });
        const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        dispatch({ type: 'CREATE_ROOM', payload: { roomId: newRoomId, playerName: playerName } });
    };

    const handleJoinRoom = () => {
        if (!playerName.trim()) {
            dispatch({ type: 'SET_ERROR', payload: 'الرجاء إدخال اسمك أولاً.' });
            return;
        }
        if (!joinRoomId.trim()) {
            dispatch({ type: 'SET_ERROR', payload: 'الرجاء إدخال معرّف الغرفة.' });
            return;
        }
        dispatch({ type: 'SET_ERROR', payload: null });
        dispatch({ type: 'JOIN_ROOM', payload: { roomId: joinRoomId.trim().toUpperCase(), playerName } });
    };
    
    return (
        <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg w-full max-w-sm text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">مرحبًا بك!</h2>
            {gameState.error && <p className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4">{gameState.error}</p>}
            <div className="mb-4">
                <label htmlFor="playerName" className="block text-sm font-medium text-slate-300 mb-2">
                    اسمك
                </label>
                <input
                    type="text"
                    id="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full bg-slate-700 text-white p-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    placeholder="أدخل اسمك"
                />
            </div>
            <button
                onClick={handleCreateRoom}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md mb-3 transition-colors"
            >
                إنشاء غرفة جديدة
            </button>
            <div className="flex items-center gap-2 mb-3">
                <input
                    type="text"
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                    className="flex-grow bg-slate-700 text-white p-2.5 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    placeholder="أدخل معرّف الغرفة"
                />
                <button
                    onClick={handleJoinRoom}
                    className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
                >
                    انضم
                </button>
            </div>
        </div>
    );
};

export default HomeScreen;
