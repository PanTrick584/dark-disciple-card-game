import { SKILL_EXECUTION, SKILL_TYPES, TARGET_TYPES, CARD_CATEGORY } from './gameConstants';

// Skill execution strategy pattern


// Target selection utility
// function selectTargets(targetType, players, currentPlayerId, opponentId) {
//     switch (targetType.type) {
//         case TARGET_TYPES.ENEMY_SINGLE:
//             return [players[opponentId].board[0]]; // Example: first enemy card
//         case TARGET_TYPES.ENEMY_ALL:
//             return players[opponentId].board;
//         case TARGET_TYPES.ALLY_SINGLE:
//             return [players[currentPlayerId].board[0]]; // Example: first ally card
//         // Add more target selection logic
//         default:
//             return [];
//     }
// }

// Condition check utility
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

// Main card skill execution function
function executeCardSkills(card, players, currentPlayerId, opponentId) {
    if (!Array.isArray(card.skills)) return card;

    return card.skills.reduce((updatedCard, skill) => {
        const executionStrategy = skillExecutionStrategies[skill.execution];

        if (executionStrategy) {
            // Interactive targeting for skills that require player selection
            if (requiresPlayerTargeting(skill)) {
                return initiatePlayerTargeting(skill, updatedCard, players, currentPlayerId, opponentId);
            }

            // Automatic execution for skills without targeting
            return executionStrategy(skill, updatedCard, players, currentPlayerId, opponentId);
        }

        return updatedCard;
    }, card);
}

// Targeting interaction management
// function requiresPlayerTargeting(skill) {
//     // Define skills that need manual player targeting
//     const manualTargetSkills = [
//         TARGET_TYPES.ALLY_SINGLE,
//         TARGET_TYPES.ENEMY_SINGLE,
//         // Add more skills requiring manual targeting
//     ];

//     return manualTargetSkills.includes(skill.targetType.type);
// }

// function initiatePlayerTargeting(skill, card, players, currentPlayerId, opponentId) {
//     // Trigger UI for player to select target
//     // This would typically involve setting game state to "targeting mode"
//     return {
//         ...card,
//         pendingSkill: skill,
//         targetingInProgress: true
//     };
// }

// Example usage in a React component
// function CardPlayComponent() {
//     const [players, setPlayers] = useState(initialPlayersState);
//     const [currentTargetingSkill, setCurrentTargetingSkill] = useState(null);

//     const playCard = (card) => {
//         const updatedCard = executeCardSkills(card, players, currentPlayerId, opponentId);

//         if (updatedCard.targetingInProgress) {
//             setCurrentTargetingSkill(updatedCard.pendingSkill);
//             // Render targeting UI
//         } else {
//             // Update players state with card effects
//             setPlayers(updatePlayersState(updatedCard));
//         }
//     };

//     const handleTargetSelection = (selectedTarget) => {
//         // Complete skill execution after target selection
//         const finalCard = applySelectedTarget(currentTargetingSkill, selectedTarget);
//         setPlayers(updatePlayersState(finalCard));
//         setCurrentTargetingSkill(null);
//     };

//     return (
//     // Render game components with targeting logic
//   );
// }