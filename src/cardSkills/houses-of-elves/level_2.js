const cardSkills = {
    "6759ccf775fc7e3b233510f2": [
        { skill: "if you control trap, boost self by", value: 4 }
    ]
};

export const elvesLvl2 = (cardId) => {
    return cardSkills[cardId] || "No skills available for this card";
};