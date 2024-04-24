import { useEffect, useRef, useState } from "react";
import "./test-component.css";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function MotMotMotus() {
  // hiddenWord est mon mot de départ. Il faudra utiliser un state.
  let hiddenWord = "bar"

  // clickedLetters fait référence à chaque touche cliquée, puis stockée dans un tableau.
  const [clickedLetters, setClickedLetters] = useState(["", "", ""]);

  // input fait référence aux touches cliquées du clavier.
  const [input, setInput] = useState("");

  // colours faire référence à un tableau de couleurs.
  const [colours, setColours] = useState([]);

  console.log("Mes couleurs ?", colours);
  console.log("Mes lettres ?", clickedLetters)

  // la fonction addClickedLetter se lance donc à chaque fois que l'on clique sur une lettre.

  const addClickedLetter = () => {
    // D'abord, on fait une shallow copy du tableau clickedLetters.
    // Exemple : je clique sur le "t", mon tableau sera ["t", "", ""];
    let updatedAnswers = [...clickedLetters];

    // Puis j'itère sur ce tableau. Je veille à n'itérer que sur les trois derniers éléments.
    // Dès lors qu'une string vide est rencontrée, je remplace la chaîne en question avec la 
    // dernière lettre de l'input, et j'utilise break pour forcer la boucle à s'arrêter. 

    for (let i = clickedLetters.length - 3; i < updatedAnswers.length; i++) {
      if (!updatedAnswers[i]) {
        updatedAnswers[i] = input[input.length - 1];
        break;
      }
    }

    // Je mets à jour le tableau de lettres avec ce qu'à permis de faire ma boucle for.
    setClickedLetters(updatedAnswers);

    // Ci-dessous, je vérifie si la dernière chaîne de caractère est dotée d'une lettre.
    // Si oui, je lance la fonction qui permet de dire les bonnes et mauvaises réponses.
    if (updatedAnswers[updatedAnswers.length - 1]) {
      const lastThreeElements = updatedAnswers.slice(updatedAnswers.length - 3);

      // Ici, j'exécute la fonction coloursChecker en passant les trois dernières lettres enregistrées.
      coloursChecker(lastThreeElements);

      // Je termine en ajoutant un nouveau tableau.
    }
  };

  const coloursChecker = (updatedAnswers) => {
    const colourArray = updatedAnswers.map((letter, index) => {
      if (letter === hiddenWord[index]) {
        return "blue";
      } else if (hiddenWord.includes(letter)) {
        return "orange";
      } else {
        return "white";
      }
    });

    // J'ajoute les trois couleurs à mon tableau colours, et j'utilise cette information dans le
    // return du JSX.
    setColours((prev) => {
      return [...prev, ...colourArray];
    });


    // Je veux ici récupérer les trois derniers éléments de mon state colours.
    // Je veux vérifier si les trois derniers éléments obtenus sont de couleur bleue.
    const slicedArray = colourArray.slice(-3);
    const threeBlueAnswers = slicedArray.every(el => el === "blue");

    // Le if ci-dessous me permet de créer les trois prochaines cases vides.
    // Il me permet aussi de ne pas relancer un map si les trois derniers éléments de colours
    // sont de couleur bleu. Le jeu étant fini quand toutes les cases sont bleues, c'est nickel.

    if (!threeBlueAnswers) {
      setClickedLetters((prev) => {
        return [...prev, "", "", ""];
      });
    }
  };

  const keyboard = useRef();

  // au premier chargement de la page, la fonction addClickedLetter est appelée à vide.
  // autrement dit, il ne se passe rien, puisque input.length === 0.
  // le useEffect se relancera à chaque fois qu'une lettre entrera dans l'input.

  useEffect(() => {
    if (input.length) {
      addClickedLetter(clickedLetters);
    }
  }, [input]);

  return (
    <main id="test-component">
      <section id="game-grid">
        {clickedLetters.map((el, index) => {
          return (
            <div
              key={Math.random() * 1000}
              className="square-box"
              style={{ backgroundColor: colours[index] }}
            >
              {el}
            </div>
          );
        })}
      </section>

      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName={"default"}
        onChange={(input) => setInput(input)}
      />
    </main>
  );
}

export default MotMotMotus;
