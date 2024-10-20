import React, { useEffect, useState } from 'react'

const Damned = () => {
    const [data, setData] = useState();

    useEffect(() => {
        handleCards()
    }, [])

    const handleCards = async () => {
        try {
            const response = await fetch("/json/damned-hordes/lvl-1.json");

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
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: "15px" }}>
            {data?.map((item) => {
                return (
                    <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "flex-start" }}>
                        {item.name.default}
                        <br />
                        <span>Level: {item.level}</span>
                        <span>Strength: {item.strength}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Damned
