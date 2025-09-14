export type PlayerSymbol = 'X' | 'O';
export type SquareValue = PlayerSymbol | null;

export interface Player {
    name: string;
    symbol: PlayerSymbol;
    score: number;
}

export type Screen = 'home' | 'lobby' | 'game';

export interface GameState {
    screen: Screen;
    players: [Player, Player];
    board: SquareValue[];
    currentPlayer: PlayerSymbol;
    winner: PlayerSymbol | 'draw' | null;
    roomId: string | null;
    error: string | null;
}

export type Action =
    | { type: 'CREATE_ROOM'; payload: { roomId: string; playerName: string } }
    | { type: 'JOIN_ROOM'; payload: { roomId: string; playerName: string } }
    | { type: 'MAKE_MOVE'; payload: { index: number } }
    | { type: 'RESET_GAME' }
    | { type: 'GO_HOME' }
    | { type: 'SYNC_STATE', payload: GameState }
    | { type: 'SET_ERROR', payload: string | null };
