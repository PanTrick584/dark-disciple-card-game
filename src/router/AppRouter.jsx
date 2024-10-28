import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DecksPage from '../pages/DecksPage';
import CardsPage from '../pages/CardsPage';
import Elves from '../pages/cards-pages/Elves';
import Orcs from '../pages/cards-pages/Orcs';
import Damned from '../pages/cards-pages/Damned';
import Empire from '../pages/cards-pages/Empire';
import Undead from '../pages/cards-pages/Undead';
// import CardsEmpty from '../pages/CardsEmpty';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/decks" element={<DecksPage />} />
                <Route path="/cards" element={<CardsPage />}>
                    <Route path="elves" element={<Elves />} />
                    <Route path="orcs" element={<Orcs />} />
                    <Route path="damned" element={<Damned />} />
                    <Route path="undead" element={<Undead />} />
                    <Route path="empire" element={<Empire />} />
                </Route>
            </Routes>
        </Router>
    )
};

export default AppRoutes;