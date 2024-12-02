const express = require("express");
const router = express.Router();

const {
    getAllCards,
    getSingleCard,
    updateCard,
    createCard,
    deleteCard,
    updateAllCards
} = require("../controllers/cards-controller");


router
    .route('/')
    .get(getAllCards)
    .post(createCard)
    .patch(updateAllCards)

router
    .route('/:id')
    .get(getSingleCard)
    .delete(deleteCard)
    .patch(updateCard)

module.exports = router;