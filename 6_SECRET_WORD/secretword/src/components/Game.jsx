import './Game.css';
import {useState, useRef} from 'react';

const Game = ({
    verify,
    pickedWord,
    pickedCategory,
    letter,
    guessedLetters,
    wrongLetters,
    guesses,
    score,

}) => {

    //Criando State da letra que foi jogada
    const [letra, setLetra] = useState("");

    //State do REF, para cursor ficar piscando dentro do input
    const letraInputRef = useRef(null);

    //Envio do Formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        //disparando a função Verificação com a letra digitada
        verify(letra);

        //Apagando a letra após jogar
        setLetra(""); 

        //Focus do cursor no input branco
        letraInputRef.current.focus();

    }

  return (
    <div className="game">
        <p className="pontos">
            <span>Pontuação: {score}</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className="tipo">
            Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas(s)</p>    
        <div className="wordContainer">
           {/* Mapeando cada letra que vem da palavra, e checando se ela existe na mesma, 
           então inclui, se nao imprime o quadrado branco*/}
          {letter.map((letra, i) =>
            guessedLetters.includes(letra) ? (
                <span key={i} className='letter'>{letra}</span>
            ):(
                <span key={i} className='blankSquare'></span>
            )
          )}
           
        </div>
        <div className="letterContainer">
            <p>Digite abaixo uma letra Ex: "a" e clique em [ Jogar ]</p>
            <form onSubmit={handleSubmit}> 
                <input 
                    type="text" 
                    name="letter" 
                    maxLength="1" 
                    required 
                    onChange={(e) => setLetra(e.target.value)}
                    value={letra}
                    ref={letraInputRef}
                />
                <button>Jogar</button>
            </form>
        </div>
        <div className="letrasUsadas">
            <p>Letras já ustilizadas:</p>
            {wrongLetters.map((letra, i) => 
                <span key={i}>{letra}, </span>
            )}
        </div>
    </div>
  )
}

export default Game