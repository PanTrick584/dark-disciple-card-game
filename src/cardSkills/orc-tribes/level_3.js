const cardSkills = {
    "6759ccf075fc7e3b233510e5": [
        { skill: "boost self", value: 5 }
    ]
};

export const orcsLvl3 = (cardId) => {
    return cardSkills[cardId] || "No skills available for this card";
};