// GamePage.js (simplified)
const GamePage = () => {
    const {
        playGame,
        setPlayGame,
        players,
        updatePlayerState
    } = useGame();

    return (
        <div className="game">
            {!playGame ? (
                // Deck selection UI
                <DeckSelectionUI
                    players={players}
                    updatePlayerState={updatePlayerState}
                    setPlayGame={setPlayGame}
                />
            ) : (
                // Game boards
                <>
                    <GameBoard playerId="player_2" />
                    <div className="game-border" />
                    <GameBoard playerId="player_1" />
                </>
            )}
        </div>
    );
};