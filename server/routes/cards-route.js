const express = require("express");
const router = express.Router();

const {
    getAllCards,
    getSingleCard,
    updateCard,
    createCard,
    deleteCard,
    updateAllCards,
    getChoosenCards
} = require("../controllers/cards-controller");

router
    .route('/')
    .get(getAllCards)
    .post(createCard)
    .patch(updateAllCards)

router
    .route('/chosen')
    .post(getChoosenCards);

router
    .route('/:id')
    .get(getSingleCard)
    .delete(deleteCard)
    .patch(updateCard)

module.exports = router;