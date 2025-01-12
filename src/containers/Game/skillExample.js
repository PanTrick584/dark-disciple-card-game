const exampleCardSkills = {
    "6759cd4e75fc7e3b2335112a": [
        {
            type: SKILL_TYPES.DAMAGE,
            targetType: TARGET_TYPES.ENEMY_SINGLE,
            value: 5,
            requirement: {
                type: 'ALLY_COUNT',
                value: 2
            }
        },
        {
            type: SKILL_TYPES.BOOST,
            targetType: TARGET_TYPES.ALLY_ALL,
            value: 2,
            condition: {
                type: 'ENEMY_STRENGTH',
                comparison: 'GREATER_THAN',
                value: 10
            }
        }
    ]
};