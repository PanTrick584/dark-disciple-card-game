import React from 'react';
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
import "./styles/board-field.scss";
import { useGame } from '../../context/GameContext';

export const BoardField = ({ cards, isCurrentPlayer, onCardPlay, getColors }) => {
    const { players, switchTurns } = useGame();

    const handleDrop = (e) => {
        e.preventDefault();
        if (!isCurrentPlayer) return;

        const { card, cardId } = JSON.parse(e.dataTransfer.getData("card"));
        const isSpy = card.category?.some(category => category?.en === "spy");

        if (isSpy && isCurrentPlayer) {
            return;
        }

        onCardPlay(card, cardId);
    };

    return (
        <div
            className={`board-battlefield${isCurrentPlayer ? "" : " disabled"}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            {cards.map((card, index) => {
                const factionColors = getColors(card.faction);
                return (
                    <div key={index} className="board-card">
                        <CardTitle card={card} colors={factionColors} />
                        <CardDescription skills={card?.skills} colors={factionColors} />
                    </div>
                );
            })}
        </div>
    );
};