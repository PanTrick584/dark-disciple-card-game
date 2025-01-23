// types.js
export const SKILL_TYPES = {
    DAMAGE: 'DAMAGE',
    BOOST: 'BOOST',
    HEAL: 'HEAL',
    SHIELD: 'SHIELD',
    SUMMON: 'SUMMON',
    TRANSFORM: 'TRANSFORM',
    PLAY: 'PLAY'
};

export const TARGET_TYPES = {
    ENEMY_SINGLE: 'ENEMY_SINGLE',
    ENEMY_ALL: 'ENEMY_ALL',
    ENEMY_ANY: 'ENEMY_ANY',
    ALLY_SINGLE: 'ALLY_SINGLE',
    ALLY_ALL: 'ALLY_ALL',
    ALLY_ANY: 'ALLY_ANY',
    SELF: 'SELF',
    ANY: 'ANY'
};

export const CARD_CATEGORY = {
    //ORCS
    ORC: 'ORC',
    OGRE: 'OGRE',
    TROLL: 'TROLL',
    GOBLIN: 'GOBLIN',
    BEAST: 'BEAST',
    TOTEM: 'TOTEM',
    SHAMAN: 'SHAMAN',
    // ELVES
    FOREST_ELF: 'FOREST_ELF',
    DARK_ELF: 'DARK_ELF',
    HIGH_ELF: 'HIGH_ELF',
    TRAP: 'TRAP',
    SOURCE: 'SOURCE',
    // COMMON
    SPY: 'SPY',
    ITEM: 'ITEM',
    STRUCTURE: 'STRUCTURE',
    // DAMNED
    DEMONOLOGIST: 'DEMONOLOGIST',
    GARGOYLE: 'GARGOYLE',
    DEAMON: 'DEAMON',
    IMP: 'IMP',
    FOLLOWER: 'FOLLOWER',
    ABBYS: 'ABBYS',
    TOWER: 'TOWER',
    WITCH: 'WITCH',
}

export const CARD_VALUES = {
    STRENGTH: 'STRENGTH',
    COST: 'COST',
}

export const CARD_PLAYED = {
    LAST_TURN: 'LAST_TURN'
}

export const VALUE_COMPARISON = {
    GREATER: 'GREATER',
    LOWER: 'LOWER',
    EQUAL: 'EQUAL'
}