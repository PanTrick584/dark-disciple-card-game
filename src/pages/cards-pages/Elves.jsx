import React, { useEffect, useState } from 'react'
// import { Outlet } from 'react-router-dom'

const Elves = () => {
    const [data, setData] = useState();

    useEffect(() => {
        handleCards()
    }, [])

    const handleCards = async () => {
        try {
            const response = await fetch("/json/elves/lvl-1.json");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            setData(result)
            console.log(result.data);
        } catch (error) {

        }
    }

    console.log(data);
    return (
        <div>
            Elves will shoot you down
        </div>
    )
}

export default Elves
