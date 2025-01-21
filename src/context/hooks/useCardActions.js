import { findCardSkills } from "../../cardSkills/findCard";

export function useCardActions({
    players,
    currentPlayer,
    updatePlayerState,
    showPopupMessage,
    switchTurns
}) {
    const muliganCard = (cardId) => {
        const oldHandCard = players[currentPlayer].hand[cardId];
        const [newDeckCard] = players[currentPlayer].currentDeck.splice(0, 1);
        const newHandCards = [...players[currentPlayer].hand];
        newHandCards[cardId] = newDeckCard;

        // TODO: PLACE CARD AT RANDO IN DECK
        // const randomIndex = Math.floor(Math.random() * (player.currentDeck.length + 1));
        // const newDeck = player.currentDeck.splice(randomIndex, 0, oldHandCard);
        const newDeck = [...players[currentPlayer].currentDeck, oldHandCard];

        updatePlayerState(currentPlayer, "hand", newHandCards)
        updatePlayerState(currentPlayer, "currentDeck", newDeck)
        updatePlayerState(currentPlayer, "muligan", players[currentPlayer].muligan + 1)
    };

    const playCard = (playerId, card, handCardId) => {
        const opponentId = playerId === 'player_1' ? 'player_2' : 'player_1';
        console.log(playerId);
        console.log(opponentId);
        const isSpy = card.category?.some((category) => category?.en === "spy");

        const cardSkills = findCardSkills(card);
        console.log(cardSkills);

        // TODO: if spy card is dragged on ally board, popup should inform about need to play it on the oposit board
        if (isSpy) {
            if (currentPlayer !== playerId) {
                const newCost = players[opponentId]?.cost?.current + card.level;

                console.log("drag spy!");
                if (newCost > 7) {
                    handlePopup("Not enough Cost Points!");
                    return;
                }

                if (newCost === 7) {
                    switchTurns(playerId);
                }

                updatePlayerState(opponentId, 'cost', { ...opponentId.cost, current: newCost });

                const newBoardCards = [...players[playerId]?.board, card];
                updatePlayerState(playerId, 'board', newBoardCards);

                const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
                updatePlayerState(playerId, 'points', newPoints);

                const newHand = players[opponentId].hand.filter((_, id) => id !== handCardId);
                updatePlayerState(opponentId, 'hand', newHand);
            } else {
                const newCost = players[playerId]?.cost?.current + card.level;

                console.log("click spy!");
                if (newCost > 7) {
                    showPopupMessage(playerId, "Not enough Cost Points!");
                    return;
                }

                if (newCost === 7) {
                    showPopupMessage(playerId, "End of turn!");
                    switchTurns(playerId);
                }

                updatePlayerState(playerId, 'cost', { ...playerId.cost, current: newCost });

                const newBoardCards = [...players[opponentId]?.board, card];
                updatePlayerState(opponentId, 'board', newBoardCards);


                const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
                updatePlayerState(opponentId, 'points', newPoints);

                const newHand = players[playerId].hand.filter((_, id) => id !== handCardId);
                updatePlayerState(playerId, 'hand', newHand);
            }
            return;
        }


        if (currentPlayer !== playerId) {
            showPopupMessage(opponentId, "stop druging cards on opponents board!");
            return;
        }

        if (currentPlayer === playerId) {
            console.log("regular card!");
            // return;
        }

        console.log("no spy");
        const newCost = players[playerId]?.cost?.current + card?.level;

        if (newCost > 7) {
            showPopupMessage(playerId, "Not enough Cost Points!");
            return;
        }

        if (newCost === 7) {
            // handlePopup("End of turn!");
            switchTurns(playerId);
        }

        updatePlayerState(playerId, 'cost', { ...playerId.cost, current: newCost });

        const newBoardCards = [...players[playerId]?.board, card];
        updatePlayerState(playerId, 'board', newBoardCards);

        const newPoints = newBoardCards.reduce((sum, c) => sum + c.strength, 0);
        updatePlayerState(playerId, 'points', newPoints);

        const newHand = players[playerId]?.hand.filter((_, id) => id !== handCardId);
        updatePlayerState(playerId, 'hand', newHand);
    };

    return { muliganCard, playCard }
}