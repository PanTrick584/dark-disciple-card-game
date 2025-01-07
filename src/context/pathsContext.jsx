import { createContext, useContext, useState } from 'react';

const PathsContext = createContext();

export function PathsProvider({ children }) {
  const [mainPath, setMainPath] = useState("");

  // const login = (userData) => setGamePath(userData);
  // const logout = () => setGamePath(false);

  return (
    <PathsContext.Provider value={{ mainPath, setMainPath }}>
      {children}
    </PathsContext.Provider>
  );
}

export const usePaths = () => useContext(PathsContext);