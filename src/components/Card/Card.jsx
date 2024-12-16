import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { CardTitle } from './CardTitle';
import { CardDescription } from './CardDescription';

import "./styles/card.scss"


const Card = ({
    cardsLevel,
    cardsCategories,
    categoryName,
    deckBuilderOn,
    setDeckBuilderCards,
    setDeckCardsAmount
}) => {
    const { language } = useContext(AppContext);

    const handleDeck = (prev, card) => {
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

        setDeckCardsAmount(totalCards);

        return updatedDeck;
    };


    return (
        <>
            {cardsLevel?.data?.map((card, id) => {
                const currentCategories = card?.category?.map((category) => category?.[language]);
                const cardName = card?.name?.[language] && card?.name?.[language].split(" ").join("-");
                const newCategoryName = categoryName.split(" ").join("-");

                if (!cardsCategories.length || cardsCategories.some(category => currentCategories.includes(category))) {
                    return (
                        <div className="card">
                            <div className="card-popup">
                                {!deckBuilderOn ?
                                    <div className="card-popup-edit">
                                        <Link to={`/cards/${newCategoryName}/${cardName}`} state={card} >EDIT</Link>
                                    </div> :
                                    <div className="card-popup-add" onClick={() => setDeckBuilderCards(prev => handleDeck(prev, card))} >ADD</div>
                                }
                            </div>
                            <CardTitle card={card} />
                            <CardDescription skills={card?.skills} />
                        </div>
                    )
                }
            })}
        </>
    )
}

export default Card
