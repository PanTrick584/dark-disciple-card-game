import { CARD_CATEGORY, CARD_PLAYED, CARD_VALUES, SKILL_TYPES, TARGET_TYPES, VALUE_COMPARISON } from "../../containers/Game/types";

const cardSkills = {
    "6759ccf075fc7e3b233510e5": [
        {
            type: SKILL_TYPES.DAMAGE,
            targetType: TARGET_TYPES.ENEMY_SINGLE,
            value: 2,
            requirement: {
                type: CARD_CATEGORY.SPY
            }
        }
    ],
    "6759ccf075fc7e3b233510e4": [
        {
            type: SKILL_TYPES.DAMAGE,
            targetType: TARGET_TYPES.ALLY_SINGLE,
            value: 2,
        }
    ],
    "6759ccf075fc7e3b233510e6": [
        {
            type: SKILL_TYPES.DAMAGE,
            targetType: TARGET_TYPES.ENEMY_SINGLE,
            value: 4,
            condition: {
                type: CARD_VALUES.COST,
                comparison: VALUE_COMPARISON.EQUAL,
                value: 0
            }
        }
    ],
    "6759ccf075fc7e3b233510e9": [
        {
            type: SKILL_TYPES.BOOST,
            targetType: TARGET_TYPES.SELF,
            value: 1,
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
            type: SKILL_TYPES.BOOST,
            targetType: TARGET_TYPES.ALLY_SINGLE,
            value: 3,
            condition: {
                type: CARD_CATEGORY.SOURCE,
            }
        },
        {
            type: SKILL_TYPES.BOOST,
            targetType: TARGET_TYPES.ALLY_SINGLE,
            value: 3,
            condition: {
                type: CARD_CATEGORY.SOURCE,
            }
        }
    ],
    "6759ccf075fc7e3b233510ea": [
        {
            type: SKILL_TYPES.DAMAGE,
            targetType: TARGET_TYPES.ENEMY_SINGLE,
            value: 2,
            condition: {
                type: CARD_PLAYED.LAST_TURN
            }
        }
    ]
};

export const elvesLvl1 = (cardId) => {
    return cardSkills[cardId] || "No skills available for this card";
};