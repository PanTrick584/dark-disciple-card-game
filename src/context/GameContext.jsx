// GameContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
// HOOKS
import { useCardActions } from "./hooks/useCardActions"
import { useGameFlow } from './hooks/useGameFlow';
import { useDeckActions } from './hooks/useDeckActions';
import { useBoardActions } from './hooks/useBoardActions';

const GameContext = createContext();

export function GameProvider({ children }) {
    const [currentPlayer, setCurrentPlayer] = useState('player_1');
    const { playerOneDeck, playerTwoDeck } = useContext(AppContext);
    const [players, setPlayers] = useState({
        player_1: {
            muligan: 0,
            board: [],
            points: 0,
            cost: { current: 0, total: 7 },
            hand: [],
            deck: {},
            currentDeck: [],
            currentTurn: 0,
            activeBoard: false
        },
        player_2: {
            muligan: 0,
            board: [],
            points: 0,
            cost: { current: 0, total: 7 },
            hand: [],
            deck: {},
            currentDeck: [],
            currentTurn: 0,
            activeBoard: false
        }
    });

    useEffect(() => {
        if (playerOneDeck) {
            updatePlayerState("player_1", "deck", playerOneDeck);

            if (playerOneDeck?.cards) {
                initializeDeck(playerOneDeck.cards, "player_1")
            }
        }
    }, [playerOneDeck])

    useEffect(() => {
        if (playerTwoDeck) {
            updatePlayerState("player_2", "deck", playerTwoDeck)

            if (playerTwoDeck?.cards) {
                initializeDeck(playerTwoDeck.cards, "player_2")
            }
        }
    }, [playerTwoDeck])

    useEffect(() => {
        // TODO: if turn 0 no card draw

        updatePlayerState(currentPlayer, "currentTurn", players[currentPlayer].currentTurn + 1)
        updatePlayerState(currentPlayer, "cost", { ...players[currentPlayer].cost, current: 0 })

        // DRAW A CARD
        const [topCard, ...remainingDeck] = players[currentPlayer].currentDeck;
        updatePlayerState(currentPlayer, "currentDeck", remainingDeck)
        updatePlayerState(currentPlayer, "hand", [...players[currentPlayer].hand, topCard])
    }, [currentPlayer]);

    const updatePlayerState = (playerId, field, value) => {
        setPlayers(prev => ({
            ...prev,
            [playerId]: {
                ...prev[playerId],
                [field]: value
            }
        }));
    };

    // PLAYER STATE

    // GAME FLOW
    const {
        startGame,
        setStartGame,
        playGame,
        setPlayGame,
        popupMessages,
        showPopupMessage,
        muliganEnable,
        setMuliganEnable,
        switchTurns
    } = useGameFlow({ currentPlayer, setCurrentPlayer })
    // BOARD ACTIONS

    // DECK ACTIONS
    const { initializeDeck } = useDeckActions({ players, updatePlayerState })

    // CARD ACTIONS
    const { muliganCard, playCard } = useCardActions({
        players,
        currentPlayer,
        updatePlayerState,
        showPopupMessage,
        switchTurns
    });

    // BOARD ACTIONS
    const { handleCardOrder } = useBoardActions({players, updatePlayerState})

    const value = {
        startGame,
        setStartGame,
        playGame,
        setPlayGame,
        currentPlayer,
        players,
        updatePlayerState,
        muliganCard,
        switchTurns,
        playCard,
        popupMessages,
        showPopupMessage,
        muliganEnable,
        setMuliganEnable,
        handleCardOrder
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);