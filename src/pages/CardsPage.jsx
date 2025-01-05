import React, { useContext, useEffect, useState } from 'react'
import { fetchJsonData } from '../tools/fetchCards';
import { Link, useLocation } from 'react-router-dom';
import { handleCategories } from '../tools/handlers/handleCategories';
import { AppContext } from '../context/AppContext';
import { all, deckButton, deckViewerButton } from '../consts/translations';
import { CardTitle } from '../components/Card/CardTitle';
import { NeoBox } from '../containers/NeoBox';
import { CardDescription } from '../components/Card/CardDescription';
import { FilterLevels } from '../components/FilterLevels/FilterLevels';
import { FilterCategories } from '../components/FilterCategories/FilterCategories';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';
import { DeckBuilder } from '../components/DeckBuilder/DeckBuilder';

import "./styles/cards-page.scss"
import { analyzeDeck } from '../tools/deckData';
import { addDeckDB, updateDeckDB } from '../tools/fetchDB';
import { DeckViewer } from '../components/DeckViewer/DeckViewer';

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
    const {
        language,
        deckFactions,
        setDeckFactions,
        deckkTitle,
        setDeckTitle,
        editedDeckId,
        setEditedDeckId,
        deckBuilderOn,
        setDeckBuilderOn,
        deckViewerOn,
        setDeckViewerOn,
        deckBuilderCards,
        setDeckBuilderCards,
        deckCardsAmount,
        setDeckCardsAmount
    } = useContext(AppContext);

    //DECKBUILDER
    // const [deckBuilderOn, setDeckBuilderOn] = useState(false);
    // const [deckBuilderCards, setDeckBuilderCards] = useState([]);
    // const [deckCardsAmount, setDeckCardsAmount] = useState(0);
    const [deckCardsCost, setDeckCardsCost] = useState(0);
    const [deckCardsLevels, setDeckCardsLevels] = useState([]);
    // const [deckViewerOn, setDeckViewerOn] = useState(false);

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

    const postDeck = async (deckToPost) => {
        try {
            const result = await addDeckDB("http://localhost:3333/api/v1/decks", deckToPost);
            console.log(result);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    const updateDeck = async (deckToPost) => {
        try {
            const result = await updateDeckDB(`http://localhost:3333/api/v1/decks/${deckToPost._id}`, deckToPost);
            console.log(result);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

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
        const countCardsByLevel = (deck) => {
            const levelCounts = deck.reduce((levelCounts, card) => {
                const { level, amount } = card;
                levelCounts[level] = (levelCounts[level] || 0) + amount;
                return levelCounts;
            }, {});

            // Convert the levelCounts object into an array of objects
            return Object.entries(levelCounts).map(([level, amount]) => ({
                level: parseInt(level, 10), // Convert level back to a number
                amount
            }));
        };

        const cardsByLevel = countCardsByLevel(updatedDeck);
        const cardsByFaction = analyzeDeck(updatedDeck);

        setDeckCardsCost(totalCost);
        setDeckCardsAmount(totalCards);
        setDeckCardsLevels(cardsByLevel);
        setDeckFactions(cardsByFaction)

        return updatedDeck;
    };

    const checkDeck = () => {
        if (deckCardsAmount !== 40) return;

        if (deckFactions.length === 2) {
            const toLessCards = deckFactions.find(faction => faction.amount < 20);
            if (toLessCards) return console.log("za mało kart z 2 frkcji");
        }

        if (deckFactions.length === 3) {
            const toLessCards = deckFactions.find(faction => faction.amount < 10);
            if (toLessCards) return console.log("za mało kart z 3 frakcji");
        }

        const cardsIds = deckBuilderCards.map(card => ({ id: card.id, amount: card.amount }));
        const deckToPost = {
            name: deckkTitle,
            factionsData: deckFactions,
            cards: cardsIds
        }

        if (editedDeckId) {
            deckToPost._id = editedDeckId;
            return updateDeck(deckToPost);
        }

        console.log(deckToPost);
        return postDeck(deckToPost);
    }

    // console.log(deckCardsLevels);
    // console.log(deckBuilderCards);
    // console.log(deckFactions);
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
                        handleFilter={handleFilter}
                    />
                    <div className='cards-filter-search'>
                        <input
                            className='search-text neo-box'
                            type="text"
                            onChange={(e) => setSearchDescription(e.target.value)}
                            value={searchDescription}
                            onClick={(e) => {
                                if (firstSearch) {
                                    setSearchDescription("")
                                    setFirstSearch(false)
                                }
                            }}
                        />
                        <span className="search-clear" onClick={() => setSearchDescription("")}>x</span>
                    </div>
                    <div
                        className={`button deckbuilder-enabler`}
                        onClick={() => setDeckBuilderOn(prev => !prev)}
                    >
                        <span onClick={checkDeck}>{!deckBuilderOn ? deckButton.build[language] : deckButton.save[language]}</span>
                    </div>
                    <div
                        className={`button deck-viewer`}
                        onClick={() => {
                            if (deckViewerOn) {
                                // setDeckBuilderCards()
                            }
                            setDeckViewerOn(prev => !prev)
                        }
                        }
                    >
                        <span >{!deckViewerOn ? deckViewerButton.view[language] : deckViewerButton.modify[language]}</span>
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
                {/* DECK VIEWER */}
                {deckViewerOn &&
                    <DeckViewer
                        setDeckBuilderOn={setDeckBuilderOn}
                        setDeckViewerOn={setDeckViewerOn}
                    />}
            </div>
        </div>
    )
}

export default CardsFilter;