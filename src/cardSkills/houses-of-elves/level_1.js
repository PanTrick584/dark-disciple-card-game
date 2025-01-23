import {
    CARD_CATEGORY,
    CARD_PLAYED,
    CARD_VALUES,
    SKILL_EXECUTION,
    SKILL_TYPES,
    TARGET_TYPES,
    VALUE_COMPARISON
} from "../../containers/Game/types";

const cardSkills = {
    "6759ccf075fc7e3b233510e5": [
        {
            execution: SKILL_EXECUTION.PLAY,
            skillType: {
                type: SKILL_TYPES.DAMAGE,
                value: 2
            },
            targetType: {
                type: TARGET_TYPES.ENEMY_SINGLE,
            },
            condition: {
                type: CARD_CATEGORY.SPY
            }
        }
    ],
    "6759ccf075fc7e3b233510e4": [
        {
            execution: SKILL_EXECUTION.PLAY,
            skillType: {
                type: SKILL_TYPES.DAMAGE,
                value: 2
            },
            targetType: {
                type: TARGET_TYPES.ALLY_SINGLE
            },
        }
    ],
    "6759ccf075fc7e3b233510e6": [
        {
            execution: SKILL_EXECUTION.PLAY,
            skillType: {
                type: SKILL_TYPES.DAMAGE,
                value: 4
            },
            targetType: {
                type: TARGET_TYPES.ENEMY_SINGLE
            },
            condition: {
                type: CARD_VALUES.COST,
                comparison: VALUE_COMPARISON.EQUAL,
                value: 0
            }
        }
    ],
    "6759ccf075fc7e3b233510e9": [
        {
            execution: SKILL_EXECUTION.CYCLE,
            skillType: {
                type: SKILL_TYPES.BOOST,
                value: 1
            },
            targetType: {
                type: TARGET_TYPES.SELF
            },
            condition: {
                type: CARD_VALUES.STRENGTH,
                targetType: TARGET_TYPES.ENEMY_ANY,
                comparison: VALUE_COMPARISON.EQUAL,
                value: 0
            }
        }
    ],
    "6759ccf075fc7e3b233510eb": [
        {
            execution: SKILL_EXECUTION.PLAY,
            skillType: {
                type: SKILL_TYPES.BOOST,
                value: 3
            },
            targetType: {
                type: TARGET_TYPES.ALLY_SINGLE,
            },
            condition: {
                type: CARD_CATEGORY.SOURCE,
            }
        },
        {
            execution: SKILL_EXECUTION.PREPARATION,
            skillType: {
                type: SKILL_TYPES.BOOST,
                value: 3
            },
            targetType: {
                type: TARGET_TYPES.ALLY_SINGLE,
            },
            condition: {
                type: CARD_CATEGORY.SOURCE,
            }
        }
    ],
    "6759ccf075fc7e3b233510ea": [
        {
            execution: SKILL_EXECUTION.PREPARATION,
            skillType: {
                type: SKILL_TYPES.DAMAGE,
                value: 2
            },
            targetType: {
                type: TARGET_TYPES.ENEMY_SINGLE
            },
            condition: {
                type: CARD_PLAYED.LAST_TURN
            }
        }
    ]
};

export const elvesLvl1 = (cardId) => {
    return cardSkills[cardId] || "No skills available for this card";
};