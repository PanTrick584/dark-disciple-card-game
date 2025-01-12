import { skillModules } from './skillModules';

export const findCardSkills = (card) => {
    const { faction, level, _id } = card;
    const levelModule = skillModules[faction.en]?.[level];

    if (!levelModule) {
        console.error(`No module found for faction: ${faction.en}, level: ${level}`);
        return null;
    }

    return levelModule(_id);
};