const Cards = require("../models/CardsModel");

const getAllCards = async (req, res) => {
    const { faction } = req.query;
    console.log(faction);
    const cardsCollection = await Cards.find({ "faction.en": faction }).sort('createdAt');
    console.log(cardsCollection);
    return res.status(200).json({ data: cardsCollection })
}

const getSingleCard = (req, res) => {

}

const updateCard = async (req, res) => {

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
    deleteCard
}