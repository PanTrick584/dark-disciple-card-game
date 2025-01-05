import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DecksPage from '../pages/DecksPage';
import CardsPage from '../pages/FactionsNavigation';
import CardsFilter from '../pages/CardsPage';
import CardEdit from '../components/CardEdit/CardEdit';
import GamePage from '../pages/GamePage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/decks" element={<DecksPage />} />
                    <Route path="/cards" element={<CardsPage />}>
                        <Route path="houses-of-elves" element={<CardsFilter />} />
                        <Route path="orc-tribes" element={<CardsFilter />} />
                        <Route path="hordes-of-the-damned" element={<CardsFilter />} />
                        <Route path="empire-alliance" element={<CardsFilter />} />
                        <Route path="undead-legion" element={<CardsFilter />} />
                    </Route>
                    <Route path="/cards/:category/:id" element={<CardEdit />} />
                </Route>
            </Routes>
        </Router>
    )
};

export default AppRoutes;