import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import type { GameState, Action, Player, SquareValue, PlayerSymbol } from '../types';

const initialState: GameState = {
    screen: 'home',
    players: [
        { name: 'اللاعب 1', symbol: 'X', score: 0 },
        { name: 'اللاعب 2', symbol: 'O', score: 0 }
    ],
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    roomId: null,
    error: null
};

const calculateWinner = (squares: SquareValue[]): PlayerSymbol | 'draw' | null => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a] as PlayerSymbol;
        }
    }
    if (squares.every(square => square !== null)) {
        return 'draw';
    }
    return null;
};

const saveStateToLocalStorage = (state: GameState) => {
    if (state.roomId) {
        localStorage.setItem(`tic-tac-toe-room-${state.roomId}`, JSON.stringify(state));
    }
};

const removeStateFromLocalStorage = (roomId: string | null) => {
    if (roomId) {
        localStorage.removeItem(`tic-tac-toe-room-${roomId}`);
    }
};


const gameReducer = (state: GameState, action: Action): GameState => {
    let newState: GameState;
    switch (action.type) {
        case 'CREATE_ROOM':
            newState = {
                ...initialState,
                screen: 'lobby',
                roomId: action.payload.roomId,
                players: [{ name: action.payload.playerName, symbol: 'X', score: 0 }, initialState.players[1]]
            };
            sessionStorage.setItem('tic-tac-toe-player', 'X');
            sessionStorage.setItem('tic-tac-toe-room', newState.roomId!);
            saveStateToLocalStorage(newState);
            return newState;

        case 'JOIN_ROOM': {
            const roomKey = `tic-tac-toe-room-${action.payload.roomId}`;
            const roomData = localStorage.getItem(roomKey);
            if (!roomData) {
                return { ...state, error: 'لم يتم العثور على الغرفة.' };
            }
            const roomState: GameState = JSON.parse(roomData);
            if (roomState.players[1].name !== 'اللاعب 2') {
                 return { ...state, error: 'الغرفة ممتلئة.' };
            }
            newState = {
                ...roomState,
                screen: 'game',
                players: [roomState.players[0], { ...roomState.players[1], name: action.payload.playerName, symbol: 'O' }],
                error: null,
            };
            sessionStorage.setItem('tic-tac-toe-player', 'O');
            sessionStorage.setItem('tic-tac-toe-room', newState.roomId!);
            saveStateToLocalStorage(newState);
            return newState;
        }

        case 'MAKE_MOVE': {
            if (state.board[action.payload.index] || state.winner) {
                return state;
            }
            const newBoard = [...state.board];
            newBoard[action.payload.index] = state.currentPlayer;
            const winner = calculateWinner(newBoard);
            
            let updatedPlayers: [Player, Player] = [...state.players];
            if(winner && winner !== 'draw') {
                const winningPlayerIndex = state.players.findIndex(p => p.symbol === winner);
                updatedPlayers[winningPlayerIndex] = {
                    ...updatedPlayers[winningPlayerIndex],
                    score: updatedPlayers[winningPlayerIndex].score + 10
                };
            } else if (winner === 'draw') {
                 updatedPlayers = [
                     {...updatedPlayers[0], score: updatedPlayers[0].score + 2},
                     {...updatedPlayers[1], score: updatedPlayers[1].score + 2}
                 ];
            }

            newState = {
                ...state,
                board: newBoard,
                winner: winner,
                currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
                players: updatedPlayers
            };
            saveStateToLocalStorage(newState);
            return newState;
        }
        case 'RESET_GAME':
             newState = {
                ...state,
                board: Array(9).fill(null),
                currentPlayer: 'X',
                winner: null,
            };
            saveStateToLocalStorage(newState);
            return newState;

        case 'GO_HOME':
            removeStateFromLocalStorage(state.roomId);
            sessionStorage.removeItem('tic-tac-toe-player');
            sessionStorage.removeItem('tic-tac-toe-room');
            return initialState;

        case 'SYNC_STATE':
            return action.payload;
            
        case 'SET_ERROR':
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

interface GameContextProps {
    gameState: GameState;
    dispatch: React.Dispatch<Action>;
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            const room = sessionStorage.getItem('tic-tac-toe-room');
            if (room && event.key === `tic-tac-toe-room-${room}`) {
                if (event.newValue) {
                    const newState = JSON.parse(event.newValue);
                    dispatch({ type: 'SYNC_STATE', payload: newState });
                } else {
                    alert('تم إغلاق الغرفة من قبل المضيف.');
                    dispatch({ type: 'GO_HOME' });
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Rejoin room on refresh
    useEffect(() => {
        const room = sessionStorage.getItem('tic-tac-toe-room');
        if (room) {
            const roomKey = `tic-tac-toe-room-${room}`;
            const roomData = localStorage.getItem(roomKey);
            if(roomData) {
                dispatch({type: 'SYNC_STATE', payload: JSON.parse(roomData)})
            }
        }
    }, [])

    return (
        <GameContext.Provider value={{ gameState: state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};
