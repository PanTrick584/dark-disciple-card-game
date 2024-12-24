const Cards = require("../models/CardsModel");

const getAllCards = async (req, res) => {
    const { faction, level } = req.query;
    const cardsCollection = await Cards.find({ "faction.en": faction, level: Number(level) }).sort('createdAt');
    return res.status(200).json({ data: cardsCollection })
}

const getSingleCard = (req, res) => {

}

const updateCard = async (req, res) => {
    const { _id, updates } = req.body;

    if (!_id || !updates) {
        return res.status(400).json({ error: "Missing required fields (_id, updates)" });
    }

    try {
        const updateOps = {};
        const arrayFilters = [];
        let filterIndex = 0;

        for (const [field, value] of Object.entries(updates)) {
            if (field === "description") {
                value.forEach((skillUpdate) => {
                    if (skillUpdate.id !== undefined) {
                        const filterName = `skillElem${filterIndex}`;
                        for (const [key, val] of Object.entries(skillUpdate)) {
                            if (key !== "id") {
                                updateOps[`skills.$[${filterName}].description.${key}`] = val;
                            }
                        }
                        arrayFilters.push({ [`${filterName}.id`]: skillUpdate.id });
                        filterIndex++;
                    }
                });
            } else if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (item.id !== undefined) {
                        const filterName = `elem${filterIndex}`;
                        for (const [key, val] of Object.entries(item)) {
                            if (key !== "id") {
                                updateOps[`${field}.$[${filterName}].${key}`] = val;
                            }
                        }
                        arrayFilters.push({ [`${filterName}.id`]: item.id });
                        filterIndex++;
                    }
                });
            } else if (typeof value === "object") {
                for (const [key, val] of Object.entries(value)) {
                    updateOps[`${field}.${key}`] = val;
                }
            } else {
                updateOps[field] = value;
            }
        }

        console.log(updateOps);

        const updateResult = await Cards.updateOne(
            { _id },
            { $set: updateOps },
            { arrayFilters: arrayFilters.length > 0 ? arrayFilters : undefined }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ error: "Card not found" });
        }

        // Return the updated card
        const updatedCard = await Cards.findById(_id);
        return res.status(200).json({ data: updatedCard });
    } catch (error) {
        console.error("Error updating card:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};




const updateAllCards = async (req, res) => {
    // await Cards.updateMany(
    //     {
    //         "faction.en": "orc tribes",
    //         "faction.pl": "plemiona orków"
    //     },
    //     {
    //         $set: {
    //             "faction.en": "orc-tribes",
    //             "faction.pl": "plemiona-orków"
    //         }
    //     }
    // )
    // await Cards.updateMany(
    // {}, // Match documents with en: "troll"
    // { $set: { "category.$.id": "spy", } }
    // )
    await Cards.updateMany(
        {
            "category.en": "ogr" // Match documents where an element in the category array has `en: "gpblin"`
        },
        {
            $set: {
                "category.$[elem].en": "ogre" // Update the matching element's `en` field
            }
        },
        {
            arrayFilters: [
                { "elem.en": "ogr" } // Apply the update only to elements in the array where `en: "gpblin"`
            ]
        }
    );
    console.log("updated cards");
    return res.status(200).json({ message: "updated" })
}

// save for later single card add in app??
// const createCard = async (req, res) => {
//     const body = req.body;
//     await Cards.create({ ...body });
//     const cardsCollection = await Cards.find().sort('createdAt');
//     return res.status(200).json({ data: cardsCollection })
// }

const createCard = async (req, res) => {
    try {
        const body = req.body;

        if (!Array.isArray(body)) {
            return res.status(400).json({ error: "Expected an array of card objects" });
        }

        // Validate each card object here if needed (optional)

        // Insert multiple cards at once
        await Cards.insertMany(body);

        // Fetch the updated collection
        const cardsCollection = await Cards.find().sort('createdAt');

        return res.status(200).json({ data: cardsCollection });
    } catch (error) {
        console.error("Error creating cards:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteCard = (req, res) => {

}

module.exports = {
    getAllCards,
    getSingleCard,
    updateCard,
    createCard,
    deleteCard,
    updateAllCards
}