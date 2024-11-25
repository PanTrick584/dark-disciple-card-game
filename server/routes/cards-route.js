const express = require("express");
const router = express.Router();

const {
    getAllCards,
    getSingleCard,
    updateCard,
    createCard,
    deleteCard
} = require("../controllers/cards-controller");


router
    .route('/')
    .get(getAllCards)
    .post(createCard)

router
    .route('/:id')
    .get(getSingleCard)
    .delete(deleteCard)
    .patch(updateCard)

module.exports = router;