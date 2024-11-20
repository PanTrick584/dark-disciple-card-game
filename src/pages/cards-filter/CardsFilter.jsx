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
    const [categoriesList, setCategoriesList] = useState([]);
    const [factionData, setFactionData] = useState([]);
    const [fechedFactions, setFetchedFactions] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const location = useLocation();
    const { dataLocation, name } = location.state;

    useEffect(() => {
        if (fechedFactions.includes(name)) return;

        callAllCards();
    }, [dataLocation]);

    const callAllCards = () => {
        fetchData(dataLocation);
        setNavigation(dataLocation);
        setActiveLevels([]);
        setFetchedFactions(prev => !prev.includes(name) ? [...prev, name] : prev)
    }

    useEffect(() => {
        if (!data) return;
        let uniqueCategories = [];
        data?.forEach(level => {
            level?.data?.forEach(card => {
                const category = card?.category.length && card?.category?.map(category => category.en);

                if (category && !uniqueCategories.includes(...category)) {
                    uniqueCategories = [...uniqueCategories, ...category]
                }
            })
        })
        setCategoriesList(uniqueCategories);
    }, [data])

    const fetchData = async (path) => {
        try {
            const result = await fetchJsonData(path);
            setData(result);
            setFactionData(prev => {
                const newPrev = [...prev, { name: name, data: result }];
                const filterPrev = newPrev.filter((item, index, self) =>
                    index === self.findIndex(obj => obj.name === item.name))
                return filterPrev;
            })
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const handleFilter = (prev, value, type) => {
        if (prev.includes(type(value))) return prev.filter(item => type(item) !== type(value));
        return [...prev, type(value)];
    }

    console.log(factionData);
    console.log(activeCategories);

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
                    <li className={`nav-ul-li button`} onClick={() => setActiveLevels([])}><a>all</a></li>
                </ul>
            </nav>
            {/* CATEGORIES */}
            <nav className="cards-categories">
                <ul>
                    {categoriesList.map((category, id) => {
                        return (
                            <li
                                className={`button small ${activeCategories.includes(id + 1) ? "active" : ""}`}
                                key={`card-category-${id}`}
                                onClick={() => {
                                    setCategories(prev => handleFilter(prev, category, String))
                                    setActiveCategories(prev => handleFilter(prev, id + 1, Number))
                                }}
                            >
                                <a>
                                    {category}
                                </a>
                            </li>
                        )
                    })}
                    <li className={`button small`} onClick={() => {
                        setActiveCategories([])
                        setCategories([])
                        }}><a>all</a></li>
                </ul>
            </nav>
            {/* CARDS */}
            <div className="cards-filter-container">
                {factionData.map((faction, id) => {
                    if (!faction?.name === name) return;
                    console.log(id);
                    return faction?.data?.map((cardsLevel, id) => {
                        if (!activeLevels.length || activeLevels.includes(id + 1)) {
                            return <Card
                                        cardsLevel={cardsLevel} 
                                        cardsCategories={categories} />
                        }
                    })
                })}
            </div>
        </div>
    )
}

export default CardsFilter;