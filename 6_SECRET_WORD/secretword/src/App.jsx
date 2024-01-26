
//CSS
import './App.css'

//REACT
import { useCallback, useEffect, useState } from 'react';

//DATA
import {wordsList} from "./data/words";

//COMPONENTS
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//Estagios do jogo
const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

//Variavel da qtde de tentativas de jogadas
const qtdeJogadas = 3;

function App() {
  //STATEs
  //Passando a palavra "Start" para o useStage
  const [gameStage, setGameStage] = useState(stages[0].name); 

  //iniciando as palavras importadas
  const [words] = useState(wordsList);
  // State das Palavras quebradas
  const [pickedWord, setPickedWord] = useState(""); 
  // State das Categorias quebradas
  const [pickedCategory, setPickedCategory] = useState(""); 
  // State das Letras quebradas
  const [letter, setLetters] = useState([]); 

  // States da Palavra a ser advinhada
  // Letras Tentdas
  const [guessedLetters, setGuessedLetters] = useState([]);
  //Letras Erradas
  const [wrongLetters, setWrongLetters] = useState([]);
  // Tentativas
  const [guesses, setGuesses] = useState(qtdeJogadas);
  //Pontuação
  const[score, setScore] = useState(0);

  // Quebrar Palavras e Categorias
  const pickWordAndCategory = () =>{

    const categories = Object.keys(words); // Lendo as KEYS do objeto categoria
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; //Pegando uma categoria aleatoria, baseandop-se no tamanho do objeto

    //Pegando uma palavra aleatoria do array de objetos
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return{word, category}

  }

  //Função inicia o Game
  const startGame = useCallback(() => {

    //Limpando os States das palavras
    clearStates();

    // Criando variaveis baseado no retorno da função acima e retornando 
    const {word, category} = pickWordAndCategory() 

    //Trasformando a palavra em letras divididas
    let wordLetters = word.split("");

    //Transformando em letras minusculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(wordLetters);

    //Setando os Estados *** 
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    

    setGameStage(stages[1].name); //Setando a variavel para o nome "game"
  });

  //Função que Finaliza o Jogo
  const verify = (letra) => {

    const normalizeLetra = letra.toLowerCase();

    //Checando se a letra ja foi utilizada de alguma maneira e retornando a msm

    /* esse bloco checa se o usuario ja tentou aquela determinada letra,
       para não subtrair do total de tentativas dele.
       Ex.: tentou a letra "D" mais de uma vez, ele processa somente uma tentativa 
    */

    if(
      guessedLetters.includes(normalizeLetra) || 
      wrongLetters.includes(normalizeLetra)
    ){
      return;
    }

    //Inserindo as letras acertadas e erradas nos seus lugares, [ . . . . .] ou letras tentadas a, b, d, ...

    //Letra certa
    if(letter.includes(normalizeLetra))
    {
      setGuessedLetters((letraAtualCerta) => [
        ...letraAtualCerta,
        normalizeLetra
      ])
    }else {
      //Letra errada
      setWrongLetters((letraAtualErrada) => [
        ...letraAtualErrada,
        normalizeLetra
      ]);

      // Diminuindo a qtde de tentativas a cada erro do jogador
      setGuesses((letraErrada) => letraErrada -1)
    }
  };

    //Função que limpa todos os STATES das letras
    const clearStates = () => {
      setGuessedLetters([]);
      setWrongLetters([]);
    };
    // CONDIÇÃO DE DERROTA ***
    /* Monitorando as tentativas, para saber quando ela chega a <= 0 
      O 2º argumento da função useEffect é sempre o dado que vc quer monitorar */
    useEffect(() => {
      if(guesses <= 0)
      {
        //Limpando todos os States das letras
        clearStates();

        setGameStage(stages[2].name);
      }
    }, [guesses])


    //CONDIÇÃO DE VITÓRIA
    useEffect(() => {

      /* Array de letras únicas para checar
      O (Set) faz com que as letras se tornem unicas sem repetição */
      const letrasUnicas = [...new Set(letter)]; 
      //Condição de vitoria de cada palavra
      if(guessedLetters.length === letrasUnicas.length){
        //adicionando pontuação
        setScore((scoreAtual) => (scoreAtual += 100));

        //Reinicia o jogo com uma nova palavra
        startGame();
      }
    }, [guessedLetters])


    //Função que Reinicia o Jogo
    const retry = () => {
      //Zerando a pontuação
      setScore(0);
      // Resetando as tentativas para valor padrão
      setGuesses(qtdeJogadas);
      setGameStage(stages[0].name); //Setando a variavel para o nome "End"
    };





  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game 
          verify={verify} 
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letter={letter}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
      
    </div>
  )
}

export default App
