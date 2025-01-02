import { Link, Outlet, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';
import { mainNav } from '../consts/translations';
import "./styles/home-page.scss"
import { Map } from '../components/Map/Map';

const HomePage = () => {
    const [activeDirectory, setActiveDirectory] = useState([]);
    const { language } = useContext(AppContext);
    const location = useLocation();

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
            <div className="main-header">
                <Link to={`/`} className='nav-link'>
                    <h1 className='main-header-text'>Dark Disciple: Card Game</h1>
                </Link>
                <LanguageSelector />
            </div>

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
            </nav>
            {location.pathname === "/" ? <Map /> : ""}
            <Outlet />
        </div>
    )
}

export default HomePage
