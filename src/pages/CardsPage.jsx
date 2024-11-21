import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import "./styles/cards-page.scss"

const CardsPage = () => {
    const [active, setActive] = useState("");

    const pathsElves = [
        "http://localhost:3333/api/v1/cards?faction=houses-of-elves&level=1",
        "http://localhost:3333/api/v1/cards?faction=houses-of-elves&level=2",
        "http://localhost:3333/api/v1/cards?faction=houses-of-elves&level=3"
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
        "/json/orcs-tribes/lvl-1.json",
        "/json/orcs-tribes/lvl-2.json",
        "/json/orcs-tribes/lvl-3.json",
        "/json/orcs-tribes/lvl-4.json",
        "/json/orcs-tribes/lvl-5.json",
        "/json/orcs-tribes/lvl-6.json",
        "/json/orcs-tribes/lvl-7.json",
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

    return (
        <nav className='cards-page'>
            <ul className='cards-page-ul'>
                <li className={`button ${active === 'elves' ? 'active' : ''}`} onClick={() => setActive('elves')}><Link to="./elves" state={{ dataLocation: pathsElves, name: "houses-of-elves" }}>Elves</Link></li>
                <li className={`button ${active === 'orcs' ? 'active' : ''}`} onClick={() => setActive('orcs')}><Link to="./orcs" state={pathsOrcs}>Orcs</Link></li>
                <li className={`button ${active === 'damned' ? 'active' : ''}`} onClick={() => setActive('damned')}><Link to="./damned" state={{ dataLocation: pathsDamned, name: "damned-hordes" }} >Damned</Link></li>
                <li className={`button ${active === 'empire' ? 'active' : ''}`} onClick={() => setActive('empire')}><Link to="./empire" state={pathsEmpire}>Empire</Link></li>
                <li className={`button ${active === 'undead' ? 'active' : ''}`} onClick={() => setActive('undead')}><Link to="./undead" state={pathsUndead}>Undead</Link></li>
            </ul>
            <Outlet />
        </nav>
    )
}

export default CardsPage
