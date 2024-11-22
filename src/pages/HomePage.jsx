import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom';

const HomePage = () => {

    const { userData, loadings } = useContext(AppContext);

    return (
        <div>
            Here is home page

            <nav className='nav'> Check navigation to:
                <Link to="/cards" className='nav-link'>
                    <button className='nav-btn'>Check collection of cards</button>
                </Link>
                <Link to="/decks" className='nav-link'>
                    <button className='nav-btn'>Check decks you created</button>
                </Link>
            </nav>
        </div>
    )
}

export default HomePage
