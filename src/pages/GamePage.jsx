import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { DeckViewer } from "../components/DeckViewer/DeckViewer";
import { GameBoard } from "../components/GameBoard/GameBoard";
import "./styles/game-page.scss";

const GamePage = () => {

    const {
        editedDeck,
        deckViewerOn,
        setDeckViewerOn
    } = useContext(AppContext);

    useEffect(() => {
        setDeckViewerOn(true)
    }, [])

    console.log(editedDeck);
    console.log(deckViewerOn);
    return (
        <div className="game">
            {deckViewerOn && <DeckViewer />}
            {Object.keys(editedDeck).length !== 0 && <GameBoard />}
        </div>
    )
}

export default GamePage;