import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { factions } from '../consts/translations';
import { MainNavItem } from '../components/MainNavItem/MainNavItem';

import "./styles/cards-page.scss";

const CardsPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { language } = useContext(AppContext);

    useEffect(() => {
        if (location.pathname !== '/cards' && location.pathname.startsWith('/cards/')) {
            navigate('/cards');
        }

    }, []);

    const pathsElves = [
        "http://localhost:3333/api/v1/cards?faction=houses-of-elves&level=1",
        "http://localhost:3333/api/v1/cards?faction=houses-of-elves&level=2",
        "http://localhost:3333/api/v1/cards?faction=houses-of-elves&level=3",
        "http://localhost:3333/api/v1/cards?faction=houses-of-elves&level=4",
        "http://localhost:3333/api/v1/cards?faction=houses-of-elves&level=5",
        "http://localhost:3333/api/v1/cards?faction=houses-of-elves&level=6",
        "http://localhost:3333/api/v1/cards?faction=houses-of-elves&level=7"
    ];

    const pathsDamned = [
        "http://localhost:3333/api/v1/cards?faction=damned-hordes&level=1",
        "http://localhost:3333/api/v1/cards?faction=damned-hordes&level=2",
        "http://localhost:3333/api/v1/cards?faction=damned-hordes&level=3",
        "http://localhost:3333/api/v1/cards?faction=damned-hordes&level=4",
        "http://localhost:3333/api/v1/cards?faction=damned-hordes&level=5",
        "http://localhost:3333/api/v1/cards?faction=damned-hordes&level=6",
        "http://localhost:3333/api/v1/cards?faction=damned-hordes&level=7"
    ];



    const pathsEmpire = [
        "/json/empire-aliance/lvl-1.json",
        "/json/empire-aliance/lvl-2.json",
        "/json/empire-aliance/lvl-3.json",
        "/json/empire-aliance/lvl-4.json",
        "/json/empire-aliance/lvl-5.json",
        "/json/empire-aliance/lvl-6.json",
        "/json/empire-aliance/lvl-7.json",
    ];

    const pathsOrcs = [
        "http://localhost:3333/api/v1/cards?faction=orc-tribes&level=1",
        "http://localhost:3333/api/v1/cards?faction=orc-tribes&level=2",
        "http://localhost:3333/api/v1/cards?faction=orc-tribes&level=3",
        "http://localhost:3333/api/v1/cards?faction=orc-tribes&level=4",
        "http://localhost:3333/api/v1/cards?faction=orc-tribes&level=5",
        "http://localhost:3333/api/v1/cards?faction=orc-tribes&level=6",
        "http://localhost:3333/api/v1/cards?faction=orc-tribes&level=7",
    ];

    const pathsUndead = [
        "/json/elves/lvl-1.json",
        "/json/elves/lvl-2.json",
        "/json/elves/lvl-3.json",
        "/json/elves/lvl-4.json",
        "/json/elves/lvl-5.json",
        "/json/elves/lvl-6.json",
        "/json/elves/lvl-7.json",
    ]

    const factionsNavigation = {
        elves: {
            name: factions.elves?.[language],
            path: pathsElves
        },
        orcs: {
            name: factions.orcs?.[language],
            path: pathsOrcs
        },
        damned: {
            name: factions.damned?.[language],
            path: pathsDamned
        },
        empire: {
            name: factions.empire?.[language],
            path: pathsEmpire
        },
        undead: {
            name: factions.undead?.[language],
            path: pathsUndead
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
                            path={value?.path} />
                    )
                })}
            </ul>
            <Outlet />
        </nav>
    )
}

export default CardsPage
