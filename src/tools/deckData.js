export const analyzeDeck = (deck) => {
    const analysis = deck.reduce((result, card) => {
        const cardFaction = card.data?.faction; // The entire faction object
        const cardLevel = card.level;
        const cardAmount = card.amount || 1; // Default to 1 if no `amount` is specified

        if (cardFaction) {
            // Find existing faction analysis entry
            const existingFaction = result.find(faction =>
                Object.entries(cardFaction).every(
                    ([key, value]) => faction.faction[key] === value
                )
            );

            if (existingFaction) {
                // Increment card amount and update levels
                existingFaction.amount += cardAmount;
                existingFaction.levels[cardLevel] =
                    (existingFaction.levels[cardLevel] || 0) + cardAmount;
            } else {
                // Add new faction entry
                result.push({
                    faction: cardFaction,
                    amount: cardAmount,
                    levels: { [cardLevel]: cardAmount }
                });
            }
        }

        return result;
    }, []);

    return analysis;
};