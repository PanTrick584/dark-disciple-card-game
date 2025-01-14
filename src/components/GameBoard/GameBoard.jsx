import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { themes } from "../../consts/themes";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
import { BoardHand } from "../BoardHand/BoardHand";
// API
import { fetchChosenCards } from '../../api/fetchCards';
// STYLES
import "./styles/game-board.scss"
import { findCardSkills } from "../../cardSkills/findCard";
import { useGame } from "../../context/GameContext";
import { GameInfo } from "./GameInfo";

export const GameBoard = ({
    playerId,
    // player,
    deck,
    yourTurn,
    // switchTurns,
    ownBoard, setOwnBoard,
    opponentBoard, setOpponentBoard,
    ownPoints, setOwnPoints,
    oponentPoints, setOponentPoints,
    ownCost, setOwnCost,
    oponentCost, setOponentCost,
    ownHand, setOwnHand,
    oponentHand, setOponentHand,
    ownMuligan, setOwnMuligan,
    oponentMuligan, setOponentMuligan
}) => {
    const {
        currentPlayer,
        players,
        turns,
        setTurns,
        switchTurns,
        playCard,
        startGame,
            setStartGame,
    } = useGame();

    // console.log(players);

    // BASE GAME
    // const [turns, setTurns] = useState({ current: 0, total: 14 })
    // HAND
    const [selectedCard, setSelectedCard] = useState(null);
    // DECK
    const [currentDeck, setCurrentDeck] = useState();
    const [deckOn, setDeckOn] = useState(false);
    // GRAVEYARD
    const [currentGrave, setCurrentGrave] = useState([]);
    //POPUP
    const [popupOn, setPopupOn] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const { language } = useContext(AppContext);

    const colors = (factionName) => {
        let factionColors;
        const theme = Object.values(themes).find(theme => theme.faction[language] === factionName);
        if (theme) {
            factionColors = {
                themeMain: theme.themeMain,
                themeAccent: theme.themeAccent,
                themeAccentAlt: theme.themeAccentAlt,
            };
        }
        return factionColors;
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest(".hand-card")) setSelectedCard(null);
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    useEffect(() => handlePopup("Mulligan!"), [])

    useEffect(() => { handlePopup(startGame) }, [startGame])

    useEffect(() => {
        if (Object.keys(players?.[`${playerId}`]?.deck).length === 0) return;

        const ids = players?.[`${playerId}`]?.deck?.cards.map(card => card.id);

        initializeDeck(ids);
    }, [players?.[`${playerId}`].deck]);

    useEffect(() => {
        if (!yourTurn || !startGame) return;

        if (turns.current === 0) {

            ownMuligan < 3 && handlePopup("Mulligan!");
            setTurns((prev) => ({ ...prev, current: 1 }));
            setOwnCost((prev) => ({ ...prev, current: 0 }));
        } else {
            handlePopup("Your turn!");
            setOwnCost((prev) => ({ ...prev, current: 0 }));

            if (currentDeck.length > 0) {
                const [topCard, ...remainingDeck] = currentDeck;
                setCurrentDeck(remainingDeck);
                setOwnHand((prevHand) => [...prevHand, topCard]);
            }

            setTurns((prev) => ({ ...prev, current: prev.current + 1 }));
        }
    }, [yourTurn, startGame]);

    const initializeDeck = useCallback(async (ids) => {
        try {
            const data = await fetchChosenCards(ids);
            const newEditDeck = deck.cards
                .map(deckCard => {
                    const cardData = data.data.find(card => card._id === deckCard.id);
                    return cardData ? Array(deckCard.amount).fill(cardData) : null;
                })
                .flat()
                .filter(Boolean);

            const shuffledDeck = shuffleArray(newEditDeck);
            const initialHand = shuffledDeck.splice(0, 10);
            setCurrentDeck(shuffledDeck);
            setOwnHand(initialHand);
        } catch (error) {
            console.error('Error initializing deck:', error);
        }
    }, [deck]);

    const handlePopup = (message, time = 600) => {
        setPopupOn(true)
        setPopupMessage(message)
        setTimeout(() => setPopupOn(false), time)
    }

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    const handleDragStart = (e, card, cardId) => {
        e.dataTransfer.setData(
            "card",
            JSON.stringify({ card, cardId })
        );
    };

    const mulliganCard = (cardId) => {
        const oldHandCard = ownHand[cardId];
        const [newDeckCard] = currentDeck.splice(0, 1);
        const newHandCards = [...ownHand];
        newHandCards[cardId] = newDeckCard;

        setOwnHand(newHandCards);
        setCurrentDeck((prev) => {
            const randomIndex = Math.floor(Math.random() * (prev.length + 1));
            const newDeck = [...prev];
            newDeck.splice(randomIndex, 0, oldHandCard);
            return newDeck;
        });
        setOwnMuligan((prev) => prev + 1);
    };

    const handleEndTurn = () => {
        switchTurns()
        handlePopup("End of turn!")
    }

    const isCurrentPlayer = currentPlayer === playerId;
    const player = players[playerId];

    const getColors = (factionName) => {
        // Your existing colors function implementation
    };

    const handleCardPlay = (card, handCardId) => {
        if (!isCurrentPlayer) return;
        const success = playCard(playerId, card, handCardId);
        if (success && player.cost.current >= 7) {
            switchTurns();
        }
    };

    // const playCard = (card, handCardId) => {
    //     const isSpy = card.category?.some((category) => category?.en === "spy");

    //     const skills = findCardSkills(card);
    //     console.log("Card Skills:", skills);

    //     if (isSpy) {
    //         if (!yourTurn) {
    //             const newCost = oponentCost.current + card.level;

    //             setOwnBoard((prev) => [...prev, card]);
    //             setOponentCost((prev) => ({
    //                 ...prev,
    //                 current: newCost,
    //             }));
    //             const newBoardCards = [...ownBoard, card];
    //             const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
    //             const newHand = ownHand.filter((_, id) => id !== handCardId);

    //             setOponentHand(newHand);
    //             setOwnPoints(newPoints);
    //             return;
    //         } else {
    //             setOpponentBoard((prev) => [...prev, card]);
    //             const newBoardCards = [...opponentBoard, card];
    //             const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
    //             setOponentPoints(newPoints);
    //             handlePopup("Spy card played on opponent's board!");
    //         }

    //         const newCost = ownCost.current + card.level;
    //         if (newCost > 7) {
    //             handlePopup("Not enough Cost Points!");
    //             return;
    //         }

    //         setOwnCost((prev) => ({
    //             ...prev,
    //             current: newCost,
    //         }));

    //         const newHand = ownHand.filter((_, id) => id !== handCardId);
    //         setOwnHand(newHand);

    //         if (newCost === 7) {
    //             handlePopup("End of turn!");
    //             switchTurns();
    //         }

    //         return;
    //     }

    //     const newCost = ownCost.current + card.level;
    //     if (newCost > 7) {
    //         handlePopup("Not enough Cost Points!");
    //         return;
    //     }

    //     const newBoardCards = [...ownBoard, card];
    //     setOwnBoard(newBoardCards);

    //     const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
    //     setOwnPoints(newPoints);

    //     const newHand = ownHand.filter((_, id) => id !== handCardId);
    //     setOwnHand(newHand);

    //     setOwnCost((prev) => ({
    //         ...prev,
    //         current: newCost,
    //     }));

    //     if (newCost === 7) {
    //         handlePopup("End of turn!");
    //         switchTurns();
    //     }
    // };

    return (
        <div className="game-board">
            <div className="game-board-container" style={player === "player_1" ? { order: 0 } : { order: 2 }}>
                {popupOn && <div className="game-board-popup">
                    <div className="game-board-popup-text">
                        {popupMessage}
                        {deckOn && <div className="game-board-popup-close" onClick={() => { setDeckOn(false); setPopupOn(false) }}>X</div>}
                    </div>
                    <div className="game-board-popup-cards">

                        {deckOn && currentDeck.map((popupCard) => {
                            const factionColors = colors(popupCard.faction)
                            return (
                                <div className="popup-card">
                                    <div className="hand-card">
                                        <CardTitle card={popupCard} colors={factionColors} />
                                        <CardDescription skills={popupCard?.skills} colors={factionColors} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>}
                <div className="game-board-main">
                    <div className="game-board-info">
                    </div>
                    <div className="game-board-info">
                        {ownMuligan < 3 ? "MULLIGAN!" : "PLAY"}
                    </div>
                    <div className="game-board-info">
                        {yourTurn && startGame && "Your turn!"}
                    </div>
                    <div className="game-board-info">
                    </div>
                    <div
                        className={`board-battlefield${yourTurn ? "" : " disabled"}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const draggedData = JSON.parse(e.dataTransfer.getData("card"));
                            const { card } = draggedData;

                            if (yourTurn) {
                                if (card.category?.some(category => category?.en === "spy")) {
                                    handlePopup("Cannot play spy cards on your board!");
                                    return;
                                }

                                playCard(card, draggedData.cardId);
                            } else {
                                if (card.category?.some(category => category?.en === "spy")) {
                                    playCard(card, draggedData.cardId);
                                }
                            }

                        }}
                    >
                        {ownBoard.length && ownBoard?.map((boardCard, boardCardId) => {
                            const factionColors = colors(boardCard.faction)

                            return (
                                <div className="hand-card">
                                    <CardTitle card={boardCard} colors={factionColors} />
                                    <CardDescription skills={boardCard?.skills} colors={factionColors} />
                                </div>
                            )
                        })}
                    </div>

                </div>
                <GameInfo
                    player={player}
                    isCurrentPlayer={isCurrentPlayer}
                    onEndTurn={switchTurns}
                    onViewDeck={() => setIsDeckVisible(true)}
                    currentTurn={turns.current}
                    totalTurns={turns.total}
                />
            </div>
            <BoardHand
                cards={ownHand}
                selectedCard={selectedCard}
                ownMuligan={ownMuligan}
                mulliganCard={mulliganCard}
                playCard={playCard}
                setSelectedCard={setSelectedCard}
                onDragStart={handleDragStart}
                colors={colors}
                yourTurn={yourTurn}
                player={player}
                playerId={playerId}
                    getColors={getColors}
                    onCardPlay={handleCardPlay}
            />
        </div>
    )
}