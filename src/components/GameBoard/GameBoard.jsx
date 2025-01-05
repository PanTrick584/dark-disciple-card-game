import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./styles/game-board.scss"
import { themes } from "../../consts/themes";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";

export const GameBoard = () => {
    const [currentHand, setCurrentHand] = useState();
    const [currentDeck, setCurrentDeck] = useState();
    const [currentGrave, setCurrentGrave] = useState();
    const [mulligan, setMulligan] = useState(0);
    const [cost, setCost] = useState({ current: 0, total: 7 });
    const [boardCards, setBoardCards] = useState([]);
    const [boardPoints, setBoardPoints] = useState(0);
    const [endTurn, setEndTurn] = useState(false);
    const [turns, setTurns] = useState({ current: 0, total: 14 })
    //POPUP
    const [popupOn, setPopupOn] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const {
        language,
        editedDeck,
        deckViewerOn,
        setDeckViewerOn,
        deckBuilderCards,
    } = useContext(AppContext);

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
        console.log(editedDeck);
        if (Object.keys(editedDeck).length === 0) return;

        const ids = editedDeck.cards.map(card => card.id);

        fetch('http://localhost:3333/api/v1/cards/chosen', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids }),
        })
            .then(response => response.json())
            .then(data => {
                const newEditDeck = editedDeck.cards.map(deckCard => {
                    const cardData = data.data.find(card => card._id === deckCard.id);
                    return cardData ? { id: deckCard.id, amount: deckCard.amount, data: cardData, level: cardData.level } : null;
                })
                    .filter(entry => entry !== null)
                    .flatMap(card => Array(card.amount).fill(card.data));
                const shuffledDeck = shuffleArray(newEditDeck);
                const createHand = shuffledDeck.splice(0, 10);
                setCurrentDeck(shuffledDeck);
                setCurrentHand(createHand);
            })
            .catch(error => console.error('Error:', error));

    }, [editedDeck])

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Pick a random index from 0 to i
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        return shuffled;
    }

    const mulliganCard = (uniqueId, cardId) => {
        // const cardIndex = currentHand.findIndex((card) => card._id === id);
        const oldHandCard = currentHand[cardId];
        const [newDeckCard] = currentDeck.splice(0, 1);

        // console.log(id);
        // console.log(cardIndex);
        const newHandCards = [...currentHand];
        newHandCards[cardId] = newDeckCard;

        setCurrentHand(newHandCards);
        setCurrentDeck((prev) => {
            const randomIndex = Math.floor(Math.random() * (prev.length + 1));
            const newDeck = [...prev];
            newDeck.splice(randomIndex, 0, oldHandCard); // Insert at random index
            return newDeck;
        });
        setMulligan((prev) => prev + 1); // Increment the mulligan count
    };

    const playCard = (card, handCardId) => {
        // Calculate new cost first
        const newCost = cost.current + card.level;

        // If cost would exceed 7, do nothing
        if (newCost > 7) {
            console.log("too much! its more than 7!!!!");
            return;
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
            console.log("its 7! end of turn!!");
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

                // Draw card as a separate operation
                if (currentDeck.length > 0) {
                    const [topCard, ...remainingDeck] = currentDeck;
                    setCurrentDeck(remainingDeck);
                    setCurrentHand(prevHand => [...prevHand, topCard]);
                }
            }, 800);
        }
    };

    console.log(currentDeck);
    console.log(currentHand);
    console.log(boardCards);
    console.log(boardPoints);
    return (
        <div className="game-board">
            <div className="game-board-container">
                {popupOn && <div className="game-board-popup">
                    {popupMessage}
                </div>}
                <div className="game-board-main">
                    <div className="game-board-info">
                        {endTurn ? "END OF TURN, PLEASE WAIT..." : ""}
                    </div>
                    <div className="game-board-info">
                        {mulligan < 3 ? "MULLIGAN!" : "PLAY"}
                    </div>
                    <div className="board-battlefield">
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
                    <div className="game-board-end-turn" onClick={() => {
                        setEndTurn(true);
                        setTimeout(() => {
                            setEndTurn(false); // Reset endTurn to false after 2 seconds
                            setCost((prev) => ({
                                ...prev,
                                current: 0,
                            }));
                            setTurns(prev => ({
                                ...prev,
                                current: prev.current + 1
                            }));

                            setCurrentDeck((prevDeck) => {
                                if (prevDeck.length > 0) {
                                    // Remove the top card from the deck
                                    const [topCard, ...remainingDeck] = prevDeck;

                                    // Add the top card to the current hand
                                    setCurrentHand((prevHand) => [...prevHand, topCard]);

                                    return remainingDeck; // Return the updated deck
                                }
                                return prevDeck; // If deck is empty, return as is
                            });
                        }, 800);
                    }}>END TURN</div>
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
                        graveyard
                    </div>
                    <div className="game-board-deck">
                        deck
                    </div>
                </div>
            </div>
            <div className="game-board-hand">
                HAND
                {currentHand?.map((handCard, handCardId) => {
                    const factionColors = colors(handCard.faction)
                    const style = {
                        zIndex: handCardId
                    }
                    return (
                        <div className="hand-card" onClick={() => mulligan < 3 ? mulliganCard(handCard._id, handCardId) : playCard(handCard, handCardId)}>
                            <CardTitle card={handCard} colors={factionColors} />
                            <CardDescription skills={handCard?.skills} colors={factionColors} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}