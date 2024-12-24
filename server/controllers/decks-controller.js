const Deck = require("../models/DeckModel");

const getAllDecks = async (req, res) => {
    const { faction, level } = req.query;
    const decksCollection = await Deck.find({ "faction.en": faction, level: Number(level) }).sort('createdAt');
    return res.status(200).json({ data: decksCollection })
}

const getSingleDeck = (req, res) => {

}

const updateDeck = () => {

}

const createDeck = async (req, res) => {
    console.log(req.body);
    try {
        const body = req.body;

        if (!Array.isArray(body)) {
            return res.status(400).json({ error: "Expected an array of card objects" });
        }

        // Validate each card object here if needed (optional)

        // Insert multiple cards at once
        await Deck.create(body);

        // Fetch the updated collection
        const cardsCollection = await Cards.find().sort('createdAt');

        return res.status(200).json({ data: cardsCollection });
    } catch (error) {
        console.error("Error creating cards:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteDeck = () => {

}

module.exports = {
    getAllDecks,
    getSingleDeck,
    updateDeck,
    createDeck,
    deleteDeck
}