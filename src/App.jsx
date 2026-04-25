import "./App.css";
import { getRandomWord } from "./utils";
import { useState } from "react";

function App() {
  const [currWord, setCurrentWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [input, setInput] = useState("");
  const [guessesLeft, setGuessesLeft] = useState(10);
  const [gameStatus, setGameStatus] = useState("playing"); // playing, won, lost

  // display word
  const generateWordDisplay = () => {
    let display = "";
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        display += letter + " ";
      } else {
        display += "_ ";
      }
    }
    return display;
  };

  // handle input change
  const handleChange = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.length !== 1) return;

    if (guessedLetters.includes(input)) {
      setInput("");
      return;
    }

    const newGuessed = [...guessedLetters, input];
    setGuessedLetters(newGuessed);

    // wrong guess
    if (!currWord.includes(input)) {
      setGuessesLeft(guessesLeft - 1);
    }

    setInput("");
  };

  // check win/lose
  const checkGameStatus = () => {
    let won = currWord
      .split("")
      .every((letter) => guessedLetters.includes(letter));

    if (won) {
      setGameStatus("won");
    } else if (guessesLeft <= 0) {
      setGameStatus("lost");
    }
  };

  // run check every render
  useState(() => {
    checkGameStatus();
  }, [guessedLetters, guessesLeft]);

  // reset game
  const resetGame = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setGuessesLeft(10);
    setGameStatus("playing");
  };

  return (
    <div className="card">
      <h1>Guess The Word</h1>

      <h3>Word Display</h3>
      <p>{generateWordDisplay()}</p>

      <h3>Guessed Letters</h3>
      <p>{guessedLetters.length > 0 ? guessedLetters.join(", ") : "-"}</p>

      <h3>Guesses Left: {guessesLeft}</h3>

      {gameStatus === "playing" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            maxLength="1"
          />
          <button type="submit">Guess</button>
        </form>
      )}

      {gameStatus === "won" && (
        <>
          <h2>You WON 🎉</h2>
          <button onClick={resetGame}>Play Again</button>
        </>
      )}

      {gameStatus === "lost" && (
        <>
          <h2>You LOST 😢</h2>
          <p>The word was: {currWord}</p>
          <button onClick={resetGame}>Play Again</button>
        </>
      )}
    </div>
  );
}

export default App;