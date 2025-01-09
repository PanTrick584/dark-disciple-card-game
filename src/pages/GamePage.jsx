import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { DeckViewer } from "../components/DeckViewer/DeckViewer";
import { GameBoard } from "../components/GameBoard/GameBoard";
import "./styles/game-page.scss";

const GamePage = () => {
    const [playGame, setPlayGame] = useState(false);

    const [playerOneTurn, setPlayerOneTurn] = useState(true);
    const [playerTwoTurn, setPlayerTwoTurn] = useState(false);

    const {
        editedDeck,
        deckViewerOn,
        setDeckViewerOn,
        playerOneDeck, setPlayerOneDeck,
        playerTwoDeck, setPlayerTwoDeck
    } = useContext(AppContext);

    useEffect(() => {
        setDeckViewerOn(true)
    }, [])

    console.log(Object.keys(playerOneDeck).length !== 0);
    console.log(Object.keys(playerTwoDeck).length !== 0);

    return (
        <div className="game">
            {!playGame &&
                <>
                <h3 className="game-header">Choose deck</h3>
            <div className="game-container">
                <div className="game-container-player">
                    <div className="game-container-header">
                        Player 1
                    </div>
                    {deckViewerOn && <DeckViewer player={"player_1"} />}
                </div>
                <span className="game-container-border"></span>
                <div className="game-container-player">
                    <div className="game-container-header">
                        Player 2
                    </div>
                    {deckViewerOn && <DeckViewer player={"player_2"} />}
                </div>
            </div>
            <div className={`button${Object.keys(playerOneDeck).length !== 0 && Object.keys(playerTwoDeck).length !== 0 ? "" : " disabled"}`} onClick={() => {
                if (Object.keys(playerOneDeck).length !== 0 && Object.keys(playerTwoDeck).length !== 0 ) setPlayGame(true)
                }} >PLAY!
            </div>
                </>
            }
            {playGame && <GameBoard
                            player={"player_2"}
                            deck={playerTwoDeck}
                            youTurn={playerTwoTurn}
                            setYourTurn={setPlayerTwoTurn}
                        />}
            {playGame && <div className="game-border"></div>}
            {playGame && <GameBoard
                            player={"player_1"}
                            deck={playerOneDeck}
                            youTurn={playerOneTurn}
                            setYourTurn={setPlayerOneTurn}
                        />}
        </div>
    )
}

export default GamePage;