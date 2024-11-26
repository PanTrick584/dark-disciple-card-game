import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DecksPage from '../pages/DecksPage';
import CardsPage from '../pages/CardsPage';
import CardsFilter from '../pages/cards-filter/CardsFilter';
import CardEdit from '../components/CardEdit/CardEdit';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/decks" element={<DecksPage />} />
                <Route path="/cards" element={<CardsPage />}>
                    <Route path="houses-of-elves" element={<CardsFilter />} />
                    <Route path="orc-tribes" element={<CardsFilter />} />
                    <Route path="hordes-of-the-damned" element={<CardsFilter />} />
                    <Route path="empire-alliance" element={<CardsFilter />} />
                    <Route path="undead-legion" element={<CardsFilter />} />
                </Route>
                <Route path="/cards/:category/:id" element={<CardEdit />} />
            </Routes>
        </Router>
    )
};

export default AppRoutes;