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
    .patch(updateCard)
    .post(createCard)

router
    .route('/:id')
    .get(getSingleCard)
    .delete(deleteCard)

module.exports = router;