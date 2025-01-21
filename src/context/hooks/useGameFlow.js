import { useState, useCallback } from 'react';

export function useGameFlow({ currentPlayer, setCurrentPlayer }) {
    const [startGame, setStartGame] = useState(false);
    const [playGame, setPlayGame] = useState(false);
    const [muliganEnable, setMuliganEnable] = useState(true);
    const [popupMessages, setPopupMessages] = useState({
        player_1: null,
        player_2: null,
    });

    const showPopupMessage = useCallback((playerId, message, duration = 500) => {
        setPopupMessages((prev) => ({
            ...prev,
            [playerId]: message,
        }));

        setTimeout(() => {
            setPopupMessages((prev) => ({
                ...prev,
                [playerId]: null,
            }));
        }, duration);
    }, []);

    const switchTurns = useCallback(() => {
        const nextPlayer = currentPlayer === "player_1" ? "player_2" : "player_1";
        showPopupMessage(currentPlayer, "End of turn!");
        showPopupMessage(nextPlayer, "Your turn!");
        setCurrentPlayer(nextPlayer);
    }, [currentPlayer, showPopupMessage, setCurrentPlayer]);

    return {
        startGame,
        setStartGame,
        playGame,
        setPlayGame,
        popupMessages,
        showPopupMessage,
        muliganEnable,
        setMuliganEnable,
        switchTurns
    };
}