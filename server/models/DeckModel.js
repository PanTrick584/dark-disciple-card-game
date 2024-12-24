const mongoose = require("mongoose");

const TranslationField = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    en: {
        type: String,
        required: [true, "Please provide the English faction name"],
    },
    pl: {
        type: String,
        required: [true, "Please provide the Polish faction name"],
    },
}, { _id: false }); // Prevents automatic `_id` generation for subdocuments

// Define skills schema
const CardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    }
}, { _id: false }); // Prevents automatic `_id` generation for subdocuments

// Define the main deck schema
const DeckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the deck's name"],
        minlength: [3, "Deck name must be at least 3 characters long"],
        maxlength: [30, "Deck name cannot exceed 30 characters"],
    },
    factions: [TranslationField],
    cards: {
        type: [CardSchema],
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length === 40;
            },
            message: "A deck must have at least one card.",
        },
    },
}, { timestamps: true });

module.exports = mongoose.model("Deck", DeckSchema);