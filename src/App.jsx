import { AppProvider } from './context/AppContext'
import AppRoutes from './router/AppRouter';
// STYLES
// --- main ---
import "./styles/main.scss"

// --- components ---
import "./styles/button.scss"
import "./styles/nav.scss"

function App() {
    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    )
}

export default App
