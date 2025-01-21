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
// import { useGame } from '../../context/GameContext/GameContext';
// import { useGame } from "../../context/GameContext";

import { GameInfo } from "./GameInfo";
import { Battlefield } from "./Battlefield";
import { DeckPopup } from "../Popup/DeckPopup";
import { InfoPopup } from "../Popup/InfoPopup";
import { BoardInfo } from "../BoardInfo/BoardInfo";

export const GameBoard = ({ playerId }) => {
    const {
        currentPlayer,
        players,
        playCard,
        startGame,
        popupMessages,
        setPopupMessages
    } = useGame();

    // DECK
    const [popupCards, setPopupCards] = useState([]);
    // POPUP
    const [deckPopupOn, setDeckPopupOn] = useState(false);
    const [infoPopupOn, setInfoPopupOn] = useState(false);
    // GRAVEYARD
    const [currentGrave, setCurrentGrave] = useState([]);
    //POPUP
    // const [popupOn, setPopupOn] = useState(false);

    const { language } = useContext(AppContext);

    const player = players[playerId];
    const isCurrentPlayer = currentPlayer === playerId;

    const handleDragStart = (e, card, cardId) => {
        e.dataTransfer.setData(
            "card",
            JSON.stringify({ card, cardId })
        );
    };



    return (
        <div className="game-board">
            {deckPopupOn && <DeckPopup cards={popupCards} />}
            <div className="game-board-container" >
                {popupMessages[playerId] && <InfoPopup playerId={playerId} />}
                <div className="game-board-main">
                    <BoardInfo />
                    <Battlefield
                        isCurrentPlayer={isCurrentPlayer}
                        player={player}
                        playerId={playerId}
                    />
                </div>
                <GameInfo
                    playerId={playerId}
                    isCurrentPlayer={isCurrentPlayer}
                    onViewDeck={() => setIsDeckVisible(true)}
                />
            </div>
            <GameHand
                playCard={playCard}
                handleDragStart={handleDragStart}
                playerId={playerId}
            />
        </div>
    )
}