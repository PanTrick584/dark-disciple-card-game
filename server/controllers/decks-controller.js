const Deck = require("../models/DeckModel");

const getAllDecks = async (req, res) => {
    // const { faction } = req.query;
    const decksCollection = await Deck.find().sort('createdAt');
    return res.status(200).json({ data: decksCollection })
}

const getSingleDeck = (req, res) => {

}

const updateDeck = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the deck's ID is passed as a route parameter
        const updatedData = req.body; // The updated deck data sent from the client

        // Validate incoming data
        if (!id || !updatedData) {
            return res.status(400).json({ error: 'Deck ID and updated data are required.' });
        }

        // Find the deck by ID and update it
        const updatedDeck = await Deck.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true, runValidators: true } // Return the updated deck and run validation
        );

        if (!updatedDeck) {
            return res.status(404).json({ error: 'Deck not found.' });
        }

        res.status(200).json(updatedDeck);
    } catch (error) {
        console.error('Error updating deck:', error);
        res.status(500).json({ error: 'Failed to update the deck.' });
    }
};

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