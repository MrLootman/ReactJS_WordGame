import { useEffect, useRef, useState } from "react";
import "../styles/game-start.css";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const arrayOfWords = [
  {
    word: "Coucou",
  },
  {
    word: "Salut",
  },
  {
    word: "Bonjour",
  },
];

function GameStart() {
  const [input, setInput] = useState("");
  const [hiddenWord, setHiddenWord] = useState([]);
  const [errors, setErrors] = useState([]);

  const keyboard = useRef();

  function randomWord(arr, setterFunc) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    const splittedWord = arr[randomNumber].word.toLowerCase().split("");
    setterFunc(splittedWord);
  }

  function checkErrors() {
    if (input) {
      if (!hiddenWord.includes(input[input.length - 1])) {
        setErrors((prev) => [...prev, "🔴"])
      }
    }
    return;
  }

  useEffect(() => {
    randomWord(arrayOfWords, setHiddenWord);
  }, []);

  useEffect(() => {
    checkErrors();
  }, [input])

  const onChange = (input) => {
    setInput(input);
    // setInput(input[input.length - 1]);
  };

  // const onChangeInput = (event) => {
  //   const input = event.target.value;
  //   setInput(input);
  //   keyboard.current.setInput(input);
  // };

  return (
    <main className="game-start">
      <section className="errors">
        {errors.map((el, index) => (
          <div key={index}>{el}</div>
        ))}
      </section>
      <section className="hidden-word">
        {hiddenWord.map((el, index) => {
          return <div key={index}>{input.includes(el) ? el : "_"}</div>;
        })}
      </section>

      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName={"default"}
        onChange={onChange}
      />
    </main>
  );
}

export default GameStart;
