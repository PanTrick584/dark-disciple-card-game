import { NeoBox } from "../../containers/NeoBox"
import { CardTitle } from "../Card/CardTitle";
import "./styles/deck-builder.scss"

export const DeckBuilder = ({
    deckCardsAmount,
    deckBuilderCards,
    setDeckBuilderCards,
    setDeckCardsAmount,
    deckCardsCost,
    setDeckCardsCost
}) => {

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

        setDeckCardsCost(totalCost)
        setDeckCardsAmount(totalCards);

        return updatedDeck;
    }

    return (
        <NeoBox addClass={'deck-builder'} addClassItem={'deck-builder-container'}>
            <div className="deck-builder-box">
                <div className="deck-builder-counter">{`${deckCardsAmount ?? 0} / 40`}</div>
                <div className="deck-builder-cost">Total cost: {`${deckCardsCost ?? 0}`}</div>
            </div>
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