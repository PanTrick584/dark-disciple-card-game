import { useContext, useEffect, useState } from "react";
import { getDecksDB } from "../../tools/fetchDB";
import { AppContext } from "../../context/AppContext";
import { NeoBox } from "../../containers/NeoBox";
import "./styles/deck-viewer.scss"

export const DeckViewer = ({ player }) => {
    // const [decksData, setDecksData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [activeDeck, setActiveDeck] = useState(null);
    const {
        language,
        creadtedDecks,
        setCreatedDecks,
        editedDeck,
        setEditedDeck,
        deckBuilderOn,
        setDeckBuilderOn,
        deckViewerOn,
        setDeckViewerOn,
        playerOneDeck, setPlayerOneDeck,
        playerTwoDeck, setPlayerTwoDeck
    } = useContext(AppContext);

    useEffect(() => {
        getDecks()
    }, []);

    const handleChooseDeck = (deck, deckId) => {
        setActiveDeck(deckId)
        if (player === "player_1") setPlayerOneDeck(deck)
        if (player === "player_2") setPlayerTwoDeck(deck)
        if (!player) {
            console.log("deck viewer");
            setEditedDeck(deck)
            setDeckBuilderOn(prev => !prev);
            setDeckViewerOn(false);
        }
    }

    const getDecks = async () => {
        try {
            const result = await getDecksDB("http://localhost:3333/api/v1/decks");
            setCreatedDecks(result)
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    return (
        <div className="decks-viewer">
            {creadtedDecks?.data?.map((deck, deckId) => {
                return (
                    <div className={`decks-viewer-container neo-box${activeDeck === deckId ? " active" : ""}`} onClick={() => handleChooseDeck(deck, deckId)}>
                        <div
                            className="decks-viewer-name"
                        >
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
                )
            })}
        </div>
    )
}