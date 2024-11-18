const mongoose = require("mongoose");

const createTranslationField = (required = false) => ({
    type: Map,
    of: String,
    required: required ? true : false
});

const CardSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: [true, "Please provide card's level"]
    },
    faction: createTranslationField(true),
    name: createTranslationField(true),
    strength: {
        type: Number,
        required: [true, "Please provide card's strength"]
    },
    category: [
        createTranslationField(true)
    ],
    image: {
        type: String,
    },
    skills: [
        {
            type: [
                createTranslationField()
            ],
            description: createTranslationField()
        }
    ],
})

module.exports = mongoose.model("Cards", CardSchema);