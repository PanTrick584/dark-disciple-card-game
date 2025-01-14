import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { DeckViewer } from "../components/DeckViewer/DeckViewer";
import { GameBoard } from "../components/Game/GameBoard";
import "./styles/game-page.scss";
import { useGame } from "../context/GameContext";

const GamePage = () => {
    const [playGame, setPlayGame] = useState(false);

    const {
        deckViewerOn,
        setDeckViewerOn,
        playerOneDeck,
        playerTwoDeck,
    } = useContext(AppContext);

    const {
        setStartGame
    } = useGame();

    useEffect(() => {
        setDeckViewerOn(true)
    }, [])

    return (
        <div className="game">
            {!playGame ?
                (
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
                            if (Object.keys(playerOneDeck).length !== 0 && Object.keys(playerTwoDeck).length !== 0) setPlayGame(true)
                        }} >PLAY!
                        </div>
                    </>
                ) : (
                    <>
                        <GameBoard playerId="player_2" />
                        <div className="game-border"></div>
                        <GameBoard playerId="player_1" />
                    </>
                )
            }
        </div>
    )
}

export default GamePage;