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
    const [categories, setCategories] = useState([])

    return (
        <AppContext.Provider
            value={{
                userData,
                setUserData,
                loadings,
                setLoadings,
                categories,
                setCategories
            }}>
            {children}
        </AppContext.Provider>
    );
};