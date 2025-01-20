import React, { useContext, useEffect, useState } from "react";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
import "./styles/board-hand.scss";
import { useGame } from "../../context/GameContext";
import { AppContext } from "../../context/AppContext";
import { themes } from "../../consts/themes";

export const GameHand = ({
    playCard,
    onDragStart,
    playerId,
}) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const {
        currentPlayer,
        players,
        muliganCard,
        muliganEnable,
        setMuliganEnable,
        showPopupMessage
    } = useGame();

    const { language } = useContext(AppContext);

    const player = players[playerId];
    const isCurrentPlayer = currentPlayer === playerId;
    const cards = player.hand;

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest(".hand-card")) setSelectedCard(null);
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);


    const colors = (factionName) => {
        let factionColors;
        const theme = Object.values(themes).find(theme => theme.faction[language] === factionName.replace("-", " "));

        if (theme) {
            factionColors = {
                themeMain: theme.themeMain,
                themeAccent: theme.themeAccent,
                themeAccentAlt: theme.themeAccentAlt,
            };
        }
        return factionColors;
    }

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
        if (player.muligan < 3 && isCurrentPlayer) {
            muliganCard(cardId);
            if (player.muligan === 2 && muliganEnable) {
                setMuliganEnable(false);
                showPopupMessage(playerId, "Lets start the GAME!", 1000)
            }
        } else {
            console.log(muliganEnable);

            if (!isCurrentPlayer) return;

            // if () showPopupMessage(playerId, "Lets start GAME!")

            if (selectedCard?.id === cardId) {
                setSelectedCard(null);
                playCard(playerId, card, cardId);
            } else {
                setSelectedCard({ id: cardId, card });
            }
        }
    };

    return (
        <div className={`game-board-hand${playerId === "player_1" ? " down" : ""}`}>
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