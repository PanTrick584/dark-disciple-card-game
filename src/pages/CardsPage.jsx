import React, { useContext, useEffect, useState } from 'react'
import { fetchJsonData } from '../tools/fetchCards';
import { Link, useLocation } from 'react-router-dom';
import { handleCategories } from '../tools/handlers/handleCategories';
import { AppContext } from '../context/AppContext';
import { all } from '../consts/translations';
import { CardTitle } from '../components/Card/CardTitle';
import { NeoBox } from '../containers/NeoBox';
import { CardDescription } from '../components/Card/CardDescription';
import { FilterLevels } from '../components/FilterLevels/FilterLevels';
import { FilterCategories } from '../components/FilterCategories/FilterCategories';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';
import { DeckBuilder } from '../components/DeckBuilder/DeckBuilder';

import "./styles/cards-page.scss"

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
    const [deckCardsCost, setDeckCardsCost] = useState(0);

    // SEARCH
    const [searchDescription, setSearchDescription] = useState("");
    const [firstSearch, setFirstSearch] = useState(true);

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

    const handleDeck = (prev, card) => {
        if (deckCardsAmount >= 40) {
            console.log('this is max deck')
            return prev;
        }

        const { _id, level } = card;

        const existingCardIndex = prev.findIndex(prevCard => prevCard.id === _id);

        let updatedDeck;
        if (existingCardIndex !== -1) {
            updatedDeck = [...prev];
            const existingCard = updatedDeck[existingCardIndex];

            const maxAmount =
                level < 5 ? 3 :
                    level < 7 ? 2 :
                        1; // Level == 7

            if (existingCard.amount < maxAmount) {
                updatedDeck[existingCardIndex] = {
                    ...existingCard,
                    amount: existingCard.amount + 1
                };
            }
        } else {
            updatedDeck = [...prev, { id: _id, amount: 1, data: card, level }];
        }

        const totalCards = updatedDeck.reduce((sum, card) => sum + card.amount, 0);
        const totalCost = updatedDeck.reduce((sum, card) => sum + (card.level * card.amount), 0);

        console.log(totalCost);
        setDeckCardsCost(totalCost)
        setDeckCardsAmount(totalCards);

        return updatedDeck;
    };

    // console.log(deckBuilderCards);
    // console.log(searchDescription);
    return (
        <div className="cards">
            <div className="cards-filter">
                {/* CARDS LEVELS */}
                <nav className='cards-filter-levels'>
                    <FilterLevels
                        navigation={navigation}
                        activeLevels={activeLevels}
                        setActiveLevels={setActiveLevels}
                        handleCategory={handleCategory}
                        setSearchDescription={setSearchDescription}
                        handleFilter={handleFilter}
                    />
                    <div>
                        <input
                            className='cards-filter-search neo-box'
                            type="text"
                            onChange={(e) => setSearchDescription(e.target.value)}
                            defaultValue={"search"}
                            onClick={(e) => {
                                if (firstSearch) {
                                    e.target.value = ""
                                    setFirstSearch(false)
                                }
                            }}
                        />
                    </div>
                    <div
                        className={`button deckbuilder-enabler`}
                        onClick={() => setDeckBuilderOn(prev => !prev)}
                    >
                        <span>BUILD NEW DECK</span>
                    </div>
                </nav>
                {/* CATEGORIES */}
                <nav className="cards-filter-categories">
                    <FilterCategories
                        categoriesList={categoriesList}
                        setCategories={setCategories}
                        activeCategories={activeCategories}
                        setActiveCategories={setActiveCategories}
                        handleFilter={handleFilter}
                        handleCategory={handleCategory}
                    />
                </nav>
            </div>
            <div className="cards-container">
                {/* CARDS GRID */}
                <CardsGrid
                    factionData={factionData}
                    activeLevels={activeLevels}
                    name={name}
                    categories={categories}
                    searchDescription={searchDescription}
                    deckBuilderOn={deckBuilderOn}
                    setDeckBuilderCards={setDeckBuilderCards}
                    handleDeck={handleDeck}
                />
                {/* DECK BUILDER */}
                {deckBuilderOn &&
                    <DeckBuilder
                        deckCardsAmount={deckCardsAmount}
                        setDeckCardsAmount={setDeckCardsAmount}
                        deckBuilderCards={deckBuilderCards}
                        setDeckBuilderCards={setDeckBuilderCards}
                        deckCardsCost={deckCardsCost}
                        setDeckCardsCost={setDeckCardsCost}
                    />
                }
            </div>
        </div>
    )
}

export default CardsFilter;