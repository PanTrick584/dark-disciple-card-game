import React, { useState } from "react";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
// import "./styles/hand.scss";

export const BoardHand = ({
    cards,
    selectedCard,
    onCardClick,
    onDragStart,
    colors,
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

    return (
        <div className="game-board-hand">
            {cards?.map((card, index) => {
                const factionColors = colors(card.faction);
                const isSelected = selectedCard?.id === index;
                const isHovered = hoveredCard === index;

                return (
                    <div
                        key={index}
                        className={`hand-card`}
                        style={{
                            transform: calculateTransform(index, cards.length, isHovered, isSelected),
                            zIndex: isSelected || isHovered ? 999 : index,
                        }}
                        draggable
                        onClick={() => onCardClick(card, index)}
                        onDragStart={(e) => onDragStart(e, card, index)}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <CardTitle card={card} colors={factionColors} />
                        <CardDescription skills={card?.skills} colors={factionColors} />
                    </div>
                );
            })}
        </div>
    );
};