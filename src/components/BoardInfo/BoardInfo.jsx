import { useGame } from "../../context/GameContext";

export const BoardInfo = ({ playerId }) => {
    const {
        currentPlayer,
        startGame,
    } = useGame();

    return (
        <div className="board-info">
            <div className="game-board-info">
            </div>
            <div className="game-board-info">
                {/* {ownMuligan < 3 ? "MULLIGAN!" : "PLAY"} */}
            </div>
            <div className="game-board-info">
                {currentPlayer === playerId && startGame && "Your turn!"}
            </div>
            <div className="game-board-info">
            </div>
        </div>
    )
}