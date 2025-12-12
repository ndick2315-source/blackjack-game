"use client";

import { useState, useEffect } from "react";
import { createDeck } from "../lib/deck";
import { calcHand, dealerShouldHit, checkBlackjack } from "../lib/blackjack";

export default function Home() {
  const [deck, setDeck] = useState([]);
  const [player, setPlayer] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    const newDeck = createDeck();
    const p = [newDeck.pop(), newDeck.pop()];
    const d = [newDeck.pop(), newDeck.pop()];
    setDeck(newDeck);
    setPlayer(p);
    setDealer(d);
    setGameOver(false);

    if (checkBlackjack(d)) {
      setMessage("Dealer has blackjack! You lose.");
      setGameOver(true);
    } else if (checkBlackjack(p)) {
      setMessage("Blackjack! You win!");
      setGameOver(true);
    } else {
      setMessage("Game started. Hit or Stand?");
    }
  }

  function hit() {
    if (gameOver) return;
    const newDeck = [...deck];
    const newPlayer = [...player, newDeck.pop()];
    setDeck(newDeck);
    setPlayer(newPlayer);

    if (calcHand(newPlayer) > 21) {
      setMessage("You busted! Dealer wins.");
      setGameOver(true);
    }
  }

  function stand() {
    if (gameOver) return;
    let newDeck = [...deck];
    let newDealer = [...dealer];

    while (dealerShouldHit(newDealer)) {
      newDealer.push(newDeck.pop());
    }

    setDealer(newDealer);

    const playerTotal = calcHand(player);
    const dealerTotal = calcHand(newDealer);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setMessage("You win!");
    } else if (playerTotal === dealerTotal) {
      setMessage("Tie!");
    } else {
      setMessage("Dealer wins!");
    }
    setGameOver(true);
  }

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif", color: "white", background: "#0a0f1a", minHeight: "100vh" }}>
      <h1>Blackjack</h1>

      <div>
        <h2>Dealer</h2>
        <div style={{ display: "flex" }}>
          {dealer.map((c, i) => (
            <img key={i} src={`/cards/${c.code}.png`} width="80" style={{ marginRight: "10px" }} />
          ))}
        </div>
      </div>

      <div>
        <h2>Player</h2>
        <div style={{ display: "flex" }}>
          {player.map((c, i) => (
            <img key={i} src={`/cards/${c.code}.png`} width="80" style={{ marginRight: "10px" }} />
          ))}
        </div>
      </div>

      <p>{message}</p>

      {!gameOver && (
        <div>
          <button onClick={hit}>Hit</button>
          <button onClick={stand}>Stand</button>
        </div>
      )}

      {gameOver && <button onClick={startGame}>New Game</button>}
    </main>
  );
}
