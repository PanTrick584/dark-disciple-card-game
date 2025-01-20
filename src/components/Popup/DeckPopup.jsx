import { CardDescription } from "../Card/CardDescription"
import { CardTitle } from "../Card/CardTitle"

export const DeckPopup = ({ cards }) => {
    return (
        cards?.map((popupCard) => {
            const factionColors = colors(popupCard.faction)
            return (
                <div className="popup-card">
                    <div className="hand-card">
                        <CardTitle card={popupCard} colors={factionColors} />
                        <CardDescription skills={popupCard?.skills} colors={factionColors} />
                    </div>
                </div>
            )
        })
    )
}