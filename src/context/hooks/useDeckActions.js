import { useCallback } from "react";
import { fetchChosenCards } from "../../api/fetchCards";
import { shuffleArray } from "../utils/shuffleArray";

export function useDeckActions({ players, updatePlayerState }) {

    const initializeDeck = useCallback(async (cards, player) => {
        const ids = cards.map(card => card.id);

        try {
            const data = await fetchChosenCards(ids);
            const newEditDeck = cards
                .map(deckCard => {
                    const cardData = data.data.find(card => card._id === deckCard.id);
                    return cardData ? Array(deckCard.amount).fill(cardData) : null;
                })
                .flat()
                .filter(Boolean);

            const shuffledDeck = shuffleArray(newEditDeck);
            const initialHand = shuffledDeck.splice(0, 10);

            updatePlayerState(player, "currentDeck", shuffledDeck);
            updatePlayerState(player, "hand", initialHand);
        } catch (error) {
            console.error('Error initializing deck:', error);
        }
    }, [players]);

    return { initializeDeck }
}