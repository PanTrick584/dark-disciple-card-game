import { createContext, useContext, useEffect, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
    // START GAME
    const [startGame, setStartGame] = useState(false);
    // MULLIGAN
    const [playerOneMuligan, setPlayerOneMuligan] = useState(0);
    const [playerTwoMuligan, setPlayerTwoMuligan] = useState(0);

    // AFTER MULLIGANS START GAME
    // useEffect(() => {
    //     if (playerOneMuligan !== 3 || playerTwoMuligan !== 3) return;
    //     setStartGame(true)
    // }, [playerOneMuligan, playerTwoMuligan])

    // EXAMPLE FUNCTIONS
    // const login = (userData) => setGamePath(userData);
    // const logout = () => setGamePath(false);

    return (
        <GameContext.Provider
            value={{
                startGame, setStartGame,
                playerOneMuligan, setPlayerOneMuligan,
                playerTwoMuligan, setPlayerTwoMuligan
            }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);