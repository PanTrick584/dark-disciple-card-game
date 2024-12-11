const mongoose = require("mongoose");

// Define a translation field as an object
const TranslationField = new mongoose.Schema({
    en: {
        type: String,
        required: [true, "Please provide the English translation"],
    },
    pl: {
        type: String,
        required: [true, "Please provide the Polish translation"],
    },
}, { _id: false }); // Prevents automatic `_id` generation for subdocuments

// Define category schema
const CategorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    en: {
        type: String,
        required: [true, "Please provide the English category name"],
    },
    pl: {
        type: String,
        required: [true, "Please provide the Polish category name"],
    },
}, { _id: false }); // Prevents automatic `_id` generation for subdocuments

// Define skill type schema
const SkillTypeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    en: {
        type: String,
        required: [true, "Please provide the English skill type"],
    },
    pl: {
        type: String,
        required: [true, "Please provide the Polish skill type"],
    },
}, { _id: false }); // Prevents automatic `_id` generation for subdocuments

// Define skills schema
const SkillSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    type: [SkillTypeSchema], // Array of skill types
    description: TranslationField, // Description with translations
}, { _id: false }); // Prevents automatic `_id` generation for subdocuments

// Define the main card schema
const CardSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: [true, "Please provide the card's level"],
    },
    faction: TranslationField, // Faction with translations
    name: TranslationField,    // Name with translations
    strength: {
        type: Number,
        required: [true, "Please provide the card's strength"],
    },
    category: [CategorySchema], // Array of categories
    image: {
        type: String,
    },
    skills: [SkillSchema], // Array of skills
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Card", CardSchema);
