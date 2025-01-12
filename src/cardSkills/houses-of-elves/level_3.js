const cardSkills = {
    "6759ccf075fc7e3b233510e5": [
        { skill: "boost self", value: 5 }
    ]
};

export const elvesLvl3 = (cardId) => {
    return cardSkills[cardId] || "No skills available for this card";
};