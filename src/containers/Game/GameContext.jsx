// GameContext.js
import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
    // Game state
    const [startGame, setStartGame] = useState(false);
    const [playGame, setPlayGame] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('player_1');
    const [turns, setTurns] = useState({ current: 0, total: 14 });

    // Player states
    const [players, setPlayers] = useState({
        player_1: {
            muligan: 0,
            board: [],
            points: 0,
            cost: { current: 0, total: 7 },
            hand: [],
            deck: {},
            currentDeck: []
        },
        player_2: {
            muligan: 0,
            board: [],
            points: 0,
            cost: { current: 0, total: 7 },
            hand: [],
            deck: {},
            currentDeck: []
        }
    });

    const updatePlayerState = (playerId, field, value) => {
        setPlayers(prev => ({
            ...prev,
            [playerId]: {
                ...prev[playerId],
                [field]: value
            }
        }));
    };

    const switchTurns = () => {
        setCurrentPlayer(prev => prev === 'player_1' ? 'player_2' : 'player_1');
    };

    const playCard = (playerId, card, handCardId) => {
        const currentPlayer = players[playerId];
        const opponentId = playerId === 'player_1' ? 'player_2' : 'player_1';
        const isSpy = card.category?.some((category) => category?.en === "spy");

        if (isSpy) {
            // Handle spy card logic
            const targetPlayer = opponentId;
            const newBoard = [...players[targetPlayer].board, card];
            updatePlayerState(targetPlayer, 'board', newBoard);

            const newPoints = newBoard.reduce((sum, c) => sum + c.strength, 0);
            updatePlayerState(targetPlayer, 'points', newPoints);
        } else {
            // Handle regular card logic
            const newCost = currentPlayer.cost.current + card.level;
            if (newCost > 7) return false;

            const newBoard = [...currentPlayer.board, card];
            const newPoints = newBoard.reduce((sum, c) => sum + c.strength, 0);

            updatePlayerState(playerId, 'board', newBoard);
            updatePlayerState(playerId, 'points', newPoints);
            updatePlayerState(playerId, 'cost', { ...currentPlayer.cost, current: newCost });
        }

        // Remove card from hand
        const newHand = currentPlayer.hand.filter((_, idx) => idx !== handCardId);
        updatePlayerState(playerId, 'hand', newHand);

        return true;
    };

    return (
        <GameContext.Provider value={{
            startGame,
            setStartGame,
            playGame,
            setPlayGame,
            currentPlayer,
            players,
            turns,
            setTurns,
            updatePlayerState,
            switchTurns,
            playCard
        }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);