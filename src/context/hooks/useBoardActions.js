export function useBoardActions() {

    const calculateDropIndex = (e, playerId) => {
        const boardElement = e.currentTarget;
        const children = Array.from(boardElement.children);
        const { clientX } = e;
        for (let i = 0; i < children.length; i++) {
            const rect = children[i].getBoundingClientRect();
            if (clientX < rect.left + rect.width / 2) {
                return i;
            }
        }

        return children.length;
    };

    const handleCardOrder = (e, playerId, draggedIndex) => {
        e.preventDefault();
        const source = e.dataTransfer.getData("source");

        if (source === "hand") {
            const card = players[playerId].hand[data.cardIndex];
            updatePlayerState(playerId, "hand", players[playerId].hand.filter((_, i) => i !== data.cardIndex));

            const dropIndex = calculateDropIndex(e, playerId);
            const newBoard = [...players[playerId].board];
            newBoard.splice(dropIndex, 0, card);

            updatePlayerState(playerId, "board", newBoard);
        } else if (source === "board") {
            const dropIndex = calculateDropIndex(e, playerId);

            if (draggedIndex !== dropIndex) {
                const board = [...players[playerId].board];
                const [draggedCard] = board.splice(draggedIndex, 1);
                board.splice(dropIndex, 0, draggedCard);
                updatePlayerState(playerId, "board", board);
            }
        }
    };

    return { handleCardOrder }
}