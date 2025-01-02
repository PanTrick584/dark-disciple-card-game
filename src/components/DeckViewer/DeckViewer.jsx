import { useContext, useEffect, useState } from "react";
import { getDecksDB } from "../../tools/fetchDB";
import { AppContext } from "../../context/AppContext";
import { NeoBox } from "../../containers/NeoBox";
import "./styles/deck-viewer.scss"

export const DeckViewer = ({ setDeckBuilderOn, setDeckViewerOn }) => {
    const [decksData, setDecksData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const {
        language,
        creadtedDecks,
        setCreatedDecks,
        editedDeck,
        setEditedDeck
    } = useContext(AppContext);

    useEffect(() => {
        getDecks()
    }, []);

    const getDecks = async () => {
        try {
            const result = await getDecksDB("http://localhost:3333/api/v1/decks");
            setCreatedDecks(result)
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    console.log(editedDeck);

    return (
        <div className="decks-viewer">
            {creadtedDecks?.data?.map((deck) => {
                return (
                    <NeoBox >
                        <div className="decks-viewer-container">
                            <div
                                className="decks-viewer-name"
                                onClick={() => {
                                    setEditedDeck(deck)
                                    setDeckBuilderOn(prev => !prev);
                                    setDeckViewerOn(prev => !prev);
                                }} >
                                {deck?.name} <span className="name-details" onClick={() => setShowDetails(prev => !prev)}>?</span>
                            </div>
                            <div className={`decks-viewer-factions ${showDetails ? "show" : "hide"}`}>
                                {deck?.factionsData?.map(faction => {
                                    return (
                                        <div className="decks-viewer-factions-container">
                                            <div className="decks-viewer-factions-item">
                                                {faction?.faction[language]}
                                            </div>
                                            <div className="decks-viewer-factions-amount">
                                                Amount: {faction?.amount}
                                            </div>
                                            <div className="decks-viewer-factions-levels">
                                                {Object.entries(faction?.levels).map(([key, value]) => {
                                                    return (
                                                        <div className="decks-viewer-factions-levels-item">
                                                            Level: {`${key}: ${value} cards`}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    )
                                })}
                            </div>
                        </div>
                    </ NeoBox>


                )
            })}
        </div>
    )
}