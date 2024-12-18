import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { CardTitle } from "../Card/CardTitle";
import { CardDescription } from "../Card/CardDescription";
import { Card } from "../Card/Card";
import "./styles/cards-grid.scss"

export const CardsGrid = ({ factionData, activeLevels, name, categories, searchDescription, deckBuilderOn, setDeckBuilderCards, handleDeck }) => {
    const { language } = useContext(AppContext);

    return(
        <div className="cards-grid">
            {factionData.map((faction) => {
                if (faction?.name !== name) return;

                return faction?.data?.map((cardsLevel, id) => {
                    if (!activeLevels.length || activeLevels.includes(id + 1)) {
                        return (
                            cardsLevel?.data?.map((card, id) => {
                                const currentCategories = card?.category?.map((category) => category?.[language]);
                                const cardName = card?.name?.[language] && card?.name?.[language].split(" ").join("-");
                                const newCategoryName = name.split(" ").join("-");
                
                                if (!categories.length || categories.some(category => currentCategories.includes(category))) {
                                    if (searchDescription || searchDescription === "") {
                                        const [cardDescription] = card?.skills?.map(skill => skill?.description?.[language].includes(searchDescription));
                
                                        if (cardDescription) {
                                            return (
                                                <Card 
                                                    card={card}
                                                    deckBuilderOn={deckBuilderOn}
                                                    setDeckBuilderCards={setDeckBuilderCards}
                                                    handleDeck={handleDeck}
                                                    newCategoryName={newCategoryName}
                                                    cardName={cardName}
                                                />
                                        )}
                                    }
                                }
                            })
                        )
                    }
                })
            })}
        </div>
    )
}