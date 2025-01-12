const cardSkills = {
    "6759cd4e75fc7e3b2335112a": [
        { skill: "damage enemy by", value: 5 }
    ]
};

export const orcsLvl1 = (cardId) => {
    return cardSkills[cardId] || "No skills available for this card";
};