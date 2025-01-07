import { AppProvider } from './context/AppContext'
import { PathsProvider } from './context/pathsContext';
import AppRoutes from './router/AppRouter';
// STYLES
// --- main ---
import "./styles/main.scss"

// --- components ---
import "./styles/button.scss"
import "./styles/nav.scss"
import HomePage from './pages/HomePage';

function App() {
    return (
        <PathsProvider>
            <AppProvider>
                <HomePage />
            </AppProvider>
        </PathsProvider>
    )
}

export default App
