// Enhanced GameBoard.js
export const GameBoard = ({ playerId }) => {
    const { gameState, executeSkill, playCard } = useGame();
    const [selectedTargets, setSelectedTargets] = useState([]);
    const [activeSkill, setActiveSkill] = useState(null);

    const handleCardPlay = async (card, handCardId) => {
        if (card.skills && requiresTargets(card.skills)) {
            setActiveSkill({ card, handCardId });
            return;
        }

        await playCard(playerId, card, handCardId);
    };

    const handleCardSelect = (cardId) => {
        if (!activeSkill) return;

        setSelectedTargets(prev => [...prev, cardId]);

        if (hasEnoughTargets(activeSkill.card.skills, selectedTargets)) {
            playCard(playerId, activeSkill.card, activeSkill.handCardId, selectedTargets);
            setActiveSkill(null);
            setSelectedTargets([]);
        }
    };

    return (
        <div className="game-board">
            <BoardField
                cards={gameState[playerId].board}
                isTargeting={!!activeSkill}
                onCardSelect={handleCardSelect}
                selectedTargets={selectedTargets}
            />
            <BoardHand
                playerId={playerId}
                onCardPlay={handleCardPlay}
            />
            {/* ... other components */}
        </div>
    );
};