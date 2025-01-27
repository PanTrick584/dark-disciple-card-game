import { findCardSkills } from "../../cardSkills/findCard";
import { SKILL_EXECUTION, TARGET_TYPES } from "../../containers/Game/types";

export function useCardActions({
    players,
    currentPlayer,
    updatePlayerState,
    showPopupMessage,
    switchTurns
}) {
    const muliganCard = (cardId) => {
        const oldHandCard = players[currentPlayer].hand[cardId];
        const randomIndex = Math.floor(Math.random() * (players[currentPlayer].currentDeck.length + 1));
        const [newDeckCard] = players[currentPlayer].currentDeck.splice(0, 1);

        players[currentPlayer].currentDeck.splice(randomIndex, 0, oldHandCard);

        const newHandCards = [...players[currentPlayer].hand];
        newHandCards[cardId] = newDeckCard;
        const newDeck = [...players[currentPlayer].currentDeck];

        updatePlayerState(currentPlayer, "hand", newHandCards)
        updatePlayerState(currentPlayer, "currentDeck", newDeck)
        updatePlayerState(currentPlayer, "muligan", players[currentPlayer].muligan + 1)
    };

    const selectTargets = (targetType, players, currentPlayerId, opponentId) => {
        switch (targetType.type) {
            case TARGET_TYPES.ENEMY_SINGLE:
                return [players[opponentId].board[0]]; // Example: first enemy card
            case TARGET_TYPES.ENEMY_ALL:
                return players[opponentId].board;
            case TARGET_TYPES.ALLY_SINGLE:
                return [players[currentPlayerId].board[0]]; // Example: first ally card
            // Add more target selection logic
            default:
                return [];
        }
    }

    function shouldExecuteSkill(skill, card) {
        // Check skill conditions
        switch (skill.condition.type) {
            case CARD_CATEGORY.SOURCE:
                return card.category === skill.condition.type;
            // Add more condition checks
            default:
                return true;
        }
    }

    // Skill effect application
    function applySkillEffect(skill, target) {
        switch (skill.skillType.type) {
            case SKILL_TYPES.BOOST:
                target.stats.boost += skill.skillType.value;
                break;
            // Add more skill type effects
        }
    }

    function initiatePlayerTargeting(skill, card, players, currentPlayerId, opponentId) {
        // Trigger UI for player to select target
        // This would typically involve setting game state to "targeting mode"
        return {
            ...card,
            pendingSkill: skill,
            targetingInProgress: true
        };
    }

    const skillExecutionStrategies = {
        [SKILL_EXECUTION.PLAY]: (skill, card, players, playerId, opponentId) => {
            // Generic play skill execution
            // const updatedCard = updateCard(skill, card);
            console.log(SKILL_EXECUTION.PLAY);
            // Target selection logic
            const targets = selectTargets(skill.targetType, players, playerId, opponentId);

            // Conditional execution
            if (shouldExecuteSkill(skill, card)) {
                targets.forEach(target => {
                    applySkillEffect(skill, target);
                });
            }

            return updatedCard;
        },

        [SKILL_EXECUTION.PREPARATION]: (skill, card, players, playerId, opponentId) => {
            // Preparation skill logic
            // const updatedCard = updateCard(skill, card);
            const updatedCard = SKILL_EXECUTION.PREPARATION
            console.log(SKILL_EXECUTION.PREPARATION);
            // Add specific preparation effects
            return updatedCard;
        },

        [SKILL_EXECUTION.CYCLE]: (skill, card, players, playerId, opponentId) => {
            // Cycle skill logic
            // const updatedCard = updateCard(skill, card);
            const updatedCard = SKILL_EXECUTION.CYCLE
            console.log(SKILL_EXECUTION.CYCLE);
            // Add specific cycle effects
            return updatedCard;
        }
    };

    const requiresPlayerTargeting = (skill) => {
        const manualTargetSkills = [
            TARGET_TYPES.ALLY_SINGLE,
            TARGET_TYPES.ENEMY_SINGLE,
        ];

        return manualTargetSkills.includes(skill.targetType.type);
    }

    const executeCardSkills = (card, players, playerId, opponentId) => {
        if (!Array.isArray(card.skillsSchema)) return card;
        console.log(card.skillsSchema);
        return card.skillsSchema.reduce((updatedCard, skill) => {
            const executionStrategy = skillExecutionStrategies[skill.execution];

            if (executionStrategy) {
                // Interactive targeting for skills that require player selection
                if (requiresPlayerTargeting(skill)) {
                    return initiatePlayerTargeting(skill, updatedCard, players, playerId, opponentId);
                }

                // Automatic execution for skills without targeting
                return executionStrategy(skill, updatedCard, players, playerId, opponentId);
            }

            return updatedCard;
        }, card.skillsSchema);
    }

    const playCard = (playerId, card, handCardId) => {
        const opponentId = playerId === 'player_1' ? 'player_2' : 'player_1';
        const isSpy = card.category?.some((category) => category?.en === "spy");
        const skillType = card.skills?.map((skill) => skill?.type.map(type => type.en));
        const cardSkills = findCardSkills(card);

        card.skillsSchema = cardSkills;

        const updateCard = (skill) => ({ ...card, [skill.execution]: skill, turnPlayed: players[playerId].currentTurn })
        executeCardSkills(card, players, playerId, opponentId);

        // if (Array.isArray(cardSkills)) {
        //     cardSkills?.forEach((skill, skillId) => {
        //     })
        // }

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