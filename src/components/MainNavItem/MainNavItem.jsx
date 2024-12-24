import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

export const MainNavItem = ({ faction, path, theme }) => {
    const { activeFaction, setActiveFaction } = useContext(AppContext);

    return (
        <li
            className={`button ${activeFaction === faction ? 'active' : ''}`}
            onClick={() => setActiveFaction(faction)}
            
        >
            <Link
                to="./houses-of-elves"
                state={{ dataLocation: path, name: faction }}>
                {faction}
            </Link>
        </li>
    )
}