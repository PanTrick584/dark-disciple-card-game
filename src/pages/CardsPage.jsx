import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import "./styles/cards-page.scss"

const CardsPage = () => {
    const [active, setActive] = useState("");
    const pathsDamned = [
        "/json/damned-hordes/lvl-1.json",
        "/json/damned-hordes/lvl-2.json",
        "/json/damned-hordes/lvl-3.json",
        "/json/damned-hordes/lvl-4.json",
        "/json/damned-hordes/lvl-5.json",
        "/json/damned-hordes/lvl-6.json",
        "/json/damned-hordes/lvl-7.json",
    ];

    const pathsUndead = [
        "/json/undead-legion/lvl-1.json",
        "/json/undead-legion/lvl-2.json",
        "/json/undead-legion/lvl-3.json",
        "/json/undead-legion/lvl-4.json",
        "/json/undead-legion/lvl-5.json",
        "/json/undead-legion/lvl-6.json",
        "/json/undead-legion/lvl-7.json",
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
        "/json/orcs-tribes/lvl-1.json",
        "/json/orcs-tribes/lvl-2.json",
        "/json/orcs-tribes/lvl-3.json",
        "/json/orcs-tribes/lvl-4.json",
        "/json/orcs-tribes/lvl-5.json",
        "/json/orcs-tribes/lvl-6.json",
        "/json/orcs-tribes/lvl-7.json",
    ];

    const pathsElves = [
        "/json/elves/lvl-1.json",
        "/json/elves/lvl-2.json",
        "/json/elves/lvl-3.json",
        "/json/elves/lvl-4.json",
        "/json/elves/lvl-5.json",
        "/json/elves/lvl-6.json",
        "/json/elves/lvl-7.json",
    ]

    return (
        <nav className='cards-page'>
            <ul className='cards-page-ul'>
                <li className={`button ${active === 'elves' ? 'active' : ''}`} onClick={() => setActive('elves')}><Link to="./elves" state={pathsElves}>Elves</Link></li>
                <li className={`button ${active === 'orcs' ? 'active' : ''}`} onClick={() => setActive('orcs')}><Link to="./orcs" state={pathsOrcs}>Orcs</Link></li>
                <li className={`button ${active === 'damned' ? 'active' : ''}`} onClick={() => setActive('damned')}><Link to="./damned" state={pathsDamned} faction={"damned-hordes"}>Damned</Link></li>
                <li className={`button ${active === 'empire' ? 'active' : ''}`} onClick={() => setActive('empire')}><Link to="./empire" state={pathsEmpire}>Empire</Link></li>
                <li className={`button ${active === 'undead' ? 'active' : ''}`} onClick={() => setActive('undead')}><Link to="./undead" state={pathsUndead}>Undead</Link></li>
            </ul>
            <Outlet />
        </nav>
    )
}

export default CardsPage
