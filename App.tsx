
import React, { useContext } from 'react';
import { GameProvider, GameContext } from './context/GameContext';
import HomeScreen from './components/HomeScreen';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';

const AppContent: React.FC = () => {
    const gameContext = useContext(GameContext);
    
    if (!gameContext) {
        return <div>Loading...</div>;
    }

    const { gameState } = gameContext;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
            <header className="w-full max-w-md mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">لعبة إكس أو</h1>
            </header>
            <main className="w-full max-w-md">
                {gameState.screen === 'home' && <HomeScreen />}
                {gameState.screen === 'lobby' && <LobbyScreen />}
                {gameState.screen === 'game' && <GameScreen />}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <GameProvider>
            <AppContent />
        </GameProvider>
    );
};

export default App;
