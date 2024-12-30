import { useContext, useState } from "react";
import { NeoBox } from "../../containers/NeoBox"
import { CardTitle } from "../Card/CardTitle";
import "./styles/deck-builder.scss"
import { AppContext } from "../../context/AppContext";
import { analyzeDeck } from "../../tools/deckData";

export const DeckBuilder = ({
    deckCardsAmount,
    deckBuilderCards,
    setDeckBuilderCards,
    setDeckCardsAmount,
    deckCardsCost,
    setDeckCardsCost
}) => {
    const [showInfo, setShowInfo] = useState(false);
    const {
        language,
        deckFactions,
        setDeckFactions,
        deckkTitle,
        setDeckTitle,
        editedDeck,
        setEditedDeck
    } = useContext(AppContext);

    const handleRemoveCard = (e, prev, card) => {
        const removedCardIndex = prev.findIndex(prevCard => prevCard.id === card?.id);
        console.log(removedCardIndex);
        let updatedDeck;
        if (removedCardIndex !== -1) {
            updatedDeck = [...deckBuilderCards];
            const existingCard = updatedDeck[removedCardIndex];

            updatedDeck[removedCardIndex] = {
                ...existingCard,
                amount: existingCard.amount - 1
            };

            if (updatedDeck[removedCardIndex].amount < 1) updatedDeck = updatedDeck.filter(card => card.id !== existingCard.id)
        } else {
            updatedDeck = [...prev, { id: _id, amount: 1, data: card, level }];
        }

        const totalCards = updatedDeck.reduce((sum, card) => sum + card.amount, 0);
        const totalCost = updatedDeck.reduce((sum, card) => sum + (card.level * card.amount), 0);
        const cardsByFaction = analyzeDeck(updatedDeck);

        setDeckCardsCost(totalCost);
        setDeckCardsAmount(totalCards);
        setDeckFactions(cardsByFaction);

        return updatedDeck;
    }
    console.log(editedDeck);
    return (
        <NeoBox addClass={'deck-builder'} addClassItem={'deck-builder-container'}>
            <div className="deck-builder-box">
                <label htmlFor="deck-name">wprowadź nazwę talii</label>
                <input type="text" value={deckkTitle} onClick={() => setDeckTitle("")} onChange={(e) => setDeckTitle(e.target.value)} />
            </div>

            <div className="deck-builder-box">
                <div className="deck-builder-counter">{`${deckCardsAmount ?? 0} / 40`}</div>
                <div className="deck-builder-cost">Total cost: {`${deckCardsCost ?? 0}`}</div>
                <div className="deck-builder-sugestions" onClick={()=> setShowInfo(prev => !prev)}>{showInfo ? "x" : "?"}</div>
            </div>
            {showInfo && 
                <div className="deck-builder-sugestions-box">
                    {deckFactions.map((faction, _, arr) => {
                        return(
                            <div className="sugestions-faction">
                                {faction.faction[language].replace("-", " ")}: {faction.amount} / {arr.length === 1 ? 40 : arr.length === 2 ? 20 : "≥10"}
                                {Object.entries(faction.levels).map(([key, value]) => {
                                    const numKey = Number(key);
                                    return(
                                        <div className="sugestions-faction-levels">
                                            {`Cost: ${numKey} Amount: ${value}`} {numKey === 1 ? "(sugested 12 - 16)" : numKey === 2 ? "(suggested 8 - 12)" : numKey === 3 ? "(suggested 6 - 10)" : numKey === 4 ? "(sugested 5 - 8)" : numKey === 5 ? "(sugested 4-6)" : numKey === 6 ? "(suggested 3-5)" : "(suggested 2 - 3)"}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            }
            {deckBuilderCards.length ?
                deckBuilderCards.map((card) => {
                    return (
                        <div className="deck-builder-card" onClick={(e) => setDeckBuilderCards(prev => handleRemoveCard(e, prev, card))} >
                            <NeoBox>
                                <div className='deck-builder-counter-single'>{card.amount}x</div>
                                <CardTitle card={card.data} />
                            </NeoBox>
                        </div>
                    )
                }) : null
            }
        </NeoBox>
    )
}