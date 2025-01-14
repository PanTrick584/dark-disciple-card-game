import React, { useContext, useState } from "react";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
import "./styles/board-hand.scss";
import { useGame } from "../../context/GameContext";
import { AppContext } from "../../context/AppContext";

export const GameHand = ({
    playCard,
    onDragStart,
    colors,
    playerId,
}) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const {
        currentPlayer,
        players,
        muliganCard
    } = useGame();
    const { language } = useContext(AppContext);

    const player = players[playerId];
    const isCurrentPlayer = currentPlayer === playerId;
    const cards = player.hand;

    const calculateTransform = (index, cardCount, isHovered, isSelected) => {
        const playerOne = playerId === "player_1";
        const spreadAngle = playerOne ? 30 : -30;
        const startAngle = -spreadAngle / 2;
        const angleStep = cardCount > 1 ? spreadAngle / (cardCount - 1) : 0;
        const angle = startAngle + index * angleStep;

        const elevation = -Math.pow(index - (cardCount - 1) / 2, playerOne ? 2 : 2) + Math.pow((cardCount - 1) / 6, -1);

        let transform = `translateY(${elevation * (playerOne ? -2 : 2)}px) scale(.6)`;
        if (!isHovered && !isSelected) {
            transform += ` rotate(${angle}deg)`;
        }

        if (isHovered || isSelected) {
            transform += ` scale(${isSelected ? 2.2 : 2.1}) translateY(${playerOne ? "-50px" : "50px"}) translateX(70px)`;
        }

        return transform;
    };

    const handleCardClick = (card, cardId) => {
        if (player.muligan < 3) {
            muliganCard(cardId);
        } else {
            if (!isCurrentPlayer) return;

            if (selectedCard?.id === cardId) {
                setSelectedCard(null);
                playCard(playerId, card, cardId);
            } else {
                setSelectedCard({ id: cardId, card });
            }
        }
    };

    return (
        <div className={`game-board-hand${player === "player_2" ? " move-down" : ""}`}>
            {cards?.map((card, index) => {
                const factionColors = colors(card?.faction[language]);
                const isSelected = selectedCard?.id === index;
                const isHovered = hoveredCard === index;

                return (
                    <div
                        key={index}
                        className={`hand-card${isCurrentPlayer ? "" : " disabled"}`}
                        style={{
                            transform: calculateTransform(index, cards.length, isHovered, isSelected),
                            zIndex: isSelected || isHovered ? 999 : index,
                        }}
                        draggable={isCurrentPlayer}
                        onClick={() => handleCardClick(card, index)}
                        onDragStart={isCurrentPlayer ? (e) => onDragStart(e, card, index) : undefined}
                        onMouseEnter={isCurrentPlayer ? () => setHoveredCard(index) : undefined}
                        onMouseLeave={isCurrentPlayer ? () => setHoveredCard(null) : undefined}
                    >
                        <CardTitle card={card} colors={factionColors} />
                        <CardDescription skills={card?.skills} colors={factionColors} />
                    </div>
                );
            })}
        </div>
    );
};