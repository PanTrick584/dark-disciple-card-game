import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { themes } from "../../consts/themes";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
import { BoardHand } from "../BoardHand/BoardHand";
import { NeoBox } from "../../containers/NeoBox";
// API
import { fetchChosenCards } from '../../api/fetchCards';
// STYLES
import "./styles/game-board.scss"

export const GameBoard = ({
    stargGame,
    player,
    deck,
    yourTurn,
    switchTurns,
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
    // BASE GAME
    const [mulligan, setMulligan] = useState(0);
    const [cost, setCost] = useState({ current: 0, total: 7 });
    // const [boardCards, setBoardCards] = useState([]);
    const [boardPoints, setBoardPoints] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const [turns, setTurns] = useState({ current: 0, total: 14 })
    // HAND
    // const [currentHand, setCurrentHand] = useState();
    const [selectedCard, setSelectedCard] = useState(null);
    // DECK
    const [currentDeck, setCurrentDeck] = useState();
    const [deckOn, setDeckOn] = useState(false);
    // GRAVEYARD
    const [currentGrave, setCurrentGrave] = useState([]);
    //POPUP
    const [popupOn, setPopupOn] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");


    const { language, editedDeck } = useContext(AppContext);

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
            if (!e.target.closest(".hand-card")) {
                setSelectedCard(null);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    useEffect(() => handlePopup("Mulligan!"), [])

    useEffect(() => {
        if (ownMuligan === 3) {
            handlePopup("READY!")
            setShowInfo(true)
        }
    }, [ownMuligan])

    useEffect(() => {
        if (Object.keys(deck).length === 0) return;

        const ids = deck.cards.map(card => card.id);

        initializeDeck(ids);
    }, [deck]);

    useEffect(() => {
        if (!yourTurn) return; // Do nothing if it's not the player's turn

        if (turns.current === 0) {
            // Handle mulligan phase at the beginning of the round
            ownMuligan < 3 && handlePopup("Mulligan!");
            setTurns((prev) => ({ ...prev, current: 1 })); // Initialize turn to 1
            setOwnCost((prev) => ({ ...prev, current: 0 })); // Reset card cost
        } else {
            // Handle regular turn logic
            handlePopup("Your turn!");
            setOwnCost((prev) => ({ ...prev, current: 0 })); // Reset card cost

            if (currentDeck.length > 0) {
                // Draw a card from the deck
                const [topCard, ...remainingDeck] = currentDeck;
                setCurrentDeck(remainingDeck);
                setOwnHand((prevHand) => [...prevHand, topCard]);
            }

            // Increment the turn counter
            setTurns((prev) => ({ ...prev, current: prev.current + 1 }));
        }
    }, [yourTurn]);

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
        setOwnMulligan((prev) => prev + 1);
    };

    const handleEndTurn = () => {
        switchTurns()
        handlePopup("End of turn!")
    }

    const playCard = (card, handCardId) => {
        const isSpy = card.category?.some((category) => category?.en === "spy");

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

            // Deduct card level from cost
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

        const newCost = ownCost.current + card.level;
        if (newCost > 7) {
            handlePopup("Not enough Cost Points!");
            return;
        }

        const newBoardCards = [...ownBoard, card];
        setOwnBoard(newBoardCards);

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
                        {/* {endTurn ? "END OF TURN, PLEASE WAIT..." : ""} */}
                    </div>
                    <div className="game-board-info">
                        {ownMuligan < 3 ? "MULLIGAN!" : "PLAY"}
                    </div>
                    <div className="game-board-info">
                        {yourTurn && "Your turn!"}
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
                                // Parse the dragged card data


                                if (card.category?.some(category => category?.en === "spy")) {
                                    handlePopup("Cannot play spy cards on your board!");
                                    return;
                                }

                                console.log("normall played card");
                                playCard(card, draggedData.cardId);
                            } else {
                                // console.log(card);
                                if (card.category?.some(category => category?.en === "spy")) {
                                    console.log("spy??");
                                    // const draggedData = JSON.parse(e.dataTransfer.getData("card"));
                                    // const { card } = draggedData;

                                    playCard(card, draggedData.cardId);
                                    // handlePopup("Cannot play spy cards on your board!");
                                    // return;
                                }
                            }

                        }}
                    >
                        {ownBoard.length && ownBoard?.map((boardCard, boardCardId) => {
                            const factionColors = colors(boardCard.faction)
                            const style = {
                                zIndex: boardCardId
                            }
                            return (
                                <div className="hand-card">
                                    <CardTitle card={boardCard} colors={factionColors} />
                                    <CardDescription skills={boardCard?.skills} colors={factionColors} />
                                </div>
                            )
                        })}
                    </div>

                </div>
                {showInfo
                    && <div className="game-board-aside">
                        {yourTurn &&
                            <div
                                className="neo-box"
                                onClick={() => handleEndTurn(player)}>
                                END TURN
                            </div>}
                        <div className="game-board-info">
                            {`PLAYER: ${player}`}
                        </div>
                        <div className="game-board-info">
                            {`POINTS: ${ownPoints}`}
                        </div>
                        <div className="game-board-info">
                            {`TURN: ${turns.current} / ${turns.total}`}
                        </div>
                        <div className="game-board-info">
                            {`MULLIGANS: ${ownMuligan} / 3`}
                        </div>
                        <div className="game-board-info">
                            {`TURN COST: ${ownCost.current} / ${ownCost.total}`}
                        </div>
                        <div className="game-board-graveyard">
                            {`graveyard`}
                        </div>
                        <div className="" onClick={() => { setPopupOn(true); setDeckOn(true), setPopupMessage("View deck") }}>
                            <div className="game-board-deck neo-box" >
                                {`DECK: ${currentDeck?.length}`}
                            </div>
                        </div>

                    </div>}
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
            />
        </div>
    )
}