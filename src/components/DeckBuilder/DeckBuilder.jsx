import { NeoBox } from "../../containers/NeoBox"
import { CardTitle } from "../Card/CardTitle"

export const DeckBuilder = ({ deckCardsAmount, deckBuilderCards, setDeckBuilderCards, setDeckCardsAmount }) => {
    console.log(deckBuilderCards);

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

        setDeckCardsAmount(totalCards);

        return updatedDeck;
    }

    return(
        <NeoBox addClass={'deck-builder'} addClassItem={'deck-builder-container'}>
            <div className="deck-builder-counter">{`${deckCardsAmount ?? 0} / 40`}</div>
            {deckBuilderCards.length ?
                deckBuilderCards.map((card, id) => {

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