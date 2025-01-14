// GameInfo.js
import React from 'react';
import { useGame } from '../../context/GameContext';
// import "./styles/game-info.scss";

export const GameInfo = ({ playerId, isCurrentPlayer, onViewDeck }) => {
    const { players, switchTurns } = useGame();

    return (
        <div className="game-board-aside">
            {isCurrentPlayer && (
                <div className="neo-box" onClick={switchTurns}>
                    END TURN
                </div>
            )}

            <div className="game-board-info">
                {`POINTS: ${players[playerId].points}`}
            </div>

            <div className="game-board-info">
                {`TURN: ${players[playerId].currentTurn} / 14`}
            </div>

            <div className="game-board-info">
                {`MULLIGANS: ${players[playerId].muligan} / 3`}
            </div>

            <div className="game-board-info">
                {`TURN COST: ${players[playerId].cost.current} / 7`}
            </div>

            <div className="game-board-graveyard">
                GRAVEYARD
            </div>

            {isCurrentPlayer && (
                <div className="game-board-deck neo-box" onClick={onViewDeck}>
                    {`DECK: ${players[playerId].currentDeck?.length}`}
                </div>
            )}
        </div>
    );
};