import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { themes } from "../../consts/themes";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
import { GameHand } from "./GameHand";
// API
import { fetchChosenCards } from '../../api/fetchCards';
// STYLES
import "./styles/game-board.scss"
import { findCardSkills } from "../../cardSkills/findCard";
import { useGame } from "../../context/GameContext";
import { GameInfo } from "./GameInfo";
import { Battlefield } from "./Battlefield";

export const GameBoard = ({
    playerId
}) => {
    const {
        currentPlayer,
        players,
        switchTurns,
        playCard,
        startGame,
    } = useGame();

    // HAND
    const [selectedCard, setSelectedCard] = useState(null);
    // DECK
    const [deckOn, setDeckOn] = useState(false);
    // GRAVEYARD
    const [currentGrave, setCurrentGrave] = useState([]);
    //POPUP
    const [popupOn, setPopupOn] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const { language } = useContext(AppContext);

    const player = players[playerId];
    const isCurrentPlayer = currentPlayer === playerId;

    const colors = (factionName) => {
        let factionColors;
        const theme = Object.values(themes).find(theme => theme.faction[language] === factionName);
        // console.log(factionName);
        // console.log(themes);
        // console.log(theme);
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

    const handlePopup = (message, time = 600) => {
        setPopupOn(true)
        setPopupMessage(message)
        setTimeout(() => setPopupOn(false), time)
    }

    const handleDragStart = (e, card, cardId) => {
        e.dataTransfer.setData(
            "card",
            JSON.stringify({ card, cardId })
        );
    };

    const handleEndTurn = () => {
        switchTurns()
        handlePopup("End of turn!")
    }


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

    return (
        <div className="game-board">
            <div className="game-board-container" style={playerId === "player_1" ? { order: 0 } : { order: 2 }}>
                {popupOn && <div className="game-board-popup">
                    <div className="game-board-popup-text">
                        {popupMessage}
                        {deckOn && <div className="game-board-popup-close" onClick={() => { setDeckOn(false); setPopupOn(false) }}>X</div>}
                    </div>
                    <div className="game-board-popup-cards">

                        {deckOn && player?.currentDeck?.map((popupCard) => {
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
                        {/* {ownMuligan < 3 ? "MULLIGAN!" : "PLAY"} */}
                    </div>
                    <div className="game-board-info">
                        {currentPlayer === playerId && startGame && "Your turn!"}
                    </div>
                    <div className="game-board-info">
                    </div>
                    <Battlefield
                        isCurrentPlayer={isCurrentPlayer}
                        handleDrop={handleCardPlay}
                        player={player}
                    />
                </div>
                <GameInfo
                    playerId={playerId}
                    isCurrentPlayer={isCurrentPlayer}
                    onEndTurn={switchTurns}
                    onViewDeck={() => setIsDeckVisible(true)}
                />
            </div>
            <GameHand
                selectedCard={selectedCard}
                playCard={playCard}
                setSelectedCard={setSelectedCard}
                onDragStart={handleDragStart}
                colors={colors}
                // yourTurn={yourTurn}
                player={player}
                playerId={playerId}
                // getColors={getColors}
                onCardPlay={handleCardPlay}
            />
        </div>
    )
}