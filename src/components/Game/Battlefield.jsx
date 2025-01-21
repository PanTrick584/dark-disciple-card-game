import { useGame } from "../../context/GameContext";
import { CardDescription } from "../Card/CardDescription";
import { CardTitle } from "../Card/CardTitle";

import "./styles/battlefield.scss"

export const Battlefield = ({ isCurrentPlayer, handleCardDrop, player, playerId }) => {
    const {
        handleCardOrder
    } = useGame();

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("draggedIndex", index);
        e.dataTransfer.setData("source", "board");
    };

    const handleDropOnBoard = (e, dropIndex) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"), 10);
        console.log("board!!");
        handleCardOrder(e, playerId, draggedIndex);
    };

    return (
        <div
            className={`battlefield${isCurrentPlayer ? "" : " disabled"}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {e.dataTransfer.getData("source") === "board" ? handleDropOnBoard(e, e.dataTransfer.getData("draggedIndex")) : handleCardDrop(e, playerId)}}
            style={playerId === "player_1" ? { alignItems: "flex-start" } : { alignItems: "flex-end" }}
        >
            {player?.board.length && player?.board?.map((card, index) => {
                // const factionColors = getColors(card.faction);
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