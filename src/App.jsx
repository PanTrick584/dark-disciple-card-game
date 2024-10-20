import { useState } from 'react';
import './App.css'
import { AppProvider } from './context/AppContext'
import AppRoutes from './router/AppRouter';

function App() {
    const [count, setCount] = useState(0)

    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    )
}

export default App
