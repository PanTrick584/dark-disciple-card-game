// src/AppContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a new context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState("siema");
    const [loadings, setLoadings] = useState({
        adminPageLIst: true
    });
    const [categories, setCategories] = useState([]);
    const [language, setLanguage] = useState("pl");
    const [activeFaction, setActiveFaction] = useState("");
    const [deckFactions, setDeckFactions] = useState([]);
    const [deckkTitle, setDeckTitle] = useState("3 to 30 characters :)");
    const [creadtedDecks, setCreatedDecks] = useState({});
    const [editedDeck, setEditedDeck] = useState({});


    return (
        <AppContext.Provider
            value={{
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
                setEditedDeck
            }}>
            {children}
        </AppContext.Provider>
    );
};
