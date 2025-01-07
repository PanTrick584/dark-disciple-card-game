import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { usePaths } from '../context/pathsContext';
import GamePage from './GamePage';
import CardsPage from './CardsPage';
import DecksPage from './DecksPage';
import { LanguageSelector } from '../components/LanguageSelector/LanguageSelector';
import { MainHeader } from '../components/MainHeader/MainHeader';
import { mainNav } from '../consts/translations';
import "./styles/home-page.scss"

const HomePage = () => {
    const [activeDirectory, setActiveDirectory] = useState([]);
    const {
        language,
        settingsON,
        setSettingsOn,
    } = useContext(AppContext);

    const { mainPath, setMainPath } = usePaths();

    const mainNavigation = {
        game: {
            translate: "game",
            path: "game",
            component: <GamePage />
        },
        cards: {
            translate: mainNav.cards?.[language],
            path: "cards",
            component: <CardsPage />
        },
        decks: {
            translate: mainNav.decks?.[language],
            path: "decks",
            component: <DecksPage />
        }
    }

    return (
        <div className='main'>
            {settingsON &&
                <div className="main-settings popup">
                    <MainHeader />
                    <LanguageSelector />
                </div>}
            <div
                className="main-settings-button"
                onClick={() => setSettingsOn(prev => !prev)}
            >
                SETTINGS
            </div>
            <div className="main-container">
                {
                    mainPath === "" &&
                    <div className='home-page'>
                        <MainHeader />
                        <nav className='main-nav'>
                            <ul>
                                {Object.entries(mainNavigation).map(([key, value]) => {
                                    return (
                                        <li
                                            key={key}
                                            className="neo-box"
                                            onClick={() => setMainPath(value.path)}
                                        >
                                            <span>{value.translate}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>
                    </div>
                }

                {Object.entries(mainNavigation).map(([_, value]) => {
                    return (
                        mainPath === value.path && value.component
                    )
                })}
            </div>
        </div>
    )
}

export default HomePage
