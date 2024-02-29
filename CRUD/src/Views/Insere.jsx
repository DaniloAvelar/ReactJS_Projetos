import { useState } from 'react';
import { useFetch } from '../Components/Hooks/useFetch' 
import { useNavigate } from 'react-router-dom';
import '../Views/Global.css';

//URL que esta rodando a API Json Server
const urlDB = "http://localhost:3000/produtos"

const Insere = () => {

  const {data, configPost} = useFetch(urlDB); 

  //Dados do Produto para POST
  const [nome, setNome] = useState([]);
  const [tamanho, setTamanho] = useState([]);
  const [genero, setGenero] = useState([]);
  const [cor, setCor] = useState([]);
  const [preco, setPreco] = useState([]);

  let navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Criando um objeto para mandar para o POST
    const product = {
      nome: nome,
      tamanho: tamanho,
      cor: cor,
      genero: genero,
      preco: preco,
    }

    // Regras para o POST

    // POST
    configPost(product, "POST")

  }

  const handleCancel = async => {
    setNome("")
    setTamanho("")
    setCor("")
    setGenero("")
    setPreco("")

    navigate("/")
  }

  return (
    <div className="Container">
      <h3>Cadastrar novo produto</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Nome do Produto' required />
            <input type="text" name="tamanho" value={tamanho} onChange={(e) => setTamanho(e.target.value)} placeholder='Tamanho P - M - G' required/>
            <input type="text" name="cor" value={cor} onChange={(e) => setCor(e.target.value)} placeholder='Cor do Produto' required/>
            <input type="text" name="genero" value={genero} onChange={(e) => setGenero(e.target.value)} placeholder='Masc. e/ou Fem.' required/>
            <input type="text" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder='R$ Preço' required/>
            <input type="submit" className='btnCadastrar' value="Cadastrar Produto" />
            <input type="submit" className='btnCancelar' onClick={handleCancel} value="Cancelar" />
        </form>
        {/* <Alert severity="error">This is an error Alert.</Alert> */}
    </div>
  )
}

export default Insere