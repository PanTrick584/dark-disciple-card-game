import { Link, Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';
import { mainNav } from '../consts/translations';

const HomePage = () => {
    const [activeDirectory, setActiveDirectory] = useState([]);
    const { language } = useContext(AppContext);

    const mainNavigation = {
        cards: {
            translate: mainNav.cards?.[language],
            path: "cards"
        },
        decks: {
            translate: mainNav.decks?.[language],
            path: "decks"
        }
    }
    return (
        <div className='main-container'>
            <h1 className='main-header'>Dark Disciple: Card Game</h1>

            <nav className='main-nav'>
                <ul>
                    {Object.entries(mainNavigation).map(([key, value]) => {
                        return (
                            <li key={key} className={`button${activeDirectory === key ? " active" : ""}`} onClick={() => setActiveDirectory(key)}>
                                <Link to={`/${value?.path}`} className='nav-link'>
                                    {value.translate}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <LanguageSelector />
            </nav>
            <Outlet />
        </div>
    )
}

export default HomePage
