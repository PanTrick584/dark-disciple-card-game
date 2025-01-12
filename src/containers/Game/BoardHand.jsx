// BoardHand.js (refactored)
import React, { useState } from "react";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
import "./styles/board-hand.scss";

export const BoardHand = ({
    playerId,
    getColors,
    onCardPlay
}) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const {
        currentPlayer,
        players,
        updatePlayerState
    } = useGame();

    const player = players[playerId];
    const isCurrentPlayer = currentPlayer === playerId;
    const cards = player.hand;

    const calculateTransform = (index, cardCount, isHovered, isSelected) => {
        const isPlayerOne = playerId === "player_1";
        const spreadAngle = isPlayerOne ? 30 : -30;
        const startAngle = -spreadAngle / 2;
        const angleStep = cardCount > 1 ? spreadAngle / (cardCount - 1) : 0;
        const angle = startAngle + index * angleStep;

        const elevation = -Math.pow(index - (cardCount - 1) / 2, isPlayerOne ? 2 : 2)
            + Math.pow((cardCount - 1) / 6, -1);

        let transform = `translateY(${elevation * (isPlayerOne ? -2 : 2)}px) scale(.6)`;

        if (!isHovered && !isSelected) {
            transform += ` rotate(${angle}deg)`;
        }

        if (isHovered || isSelected) {
            transform += ` scale(${isSelected ? 2.2 : 2.1}) translateY(${isPlayerOne ? "-50px" : "50px"}) translateX(70px)`;
        }

        return transform;
    };

    const handleCardClick = (card, cardId) => {
        if (player.muligan < 3) {
            // Handle mulligan
            const oldCard = cards[cardId];
            const [newCard, ...remainingDeck] = player.currentDeck;

            const newHand = [...cards];
            newHand[cardId] = newCard;

            const newDeck = [...remainingDeck];
            const randomIndex = Math.floor(Math.random() * newDeck.length);
            newDeck.splice(randomIndex, 0, oldCard);

            updatePlayerState(playerId, 'hand', newHand);
            updatePlayerState(playerId, 'currentDeck', newDeck);
            updatePlayerState(playerId, 'muligan', player.muligan + 1);
        } else if (isCurrentPlayer) {
            if (selectedCard?.id === cardId) {
                setSelectedCard(null);
                onCardPlay(card, cardId);
            } else {
                setSelectedCard({ id: cardId, card });
            }
        }
    };

    const handleDragStart = (e, card, cardId) => {
        if (!isCurrentPlayer) return;
        e.dataTransfer.setData("card", JSON.stringify({ card, cardId }));
    };

    return (
        <div className={`game-board-hand${playerId === "player_2" ? " move-down" : ""}`}>
            {cards?.map((card, index) => {
                const factionColors = getColors(card.faction);
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
                        onDragStart={(e) => handleDragStart(e, card, index)}
                        onMouseEnter={() => isCurrentPlayer && setHoveredCard(index)}
                        onMouseLeave={() => isCurrentPlayer && setHoveredCard(null)}
                    >
                        <CardTitle card={card} colors={factionColors} />
                        <CardDescription skills={card?.skills} colors={factionColors} />
                    </div>
                );
            })}
        </div>
    );
};