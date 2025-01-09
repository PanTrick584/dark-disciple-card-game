// src/AppContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a new context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    // MAIN
    const [settingsON, setSettingsOn] = useState(false);
    const [userData, setUserData] = useState("siema");
    const [loadings, setLoadings] = useState({
        adminPageLIst: true
    });
    const [categories, setCategories] = useState([]);
    const [language, setLanguage] = useState("pl");
    const [activeFaction, setActiveFaction] = useState("");
    const [deckFactions, setDeckFactions] = useState([]);
    const [deckkTitle, setDeckTitle] = useState("3 to 30 characters :)");
    // DECK BUILDER
    const [deckBuilderOn, setDeckBuilderOn] = useState(false);
    const [deckBuilderCards, setDeckBuilderCards] = useState([]);
    const [deckCardsAmount, setDeckCardsAmount] = useState(0);

    const [creadtedDecks, setCreatedDecks] = useState({});
    const [editedDeck, setEditedDeck] = useState({});
    const [editedDeckId, setEditedDeckId] = useState("");
    // DECK VIEWER
    const [deckViewerOn, setDeckViewerOn] = useState(false);
    // GAME
    const [playerOneDeck, setPlayerOneDeck] = useState({});
    const [playerTwoDeck, setPlayerTwoDeck] = useState({});

    return (
        <AppContext.Provider
            value={{
                settingsON,
                setSettingsOn,
                userData,
                setUserData,
                loadings,
                setLoadings,
                categories,
                setCategories,
                language,
                setLanguage,
                activeFaction,
                setActiveFaction,
                deckFactions,
                setDeckFactions,
                deckkTitle,
                setDeckTitle,
                creadtedDecks,
                setCreatedDecks,
                editedDeck,
                setEditedDeck,
                editedDeckId,
                setEditedDeckId,
                deckViewerOn,
                setDeckViewerOn,
                deckBuilderOn,
                setDeckBuilderOn,
                deckBuilderCards,
                setDeckBuilderCards,
                deckCardsAmount,
                setDeckCardsAmount,
                playerOneDeck, setPlayerOneDeck,
                playerTwoDeck, setPlayerTwoDeck
            }}>
            {children}
        </AppContext.Provider>
    );
};
