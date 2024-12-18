import { CardTitle } from "./CardTitle"
import { CardDescription } from "./CardDescription"
import { Link } from "react-router-dom"
import "./styles/card.scss"
import "./styles/card-popup.scss"

export const Card = ({card, deckBuilderOn, setDeckBuilderCards, handleDeck, newCategoryName, cardName}) => {
    return(
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