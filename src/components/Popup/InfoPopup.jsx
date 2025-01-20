import { useGame } from "../../context/GameContext";

export const InfoPopup = ({ playerId }) => {
    const { popupMessages } = useGame();

    return (
        popupMessages[playerId] && (
            <div className="game-board-popup">
                <div className="game-board-popup-text">
                    {popupMessages[playerId]}
                </div>
            </div>
        )
    );
};