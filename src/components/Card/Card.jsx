import { CardTitle } from "./CardTitle"
import { CardDescription } from "./CardDescription"
import { Link } from "react-router-dom"
import { themes } from "../../consts/themes";
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import "./styles/card.scss"
import "./styles/card-popup.scss"

export const Card = ({ card, deckBuilderOn, setDeckBuilderCards, handleDeck, newCategoryName, cardName, factionName }) => {
    const { language } = useContext(AppContext);
    let factionColors;
    const theme = Object.values(themes).find(theme => theme.faction[language] === factionName);
    if (theme) {
        factionColors = {
            themeMain: theme.themeMain,
            themeAccent: theme.themeAccent,
            themeAccentAlt: theme.themeAccentAlt,
        };
    }

    return (
        <div className="card">
            <div className="card-popup">
                {!deckBuilderOn ?
                    <div className="card-popup-edit">
                        {/* <Link to={`/cards/${newCategoryName}/${cardName}`} state={card} >EDIT</Link> */}
                    </div> :
                    <div className="card-popup-add" onClick={() => setDeckBuilderCards(prev => handleDeck(prev, card))} >ADD</div>
                }
            </div>
            <CardTitle card={card} colors={factionColors} />
            <CardDescription skills={card?.skills} colors={factionColors} />
        </div>
    )
}