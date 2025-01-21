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
    const [popupMessage, setPopupMessage] = useState({
        show: false,
        message: ""
    });
    const [popupMessages, setPopupMessages] = useState({
        player_1: null,
        player_2: null,
    });
    const [muliganEnable, setMuliganEnable] = useState(true)

    const [currentPlayer, setCurrentPlayer] = useState('player_1');
    const {
        playerOneDeck,
        playerTwoDeck,
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
            currentDeck: [],
            currentTurn: 0
        },
        player_2: {
            muligan: 0,
            board: [],
            points: 0,
            cost: { current: 0, total: 7 },
            hand: [],
            deck: {},
            currentDeck: [],
            currentTurn: 0
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
        console.log(currentPlayer);

        updatePlayerState(currentPlayer, "currentTurn", players[currentPlayer].currentTurn + 1)
        updatePlayerState(currentPlayer, "cost", { ...players[currentPlayer].cost, current: 0 })

        // DRAW A CARD
        const [topCard, ...remainingDeck] = players[currentPlayer].currentDeck;
        updatePlayerState(currentPlayer, "currentDeck", remainingDeck)
        updatePlayerState(currentPlayer, "hand", [...players[currentPlayer].hand, topCard])
    }, [currentPlayer]);

    const initializeDeck = useCallback(async (cards, player) => {
        const ids = cards.map(card => card.id);

        try {
            const data = await fetchChosenCards(ids);
            const newEditDeck = cards
                .map(deckCard => {
                    const cardData = data.data.find(card => card._id === deckCard.id);
                    return cardData ? Array(deckCard.amount).fill(cardData) : null;
                })
                .flat()
                .filter(Boolean);

            const shuffledDeck = shuffleArray(newEditDeck);
            const initialHand = shuffledDeck.splice(0, 10);

            updatePlayerState(player, "currentDeck", shuffledDeck);
            updatePlayerState(player, "hand", initialHand);
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

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    const muliganCard = (cardId) => {
        const oldHandCard = players[currentPlayer].hand[cardId];
        const [newDeckCard] = players[currentPlayer].currentDeck.splice(0, 1);
        const newHandCards = [...players[currentPlayer].hand];
        newHandCards[cardId] = newDeckCard;

        // PLACE CARD AT RANDO IN DECK TO FIX
        // const randomIndex = Math.floor(Math.random() * (player.currentDeck.length + 1));
        // const newDeck = player.currentDeck.splice(randomIndex, 0, oldHandCard);
        const newDeck = [...players[currentPlayer].currentDeck, oldHandCard];

        updatePlayerState(currentPlayer, "hand", newHandCards)
        updatePlayerState(currentPlayer, "currentDeck", newDeck)
        updatePlayerState(currentPlayer, "muligan", players[currentPlayer].muligan + 1)
    };

    const switchTurns = () => {
        const nextPlayer = currentPlayer === "player_1" ? "player_2" : "player_1";

        showPopupMessage(currentPlayer, "End of turn!")
        showPopupMessage(nextPlayer, "Your turn!")
        setCurrentPlayer(nextPlayer);
    };

    const showPopupMessage = (playerId, message, duration = 500) => {
        setPopupMessages((prev) => ({
            ...prev,
            [playerId]: message,
        }));

        setTimeout(() => {
            setPopupMessages((prev) => ({
                ...prev,
                [playerId]: null,
            }));
        }, duration);
    };

    const playCard = (playerId, card, handCardId) => {
        const opponentId = playerId === 'player_1' ? 'player_2' : 'player_1';
        console.log(playerId);
        console.log(opponentId);
        const isSpy = card.category?.some((category) => category?.en === "spy");

        if (isSpy) {
            if (currentPlayer !== playerId) {
                const newCost = players[opponentId]?.cost?.current + card.level;

                console.log("drag spy!");
                if (newCost > 7) {
                    handlePopup("Not enough Cost Points!");
                    return;
                }

                if (newCost === 7) {
                    switchTurns(playerId);
                }

                updatePlayerState(opponentId, 'cost', { ...opponentId.cost, current: newCost });

                const newBoardCards = [...players[playerId]?.board, card];
                updatePlayerState(playerId, 'board', newBoardCards);

                const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
                updatePlayerState(playerId, 'points', newPoints);

                const newHand = players[opponentId].hand.filter((_, id) => id !== handCardId);
                updatePlayerState(opponentId, 'hand', newHand);
            } else {
                const newCost = players[playerId]?.cost?.current + card.level;

                console.log("click spy!");
                if (newCost > 7) {
                    // handlePopup("Not enough Cost Points!");
                    return;
                }

                if (newCost === 7) {
                    // handlePopup("End of turn!");
                    switchTurns(playerId);
                }

                updatePlayerState(playerId, 'cost', { ...playerId.cost, current: newCost });

                const newBoardCards = [...players[opponentId]?.board, card];
                updatePlayerState(opponentId, 'board', newBoardCards);


                const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
                updatePlayerState(opponentId, 'points', newPoints);

                const newHand = players[playerId].hand.filter((_, id) => id !== handCardId);
                updatePlayerState(playerId, 'hand', newHand);
            }
            return;
        }


        if (currentPlayer !== playerId) {
            showPopupMessage(opponentId, "stop druging cards on opponents board!");
            return;
        }

        if (currentPlayer === playerId) {
            console.log("regular card!");
            // return;
        }

        console.log("no spy");
        const newCost = players[playerId]?.cost?.current + card?.level;

        if (newCost > 7) {
            showPopupMessage(playerId, "Not enough Cost Points!");
            return;
        }

        if (newCost === 7) {
            // handlePopup("End of turn!");
            switchTurns(playerId);
        }

        updatePlayerState(playerId, 'cost', { ...playerId.cost, current: newCost });

        const newBoardCards = [...players[playerId]?.board, card];
        updatePlayerState(playerId, 'board', newBoardCards);

        const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
        updatePlayerState(playerId, 'points', newPoints);

        const newHand = players[playerId]?.hand.filter((_, id) => id !== handCardId);
        updatePlayerState(playerId, 'hand', newHand);
    };

    // BOARD
    const calculateDropIndex = (e, playerId) => {
        const boardElement = e.currentTarget; // The drop target
        const children = Array.from(boardElement.children); // Get all card elements
        const { clientX } = e; // Horizontal drop position
    
        // Iterate over children to find where the card should be dropped
        for (let i = 0; i < children.length; i++) {
            const rect = children[i].getBoundingClientRect();
            if (clientX < rect.left + rect.width / 2) {
                return i; // Return the index before which the card should be inserted
            }
        }
    
        return children.length; // Default to the end of the board
    };

    const handleCardOrder = (e, playerId, draggedIndex) => {
        e.preventDefault();
        const source = e.dataTransfer.getData("source");
    
        if (source === "hand") {
            // Add card from hand to the board
            const card = players[playerId].hand[data.cardIndex];
            updatePlayerState(playerId, "hand", players[playerId].hand.filter((_, i) => i !== data.cardIndex));
    
            // Find dropIndex
            const dropIndex = calculateDropIndex(e, playerId);
            const newBoard = [...players[playerId].board];
            newBoard.splice(dropIndex, 0, card);
    
            updatePlayerState(playerId, "board", newBoard);
        } else if (source === "board") {
            // Reorder cards on the board
            // const draggedIndex = data.cardIndex;
            const dropIndex = calculateDropIndex(e, playerId);
    
            if (draggedIndex !== dropIndex) {
                const board = [...players[playerId].board];
                const [draggedCard] = board.splice(draggedIndex, 1);
                board.splice(dropIndex, 0, draggedCard);
                updatePlayerState(playerId, "board", board);
            }
        }
    };
    

    return (
        <GameContext.Provider value={{
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
            setPopupMessages,
            showPopupMessage,
            muliganEnable,
            setMuliganEnable,
            handleCardOrder
        }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);