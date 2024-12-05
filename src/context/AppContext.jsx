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
                setLanguage
            }}>
            {children}
        </AppContext.Provider>
    );
};
