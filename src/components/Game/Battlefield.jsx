import { CardDescription } from "../Card/CardDescription";
import { CardTitle } from "../Card/CardTitle";

export const Battlefield = ({ isCurrentPlayer, handleDrop, player }) => {
    return (
        <div
            className={`battlefield${isCurrentPlayer ? "" : " disabled"}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            {player?.board.length && player?.board?.map((card, index) => {
                // const factionColors = getColors(card.faction);
                return (
                    <div key={index} className="hand-card">
                        <CardTitle card={card} colors={""} />
                        <CardDescription skills={card?.skills} colors={""} />
                    </div>
                );
            })}
        </div>
    )
}