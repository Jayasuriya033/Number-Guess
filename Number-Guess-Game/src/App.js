import "./App.css";
import { BsArrowRepeat } from "react-icons/bs";

import React, { useState } from "react";

const GuessNumberGame = () => {
  /*---------------------- Use State Function ------------------------ */
  const [random, setRandom] = useState(generateRandom());
  const [userInput, setUserInput] = useState("");

  const [remainingChances, setRemainingChances] = useState(7);
  const [message, setMessage] = useState("");
  const [chanceMessage, setChanceMessage] = useState("Remaining Chances:");
  const [timeoutId, setTimeoutId] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  /*---------------------- Generate the Random Value --------------------- */
  function generateRandom() {
    let random = Math.floor(Math.random() * 100) + 1;
    return random;
  }
  /*---------------------- Refresh Button ------------------------ */
  const handleRefresh = () => {
    setUserInput("");
    setRemainingChances(7);
    setRandom(generateRandom());
    setMessage("");
    setChanceMessage("Remaining Chances: ");
    setGameOver(false);
  };
  /*----------------------After the game is completed, all data is Automatically Empty -------------------- */
  const handleInputEmpty = () => {
    setUserInput("");
    if (remainingChances === 0) {
      setMessage(`Game over. The correct number was  ${random}.`);
      setChanceMessage("Sorry, Try again🔁");
      setGameOver(true);
      setRemainingChances("");
      setTimeout(handleRefresh, 3000);
    }
  };
  /*---------------------- Get a input Function and setting time ------------------------ */

  const handleInputChange = (e) => {
    setUserInput(e.target.value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {}, 3000);

    setTimeoutId(newTimeoutId);

    if (e.target.value !== "") {
      handleGuess(e.target.value);
    }
  };
  /*---------------------- Value guessing Function ------------------------ */

  const handleGuess = (value) => {
    if (userInput === "") {
      setRemainingChances(remainingChances - 1);
    }
    if (!value) return;
    value = +value;
    if (userInput) {
      if (value === random) {
        setChanceMessage("You won! 🎉");
        setGameOver(true);
        setRemainingChances("");
        setMessage(`Congratulations! You guessed the number: ${random}`);
        setTimeout(handleRefresh, 3000);
      } else if (value > random) {
        setMessage("");
        setMessage(`${value} is too High...`);
        setTimeout(handleInputEmpty, 1000);
      } else if (value < random) {
        setMessage("");
        setMessage(`${value} is too Low...`);
        setTimeout(handleInputEmpty, 1000);
      }
    }
  };

  /*---------------------- Return Values ------------------------ */
  return (
    <div className="container">
      <div className="container-box">
        <h1 className="topic">Guess the number between 1 and 100</h1>
        <p className="remaining">
          {chanceMessage} {remainingChances}
        </p>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={gameOver}
          placeholder="Enter a number..."
        />
        <p className="result">{message}</p>
        <button className="btn btn-secondary" onClick={handleRefresh}>
          <BsArrowRepeat /> Refresh
        </button>
      </div>
    </div>
  );
};

export default GuessNumberGame;
