import React, { useEffect, useState } from 'react'
import Card from '../../containers/Card';
import { fetchJsonData } from '../../hooks/fetchCards';
import { useLocation } from 'react-router-dom';
import "./styles/cards-filter.scss"
import { fetchDB } from '../../hooks/fetchDB';

const CardsFilter = () => {
    const [data, setData] = useState(null);
    const [navigation, setNavigation] = useState(null);
    const [filter, setFilter] = useState([]);
    const [activeLevels, setActiveLevels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [factionData, setFactionData] = useState();

    const location = useLocation();
    const dataLocation = location.state;

    // useEffect(() => {
    //     const fetchFactionData = async () => {
    //         try {
    //             const jsonData = await fetchDB(`http://localhost:3333/api/v1/cards?faction=damned-hordes`);
    //             setFactionData(jsonData.data)
    //             console.log(jsonData);
    //         } catch (error) {
    //             console.error("Error fetching faction data:", error);
    //         }
    //     };

    //     fetchFactionData();
    // }, []);

    useEffect(() => {
        callAllCards();
    }, [dataLocation]);

    useEffect(() => {
        fetchData(filter);
    }, [filter])

    const callAllCards = () => {
        fetchData(dataLocation);
        setNavigation(dataLocation);
        setFilter([]);
        setActiveLevels([]);
    }

    useEffect(() => {
        if (!data) return;
        let uniqueCategories = [];
        data.forEach(level => {
            level.forEach(card => {
                console.log(card);
                const category = card?.category.length && card?.category?.map(category => category.en);

                console.log(category);
                if (category && !uniqueCategories.includes(...category)) {
                    uniqueCategories = [...uniqueCategories, ...category]
                }
            })
        })
        setCategories(uniqueCategories);
    }, [data])

    const fetchData = async (path) => {
        try {
            const result = await fetchJsonData(path);
            setData(result);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const handleFilter = (prev, value, type) => {
        if (prev.includes(type(value))) return prev.filter(item => type(item) !== type(value));
        return [...prev, type(value)];
    }
    console.log(categories);
    return (
        <div className='cards-filter'>
            {/* CARDS LEVELS */}
            <nav className='cards-filter-nav'>
                <ul className='filter-nav-ul'>
                    {navigation?.map((_, id) => {
                        return (
                            <li
                                className={`nav-ul-li button ${activeLevels.includes(id + 1) ? "active" : ""}`}
                                onClick={() => {
                                    setFilter(prev => handleFilter(prev, dataLocation[id], String));
                                    setActiveLevels(prev => handleFilter(prev, id + 1, Number));
                                }}>
                                <a>{
                                    id + 1}
                                </a>
                            </li>
                        )
                    })}
                    <li className={`nav-ul-li button`} onClick={() => callAllCards()}><a>all</a></li>
                </ul>
            </nav>
            {/* CATEGORIES */}
            <nav className="">
                {/* {console.log(categories)} */}
                <ul>
                    {categories.map((category, id) => {
                        return (
                            <li className="button small" key={`card-category-${id}`}><a>{category}</a></li>
                        )
                    })}
                </ul>
            </nav>
            {/* CARDS */}
            <div className="cards-filter-container">
                {data?.map((cardsLevel) => <Card cardsLevel={cardsLevel} />)}
            </div>
        </div>
    )
}

export default CardsFilter;