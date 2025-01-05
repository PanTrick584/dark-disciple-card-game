const express = require("express");
const router = express.Router();

const {
    getAllDecks,
    getSingleDeck,
    updateDeck,
    createDeck,
    deleteDeck
} = require('../controllers/decks-controller');

router
    .route('/')
    .get(getAllDecks)
    .post(createDeck)
// .patch(updateDeck)

router
    .route('/:id')
    .get(getSingleDeck)
    .delete(deleteDeck)
    .patch(updateDeck)

module.exports = router;