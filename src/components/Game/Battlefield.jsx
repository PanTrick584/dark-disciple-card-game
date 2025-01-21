import { useState } from "react";
import { useGame } from "../../context/GameContext";
// import { useGame } from '../../context/GameContext/GameContext';

import { CardDescription } from "../Card/CardDescription";
import { CardTitle } from "../Card/CardTitle";

import "./styles/battlefield.scss"

export const Battlefield = ({ isCurrentPlayer, player, playerId }) => {
    const [activeBoard, setActiveBoard] = useState({
        player_1: false,
        player_2: false
    });
    const {
        handleCardOrder
    } = useGame();

    const {
        currentPlayer,
        players,
        playCard,
        startGame,
        popupMessages,
        setPopupMessages,
        updatePlayerState
    } = useGame();
    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("draggedIndex", index);
        e.dataTransfer.setData("source", "board");
    };

    const handleDropOnBoard = (e, draggedIndex) => {
        e.preventDefault();
        console.log("board!!");
        handleCardOrder(e, playerId, draggedIndex);
    };

    const handleCardDrop = (e, playerId) => {
        e.preventDefault();
        // console.log(targetPlayerId);
        const draggedData = JSON.parse(e.dataTransfer.getData("card")) ?? "";
        if (!draggedData) return;
        const { card, cardId } = draggedData;

        updatePlayerState(playerId, "activeBoard", false)
        playCard(playerId, card, cardId);
    };

    return (
        <div
            className={`battlefield${isCurrentPlayer ? "" : " disabled"}${players[playerId].activeBoard ? " highlight" : ""}`}
            // onDragOver={(e) => { e.preventDefault() }}
            onDragLeave={() => updatePlayerState(playerId, "activeBoard", false)}
            onDragOver={(e) => { e.preventDefault(); updatePlayerState(playerId, "activeBoard", true) }}
            onDrop={(e) => {
                e.dataTransfer.getData("source") === "board"
                    ? handleDropOnBoard(e, e.dataTransfer.getData("draggedIndex"))
                    : handleCardDrop(e, playerId)
            }}
            style={playerId === "player_1" ? { alignItems: "flex-start" } : { alignItems: "flex-end" }}
        >
            {player?.board.length && player?.board?.map((card, index) => {
                return (
                    <div
                        key={index}
                        className="hand-card"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                    >
                        <CardTitle card={card} colors={""} />
                        <CardDescription skills={card?.skills} colors={""} />
                    </div>
                );
            })}
        </div>
    )
}