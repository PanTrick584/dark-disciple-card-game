import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { factions } from '../consts/translations';
import { CardsViewer } from '../components/CardsViewer/CardsViewer';

import "./styles/cards-page.scss";
import { paths } from '../consts/dataPaths';

const CardsPage = () => {
    const { activeFaction, setActiveFaction } = useContext(AppContext);
    const [factionPath, setFactionPath] = useState();
    const [factionName, setFactionName] = useState();

    const { language } = useContext(AppContext);

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
        <div className='cards-page'>
            <ul className='cards-page-nav'>
                {Object.entries(factionsNavigation).map(([key, value]) => {
                    return (
                        <li
                            className={`button ${factionName === value?.name ? 'active' : ''}`}
                            onClick={() => {
                                setActiveFaction(value?.name)
                                setFactionPath(value?.path)
                                setFactionName(value?.name)
                            }}

                        >
                            {value?.name}
                        </li>
                    )
                })}
            </ul>
            <div className="cards-page-container">
                {
                    factionName === ""
                        ? "choose cards faction"
                        : <CardsViewer
                            dataLocation={factionPath}
                            name={factionName}
                        />
                }
            </div>
        </div>
    )
}

export default CardsPage
