// GameInfo.js
import React from 'react';
import "./styles/game-info.scss";

export const GameInfo = ({
    player,
    isCurrentPlayer,
    onEndTurn,
    onViewDeck,
    currentTurn,
    totalTurns
}) => {
    return (
        <div className="game-board-aside">
            {isCurrentPlayer && (
                <div className="neo-box" onClick={onEndTurn}>
                    END TURN
                </div>
            )}

            <div className="game-board-info">
                {`POINTS: ${player.points}`}
            </div>

            <div className="game-board-info">
                {`TURN: ${currentTurn} / ${totalTurns}`}
            </div>

            <div className="game-board-info">
                {`MULLIGANS: ${player.muligan} / 3`}
            </div>

            <div className="game-board-info">
                {`TURN COST: ${player.cost.current} / ${player.cost.total}`}
            </div>

            <div className="game-board-graveyard">
                GRAVEYARD
            </div>

            {isCurrentPlayer && (
                <div className="game-board-deck neo-box" onClick={onViewDeck}>
                    {`DECK: ${player.currentDeck?.length}`}
                </div>
            )}
        </div>
    );
};