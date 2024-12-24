import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { factions } from '../consts/translations';
import { MainNavItem } from '../components/MainNavItem/MainNavItem';

import "./styles/cards-page.scss";
import { paths } from '../consts/dataPaths';

const CardsPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { language } = useContext(AppContext);

    useEffect(() => {
        if (location.pathname !== '/cards' && location.pathname.startsWith('/cards/')) {
            navigate('/cards');
        }
    }, []);

    const factionsNavigation = {
        elves: {
            name: factions.elves?.[language],
            path: paths.elves,
        },
        orcs: {
            name: factions.orcs?.[language],
            path: paths.orcs,
        },
        damned: {
            name: factions.damned?.[language],
            path: paths.damned,
        },
        empire: {
            name: factions.empire?.[language],
            path: paths.empire,
        },
        undead: {
            name: factions.undead?.[language],
            path: paths.undead,
        }
    }

    return (
        <nav className='cards-page'>
            <ul className='cards-page-ul'>
                {Object.entries(factionsNavigation).map(([key, value]) => {
                    return (
                        <MainNavItem
                            key={key}
                            faction={value?.name}
                            path={value?.path}
                        />
                    )
                })}
            </ul>
            <Outlet />
        </nav>
    )
}

export default CardsPage
