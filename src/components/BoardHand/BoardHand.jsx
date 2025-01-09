import React, { useState } from "react";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
// import "./styles/hand.scss";

export const BoardHand = ({
    cards,
    mulligan,
    selectedCard,
    mulliganCard,
    playCard,
    setSelectedCard,
    onDragStart,
    colors,
    yourTurn
}) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const calculateTransform = (index, cardCount, isHovered, isSelected) => {
        const spreadAngle = 30; // Total angle for the fan
        const startAngle = -spreadAngle / 2; // Start angle
        const angleStep = cardCount > 1 ? spreadAngle / (cardCount - 1) : 0;
        const angle = startAngle + index * angleStep;

        // Parabolic elevation for "hand" effect
        const elevation = -Math.pow(index - (cardCount - 1) / 2, 2) + Math.pow((cardCount - 1) / 2, 2);

        // If hovered or selected, remove the rotation
        let transform = `translateY(${elevation * -2}px)`;
        if (!isHovered && !isSelected) {
            transform += ` rotate(${angle}deg)`;
        }

        // Apply hover or selection effects
        if (isHovered || isSelected) {
            transform += ` scale(${isSelected ? 1.2 : 1.1}) translateY(-50px)`;
        }

        return transform;
    };

    const handleCardClick = (card, cardId) => {
        if (mulligan < 3) {
            mulliganCard(cardId);
        } else {
            if (!yourTurn) return;

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

    return (
        <div className="game-board-hand">
            {cards?.map((card, index) => {
                const factionColors = colors(card.faction);
                const isSelected = selectedCard?.id === index;
                const isHovered = hoveredCard === index;

                return (
                    <div
                        key={index}
                        className={`hand-card${yourTurn ? "" : " disabled"}`}
                        style={{
                            transform: calculateTransform(index, cards.length, isHovered, isSelected),
                            zIndex: isSelected || isHovered ? 999 : index,
                        }}
                        draggable={yourTurn}
                        onClick={() => handleCardClick(card, index)}
                        onDragStart={yourTurn ? (e) => onDragStart(e, card, index) : undefined}
                        onMouseEnter={yourTurn ? () => setHoveredCard(index) : undefined}
                        onMouseLeave={yourTurn ? () => setHoveredCard(null) : undefined}
                    >
                        <CardTitle card={card} colors={factionColors} />
                        <CardDescription skills={card?.skills} colors={factionColors} />
                    </div>
                );
            })}
        </div>
    );
};