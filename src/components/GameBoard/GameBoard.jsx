import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./styles/game-board.scss"
import { themes } from "../../consts/themes";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
import { BoardHand } from "../BoardHand/BoardHand"; // Import the new Hand component
import { NeoBox } from "../../containers/NeoBox";
// API
import { fetchChosenCards } from '../../api/fetchCards';

export const GameBoard = () => {
    // BASE GAME
    const [mulligan, setMulligan] = useState(0);
    const [cost, setCost] = useState({ current: 0, total: 7 });
    const [boardCards, setBoardCards] = useState([]);
    const [boardPoints, setBoardPoints] = useState(0);
    const [endTurn, setEndTurn] = useState(false);
    const [turns, setTurns] = useState({ current: 0, total: 14 })
    // HAND
    const [currentHand, setCurrentHand] = useState();
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

    useEffect(() => handlePopup("Mulligan phase!"), [])

    useEffect(() => {
        if (mulligan === 3) handlePopup("ok! lets start the game!")
    }, [mulligan])

    useEffect(() => {
        if (Object.keys(editedDeck).length === 0) return;

        const ids = editedDeck.cards.map(card => card.id);

        initializeDeck(ids);
    }, [editedDeck]);

    const initializeDeck = async (ids) => {
        try {
            const data = await fetchChosenCards(ids);

            const newEditDeck = editedDeck.cards
                .map(deckCard => {
                    const cardData = data.data.find(card => card._id === deckCard.id);
                    return cardData ? { id: deckCard.id, amount: deckCard.amount, data: cardData, level: cardData.level } : null;
                })
                .filter(entry => entry !== null)
                .flatMap(card => Array(card.amount).fill(card.data));

            const shuffledDeck = shuffleArray(newEditDeck);
            const createHand = shuffledDeck.splice(0, 10);

            setCurrentDeck(shuffledDeck);
            setCurrentHand(createHand);
        } catch (error) {
            console.error('Error initializing deck:', error);
        }
    };

    const handlePopup = (message, time = 1200) => {
        setPopupOn(true)
        setPopupMessage(message)
        setTimeout(() => setPopupOn(false), time)
    }

    const handleCardClick = (card, cardId) => {
        if (mulligan < 3) {
            mulliganCard(cardId);
        } else {
            if (selectedCard?.id === cardId) {
                // Card is already selected, "play" the card
                setSelectedCard(null);
                playCard(card, cardId);
            } else {
                // Select the card
                setSelectedCard({ id: cardId, card });
            }
        }
    };

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Pick a random index from 0 to i
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        return shuffled;
    }

    const handleDragStart = (e, card, cardId) => {
        console.log(card);
        e.dataTransfer.setData(
            "card",
            JSON.stringify({ card, cardId })
        );
    };

    const mulliganCard = (cardId) => {
        const oldHandCard = currentHand[cardId];
        const [newDeckCard] = currentDeck.splice(0, 1);
        const newHandCards = [...currentHand];
        newHandCards[cardId] = newDeckCard;

        setCurrentHand(newHandCards);
        setCurrentDeck((prev) => {
            const randomIndex = Math.floor(Math.random() * (prev.length + 1));
            const newDeck = [...prev];
            newDeck.splice(randomIndex, 0, oldHandCard);
            return newDeck;
        });
        setMulligan((prev) => prev + 1);
    };

    const handleEndTurn = () => {
        setEndTurn(true);
        handlePopup("End of turn!")
        setTimeout(() => {
            setEndTurn(false);
            setCost((prev) => ({
                ...prev,
                current: 0,
            }));
            setTurns(prev => ({
                ...prev,
                current: prev.current + 1
            }));
            handlePopup("Your turn!")

            setCurrentDeck((prevDeck) => {
                if (prevDeck.length > 0) {
                    const [topCard, ...remainingDeck] = prevDeck;
                    setCurrentHand((prevHand) => [...prevHand, topCard]);

                    return remainingDeck;
                }
                return prevDeck;
            });
        }, 1200);
    }

    const playCard = (card, handCardId) => {
        console.log(card);
        const newCost = cost.current + card.level;

        if (newCost > 7) {
            handlePopup("Not enought Cost Points!")
            return
        }

        // Update all states in parallel rather than nested
        const isExactlySeven = newCost === 7;

        // Update board cards
        const newBoardCards = [...boardCards, card];
        setBoardCards(newBoardCards);

        // Update points
        const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
        setBoardPoints(newPoints);

        // Update hand
        const newHand = currentHand.filter((_, id) => id !== handCardId);
        setCurrentHand(newHand);

        // Update cost
        setCost(prev => ({
            ...prev,
            current: newCost
        }));

        // Handle end of turn if cost is exactly 7
        if (isExactlySeven) {
            handlePopup("End of turn!")
            setEndTurn(true);

            setTimeout(() => {
                setEndTurn(false);
                setCost(prev => ({
                    ...prev,
                    current: 0
                }));

                setTurns(prev => ({
                    ...prev,
                    current: prev.current + 1
                }));
                handlePopup("Your turn!")

                // Draw card as a separate operation
                if (currentDeck.length > 0) {
                    const [topCard, ...remainingDeck] = currentDeck;
                    setCurrentDeck(remainingDeck);
                    setCurrentHand(prevHand => [...prevHand, topCard]);
                }
            }, 1200);
        }
    };

    return (
        <div className="game-board">
            <div className="game-board-container">
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
                        {endTurn ? "END OF TURN, PLEASE WAIT..." : ""}
                    </div>
                    <div className="game-board-info">
                        {mulligan < 3 ? "MULLIGAN!" : "PLAY"}
                    </div>
                    <div
                        className="board-battlefield"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();

                            // Parse the dragged card data
                            const draggedData = JSON.parse(e.dataTransfer.getData("card"));

                            playCard(draggedData.card, draggedData.cardId);
                        }}
                    >
                        {boardCards.length && boardCards?.map((boardCard, boardCardId) => {
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
                <div className="game-board-aside">

                    <div
                        className=""
                        onClick={() => handleEndTurn()}><NeoBox className="game-board-end-turn" >END TURN</NeoBox></div>

                    <div className="game-board-points">
                        {`POINTS: ${boardPoints}`}
                    </div>
                    <div className="game-board-turn">
                        {`TURN: ${turns.current} / ${turns.total}`}
                    </div>
                    <div className="game-board-mulligans">
                        {`MULLIGANS: ${mulligan} / 3`}
                    </div>
                    <div className="game-board-cost">
                        {`TURN COST: ${cost.current} / ${cost.total}`}
                    </div>
                    <div className="game-board-graveyard">
                        {`graveyard`}
                    </div>
                    <div className="" onClick={() => { setPopupOn(true); setDeckOn(true), setPopupMessage("View deck") }}>
                        <NeoBox className="game-board-deck" >
                            {`DECK: ${currentDeck?.length}`}
                        </NeoBox>
                    </div>

                </div>
            </div>
            <BoardHand
                cards={currentHand}
                selectedCard={selectedCard}
                mulligan={mulligan}
                onCardClick={handleCardClick}
                onDragStart={handleDragStart}
                colors={colors}
            />
        </div>
    )
}