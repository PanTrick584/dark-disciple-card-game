import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Link, Outlet } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';

const HomePage = () => {

    const { setLanguage } = useContext(AppContext);

    return (
        <div className='main-container'>
            Here is home page

            <nav className='main-nav'>
            <ul>
                <li className='button'>
                    <Link to="/cards" className='nav-link'>
                        Check collection of cards
                    </Link>
                </li>
                <li className='button'>
                    <Link to="/decks" className='nav-link'>
                        Check decks you created
                    </Link>
                </li>
            </ul>
                
                
                <LanguageSelector />
            </nav>
            <Outlet />
        </div>
    )
}

export default HomePage
