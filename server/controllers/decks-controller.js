const Deck = require("../models/DeckModel");

const getAllDecks = async (req, res) => {
    // const { faction } = req.query;
    const decksCollection = await Deck.find().sort('createdAt');
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

        await Deck.create(body);
        console.log("deck creared!");

        const deckCollection = await Deck.find().sort('createdAt');

        return res.status(200).json({ data: deckCollection });
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