const mongoose = require("mongoose");

// Define a translation field explicitly as an object
const TranslationField = {
    en: {
        type: String,
        required: true,
    },
    pl: {
        type: String,
        required: true,
    },
};

const CardSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: [true, "Please provide card's level"],
    },
    faction: TranslationField, // Translation field for faction
    name: TranslationField,    // Translation field for name
    strength: {
        type: Number,
        required: [true, "Please provide card's strength"],
    },
    category: [
        {
            id: {
                type: Number, // Adding `id` field
                required: true,
            },
            ...TranslationField, // Translation fields for category
        },
    ],
    image: {
        type: String,
    },
    spy: Boolean,
    skills: [
        {
            id: {
                type: Number, // Adding `id` field for skills
                required: true,
            },
            type: [
                {
                    id: {
                        type: Number, // Adding `id` field for nested type
                        required: true,
                    },
                    ...TranslationField, // Translation fields for skill type
                },
            ],
            description: TranslationField, // Translation field for description
        },
    ],
});

module.exports = mongoose.model("Cards", CardSchema);