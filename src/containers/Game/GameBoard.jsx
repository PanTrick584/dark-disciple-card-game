// Updated GameBoard.js
export const GameBoard = ({ playerId }) => {
    const {
        currentPlayer,
        players,
        turns,
        switchTurns,
        playCard
    } = useGame();

    const [isDeckVisible, setIsDeckVisible] = useState(false);

    const isCurrentPlayer = currentPlayer === playerId;
    const player = players[playerId];

    const getColors = (factionName) => {
        // Your existing colors function implementation
    };

    const handleCardPlay = (card, handCardId) => {
        if (!isCurrentPlayer) return;
        const success = playCard(playerId, card, handCardId);
        if (success && player.cost.current >= 7) {
            switchTurns();
        }
    };

    return (
        <div className="game-board">
            <div className="game-board-container">
                <BoardField
                    cards={player.board}
                    isCurrentPlayer={isCurrentPlayer}
                    onCardPlay={handleCardPlay}
                    getColors={getColors}
                />

                <BoardHand
                    playerId={playerId}
                    getColors={getColors}
                    onCardPlay={handleCardPlay}
                />

                <GameInfo
                    player={player}
                    isCurrentPlayer={isCurrentPlayer}
                    onEndTurn={switchTurns}
                    onViewDeck={() => setIsDeckVisible(true)}
                    currentTurn={turns.current}
                    totalTurns={turns.total}
                />
            </div>

            {isDeckVisible && (
                <DeckViewer
                    deck={player.currentDeck}
                    onClose={() => setIsDeckVisible(false)}
                    getColors={getColors}
                />
            )}
        </div>
    );
};