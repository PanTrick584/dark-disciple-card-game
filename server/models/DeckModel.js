const mongoose = require("mongoose");

const levelsField = new mongoose.Schema({
    1: {
        type: Number,
        required: false
    },
    2: {
        type: Number,
        required: false
    },
    3: {
        type: Number,
        required: false
    },
    4: {
        type: Number,
        required: false
    },
    5: {
        type: Number,
        required: false
    },
    6: {
        type: Number,
        required: false
    },
    7: {
        type: Number,
        required: false
    }
}, { _id: false });

const TranslationField = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
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

const CardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
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
    factionsData: [
        {
            faction: TranslationField,
            amount: {
                type: Number,
                required: [true, "Please give us amount of faction cards in deck"]
            },
            levels: levelsField
        }

    ],
    cards: {
        type: [
            {
                id: {
                    type: String,
                    required: true,
                },
                amount: {
                    type: Number,
                    required: true
                }
            },
            { _id: false }
        ],
        validate: {
            validator: function (v) {
                console.log(v);
                const cardsAmount = v.reduce((sum, card) => sum + card.amount, 0)
                console.log(cardsAmount);
                return Array.isArray(v) && cardsAmount === 40;
            },
            message: "A deck must have at least one card.",
        },
    },
}, { timestamps: true });

module.exports = mongoose.model("Deck", DeckSchema);