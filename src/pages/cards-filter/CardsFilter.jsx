import React, { useContext, useEffect, useState } from 'react'
import Card from '../../components/Card/Card';
import { fetchJsonData } from '../../tools/fetchCards';
import { useLocation } from 'react-router-dom';
import { handleCategories } from '../../tools/handlers/handleCategories';
import { AppContext } from '../../context/AppContext';
import { all } from '../../consts/translations';

import "./styles/cards-filter.scss"
import { CardTitle } from '../../components/Card/CardTitle';
import { NeoBox } from '../../containers/NeoBox';

const CardsFilter = () => {
    const [navigation, setNavigation] = useState(null);
    const [activeLevels, setActiveLevels] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [factionData, setFactionData] = useState([]);
    const [fechedFactions, setFetchedFactions] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const location = useLocation();
    const { dataLocation, name } = location.state || {};
    const { language } = useContext(AppContext);

    //DECKBUILDER
    const [deckBuilderOn, setDeckBuilderOn] = useState(false);
    const [deckBuilderCards, setDeckBuilderCards] = useState([]);
    const [deckCardsAmount, setDeckCardsAmount] = useState(0);

    useEffect(() => {
        handleCategory();

        if (fechedFactions.includes(name)) return;

        callAllCards();
    }, [dataLocation]);

    const callAllCards = () => {
        fetchData(dataLocation);
        setNavigation(dataLocation);
        setActiveLevels([]);
        setCategories([]);
        setActiveCategories([]);
        setFetchedFactions(prev => !prev.includes(name) ? [...prev, name] : prev)
    }

    useEffect(() => {
        if (!factionData) return;
        handleCategory();
    }, [factionData, activeLevels, language])

    const fetchData = async (path) => {
        try {
            const result = await fetchJsonData(path);
            // setData(result);
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

    const handleCategory = () => {
        const newCategories = handleCategories(factionData, name, activeLevels, language);
        setCategoriesList(newCategories);
    }

    console.log(deckBuilderCards);
    return (
        <div className='cards-filter'>
            {/* CARDS LEVELS */}
            <nav className='cards-filter-nav'>
                <ul className='filter-nav-ul'>
                    {navigation?.map((_, id) => {
                        return (
                            <li
                                className={`nav-ul-li button${activeLevels.includes(id + 1) ? " active" : ""}`}
                                onClick={() => {
                                    // setFilter(prev => handleFilter(prev, dataLocation[id], String));
                                    setActiveLevels(prev => handleFilter(prev, id + 1, Number));
                                    handleCategory();
                                }}>
                                <a>{
                                    id + 1}
                                </a>
                            </li>
                        )
                    })}
                    <li className={`nav-ul-li button `} onClick={() => {
                        setActiveLevels([])
                        handleCategory();
                    }}><a>{all?.[language]}</a></li>
                </ul>
            </nav>
            {/* CATEGORIES */}
            <nav className="cards-categories">
                <ul>
                    {console.log(categoriesList)}
                    {categoriesList.map((category, id) => {
                        return (
                            <li
                                className={`button small ${activeCategories.includes(id + 1) ? "active" : ""}`}
                                key={`card-category-${id}`}
                                onClick={() => {
                                    setCategories(prev => handleFilter(prev, category, String))
                                    setActiveCategories(prev => handleFilter(prev, id + 1, Number))
                                    handleCategory();
                                }}
                            >
                                <a>
                                    {category}
                                </a>
                            </li>
                        )
                    })}
                    <li className={`button small`} onClick={() => {
                        setActiveCategories([]);
                        handleCategory();
                        setCategories([]);
                    }}><a>{all?.[language]}</a></li>
                    <div className={`button small deckbuilder-enabler`} onClick={() => setDeckBuilderOn(prev => !prev)}>
                        <span>BUILD NEW DECK</span>
                    </div>
                </ul>

            </nav>

            <div className="cards-container">
                {/* CARDS */}
                <div className="cards-filter-container">
                    {factionData.map((faction) => {
                        if (faction?.name !== name) return;

                        return faction?.data?.map((cardsLevel, id) => {
                            if (!activeLevels.length || activeLevels.includes(id + 1)) {
                                return (
                                    <Card
                                        cardsLevel={cardsLevel}
                                        cardsCategories={categories}
                                        categoryName={name}
                                        deckBuilderOn={deckBuilderOn}
                                        deckBuilderCards={deckBuilderCards}
                                        setDeckBuilderCards={setDeckBuilderCards}
                                        deckCardsAmount={deckCardsAmount}
                                        setDeckCardsAmount={setDeckCardsAmount}
                                    />
                                )
                            }
                        })
                    })}
                </div>
                {/* DECK BUILDER */}
                {deckBuilderOn &&
                    <NeoBox addClass={'deck-builder'} addClassItem={'deck-builder-container'}>
                        <div className="deck-builder-counter">{`${deckCardsAmount ?? 0} / 40`}</div>
                        {deckBuilderCards.length ?
                            deckBuilderCards.map((card, id) => {

                                return (
                                    <NeoBox>
                                        <div className='deck-builder-counter-single'>{card.amount}x</div>
                                        <CardTitle card={card.data} />
                                    </NeoBox>
                                )
                            }) : null
                        }
                    </NeoBox>
                }
            </div>

        </div>
    )
}

export default CardsFilter;