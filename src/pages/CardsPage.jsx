import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const CardsPage = () => {
    return (
        <nav>
            <ul>
                <li><Link to="./elves">Elves</Link></li>
                <li><Link to="./orcs">Orcs</Link></li>
                <li><Link to="./damned">Damned</Link></li>
                <li><Link to="./empire">Empire</Link></li>
                <li><Link to="./undead">Undead</Link></li>
            </ul>
            <Outlet />
        </nav>
    )
}

export default CardsPage
