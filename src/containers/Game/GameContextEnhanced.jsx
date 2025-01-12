// Enhanced GameContext.js
import { createContext, useContext, useReducer } from 'react';

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CARD':
            return updateCardInState(state, action.payload);
        case 'REMOVE_CARD':
            return removeCardFromState(state, action.payload);
        case 'ADD_CARD':
            return addCardToState(state, action.payload);
        case 'UPDATE_POINTS':
            return updatePointsInState(state, action.payload);
        // Add more cases as needed
        default:
            return state;
    }
};

export function GameProvider({ children }) {
    const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

    const executeSkill = async (playerId, cardId, targetIds) => {
        const card = findCardInState(gameState, cardId);
        const skills = findCardSkills(card);

        if (!skills) return;

        for (const skill of skills) {
            const targets = await resolveTargets(skill.targetType, targetIds, gameState);
            const effect = skillEffects[skill.type];

            if (effect) {
                for (const target of targets) {
                    const action = effect(target, skill.value);
                    dispatch(action);
                }
            }

            // Handle any post-skill effects
            dispatch({
                type: 'UPDATE_POINTS',
                payload: { playerId }
            });
        }
    };

    const playCard = async (playerId, card, handCardId, targetIds = []) => {
        // First place the card
        dispatch({
            type: 'ADD_CARD',
            payload: { playerId, card }
        });

        // Remove from hand
        dispatch({
            type: 'REMOVE_FROM_HAND',
            payload: { playerId, handCardId }
        });

        // Execute card skills if any
        await executeSkill(playerId, card._id, targetIds);

        // Update costs
        dispatch({
            type: 'UPDATE_COST',
            payload: {
                playerId,
                cost: card.level
            }
        });
    };

    return (
        <GameContext.Provider value={{
            gameState,
            dispatch,
            executeSkill,
            playCard,
            // ... other methods
        }}>
            {children}
        </GameContext.Provider>
    );
}