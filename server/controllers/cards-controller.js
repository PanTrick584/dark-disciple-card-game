const Cards = require("../models/CardsModel");

const getAllCards = async (req, res) => {
    const { faction, level } = req.query;
    console.log(faction);
    const cardsCollection = await Cards.find({ "faction.en": faction, level: Number(level) }).sort('createdAt');
    console.log(cardsCollection);
    return res.status(200).json({ data: cardsCollection })
}

const getSingleCard = (req, res) => {

}

const updateCard = async (req, res) => {
    try {
        const { _id, ...updateFields } = req.body;

        if (!_id) {
            return res.status(400).json({ error: "Missing _id in request body" });
        }

        const updatedCard = await Cards.findByIdAndUpdate(
            _id,
            { $set: updateFields },
            { new: true } // Returns the updated document
        );

        if (!updatedCard) {
            return res.status(404).json({ error: "Card not found" });
        }

        return res.status(200).json({ data: updatedCard });
    } catch (error) {
        console.error("Error updating card:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

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
    await Cards.updateMany(
        { "category.en": "gpblin" }, // Match documents with en: "troll"
        { $set: { "category.$.en": "goblin" } }
    )
    // db.collection.updateMany(
    //     {
    //         category: [
    //             { en: "troll", pl: "ogr" }
    //         ]
    //     },
    //     {
    //         $set: {
    //             "category.0.en": "ogre"
    //         }
    //     }
    // );
    console.log("updated cards");
    return res.status(200).json({ message: "updated" })
}

const createCard = async (req, res) => {
    const body = req.body;
    await Cards.create({ ...body });
    const cardsCollection = await Cards.find().sort('createdAt');
    return res.status(200).json({ data: cardsCollection })
}

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