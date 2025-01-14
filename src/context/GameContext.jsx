// GameContext.js
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { fetchChosenCards } from '../api/fetchCards';
import { findCardSkills } from '../cardSkills/findCard';

const GameContext = createContext();

export function GameProvider({ children }) {
    // Game state
    const [startGame, setStartGame] = useState(false);
    const [playGame, setPlayGame] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('player_1');
    const [turns, setTurns] = useState({ current: 0, total: 14 });
    const {
        playerOneDeck, setPlayerOneDeck,
        playerTwoDeck, setPlayerTwoDeck
    } = useContext(AppContext);

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

    useEffect(() => {
        if (playerOneDeck) {
            console.log(playerOneDeck);
            updatePlayerState("player_1", "deck", playerOneDeck);

            if (playerOneDeck?.cards) {
                const ids = playerOneDeck?.cards.map(card => card.id);
                initializeDeck(ids, "player_1")
            }

        }
    }, [playerOneDeck ])

    useEffect(() => {
        if (playerTwoDeck) {
            updatePlayerState("player_2", "deck", playerTwoDeck)

            if (playerTwoDeck?.cards) {
                const ids = playerTwoDeck?.cards.map(card => card.id);
                initializeDeck(ids, "player_2")

            }

        }
    }, [playerTwoDeck ])

    const initializeDeck = useCallback(async (ids, player) => {
        console.log(ids);
        console.log(player);
        try {
            const data = await fetchChosenCards(ids);
            console.log("data:");
            console.log();
            const newEditDeck = players?.[`${player}`]?.deck?.cards
                .map(deckCard => {
                    const cardData = data.data.find(card => card._id === deckCard.id);
                    return cardData ? Array(deckCard.amount).fill(cardData) : null;
                })
                .flat()
                .filter(Boolean);

            const shuffledDeck = shuffleArray(newEditDeck);
            const initialHand = shuffledDeck.splice(0, 10);
            updatePlayerState(player, "currentDeck", shuffledDeck);
            updatePlayerState(player, "currentHand", initialHand);
        } catch (error) {
            console.error('Error initializing deck:', error);
        }
    }, [players]);

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
            console.log("play card");
            console.log(playerId);
            const currentPlayer = players[playerId];
    //     const opponentId = playerId === 'player_1' ? 'player_2' : 'player_1';
        const isSpy = card.category?.some((category) => category?.en === "spy");

        // const skills = findCardSkills(card);
        // console.log("Card Skills:", skills);

        if (isSpy) {
            if (!yourTurn) {
                const newCost = oponentCost.current + card.level;

                setOwnBoard((prev) => [...prev, card]);
                setOponentCost((prev) => ({
                    ...prev,
                    current: newCost,
                }));
                const newBoardCards = [...ownBoard, card];
                const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
                const newHand = ownHand.filter((_, id) => id !== handCardId);

                setOponentHand(newHand);
                setOwnPoints(newPoints);
                return;
            } else {
                setOpponentBoard((prev) => [...prev, card]);
                const newBoardCards = [...opponentBoard, card];
                const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
                setOponentPoints(newPoints);
                handlePopup("Spy card played on opponent's board!");
            }

            const newCost = ownCost.current + card.level;
            if (newCost > 7) {
                handlePopup("Not enough Cost Points!");
                return;
            }

            setOwnCost((prev) => ({
                ...prev,
                current: newCost,
            }));

            const newHand = ownHand.filter((_, id) => id !== handCardId);
            setOwnHand(newHand);

            if (newCost === 7) {
                handlePopup("End of turn!");
                switchTurns();
            }

            return;
        }

        // const newCost = ownCost.current + card.level;
        const newCost = currentPlayer?.cost?.current + card?.level;
        if (newCost > 7) {
            handlePopup("Not enough Cost Points!");
            return;
        }

        const newBoardCards = [...currentPlayer?.board, card];
        // setOwnBoard(newBoardCards);
        updatePlayerState(targetPlayer, 'board', newBoardCards);


        const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
        setOwnPoints(newPoints);

        const newHand = ownHand.filter((_, id) => id !== handCardId);
        setOwnHand(newHand);

        setOwnCost((prev) => ({
            ...prev,
            current: newCost,
        }));

        if (newCost === 7) {
            handlePopup("End of turn!");
            switchTurns();
        }
    };

    // const playCard = (playerId, card, handCardId) => {
    //     const currentPlayer = players[playerId];
    //     const opponentId = playerId === 'player_1' ? 'player_2' : 'player_1';
    //     const isSpy = card?.category?.some((category) => category?.en === "spy");

    //     if (isSpy) {
    //         // Handle spy card logic
    //         const targetPlayer = opponentId;
    //         const newBoard = [...players[targetPlayer].board, card];
    //         updatePlayerState(targetPlayer, 'board', newBoard);

    //         const newPoints = newBoard.reduce((sum, c) => sum + c.strength, 0);
    //         updatePlayerState(targetPlayer, 'points', newPoints);
    //     } else {
    //         // Handle regular card logic
    //         const newCost = currentPlayer?.cost?.current + card?.level;
    //         if (newCost > 7) return false;

    //         const newBoard = [...currentPlayer?.board, card];
    //         const newPoints = newBoard.reduce((sum, c) => sum + c.strength, 0);

    //         updatePlayerState(playerId, 'board', newBoard);
    //         updatePlayerState(playerId, 'points', newPoints);
    //         updatePlayerState(playerId, 'cost', { ...currentPlayer.cost, current: newCost });
    //     }

    //     // Remove card from hand
    //     const newHand = currentPlayer.hand.filter((_, idx) => idx !== handCardId);
    //     console.log(newHand);
    //     updatePlayerState(playerId, 'hand', newHand);

    //     return true;
    // };

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