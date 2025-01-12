// skillEffects.js
export const skillEffects = {
    [SKILL_TYPES.DAMAGE]: (target, value) => ({
        type: 'UPDATE_CARD',
        payload: {
            cardId: target.id,
            updates: {
                strength: Math.max(0, target.strength - value)
            }
        }
    }),

    [SKILL_TYPES.BOOST]: (target, value) => ({
        type: 'UPDATE_CARD',
        payload: {
            cardId: target.id,
            updates: {
                strength: target.strength + value
            }
        }
    }),

    // Add more effect implementations
};