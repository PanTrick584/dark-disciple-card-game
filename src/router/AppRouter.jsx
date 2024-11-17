import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DecksPage from '../pages/DecksPage';
import CardsPage from '../pages/CardsPage';
import CardsFilter from '../pages/cards-filter/CardsFilter';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/decks" element={<DecksPage />} />
                <Route path="/cards" element={<CardsPage />}>
                    <Route path="elves" element={<CardsFilter />} />
                    <Route path="orcs" element={<CardsFilter />} />
                    <Route path="damned" element={<CardsFilter />} />
                    <Route path="undead" element={<CardsFilter />} />
                    <Route path="empire" element={<CardsFilter />} />
                </Route>
            </Routes>
        </Router>
    )
};

export default AppRoutes;