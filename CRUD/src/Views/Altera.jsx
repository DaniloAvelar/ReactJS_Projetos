import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../Components/Hooks/useFetch'

import '../Views/Global.css';



const Altera = () => {

  //Pegando o parametro passado na rota (:id)
  const { id } = useParams();

  //URL que esta rodando a API Json Server
  const urlDB = "http://localhost:3000/produtos/" + id

  const { data, configPut } = useFetch(urlDB);

  //Setando o Navigate
  const navigate = useNavigate();

  //Variavel de Estado dos Produtos
  const [products, setProducts] = useState([]);

  //Dados do Produto para PUT
  const [enome, setNome] = useState([]);
  const [etamanho, setTamanho] = useState([]);
  const [egenero, setGenero] = useState([]);
  const [ecor, setCor] = useState([]);
  const [epreco, setPreco] = useState([]);

  //Função FETCH que traz os dados lendo a URL+id passado no parametro
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(urlDB); //Lendo a URL do DB Json
      const data = await res.json(); //Convertendo no formato Json para leitura
      setProducts(data); //Alterando o estado da variavel de produtos alimentando ela com os novos produtos
      console.log(data)

      //Retornando os dados para os campos INPUT TEXT
      const nome = document.querySelector("#nome");
      const tamanho = document.querySelector("#tamanho");
      const cor = document.querySelector("#cor");
      const genero = document.querySelector("#genero");
      const preco = document.querySelector("#preco");

      nome.value = data.nome;
      tamanho.value = data.tamanho;
      cor.value = data.cor;
      genero.value = data.genero;
      preco.value = data.preco;
      // ================================================

    }
    fetchData();
  }, []);

  const handleCancel = async => {
    navigate("/")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    //Criando um objeto para mandar para o PUT - UPDATE
    const editProduct = {
      id: id,
      nome: nome.value,
      tamanho: tamanho.value,
      cor: cor.value,
      genero: genero.value,
      preco: preco.value,
    }
    configPut(editProduct, "PUT");

  }

  return (
    <div className="Container">
      <div className='topo'>
        <h1>Produtos</h1>
      </div>
      <div className="MotherEdit">
        <div className="ContainerEdit">
          <h3>Alterar informações do produto</h3>
          <form>
            <label htmlFor="id" value={products.id}></label>

            <label htmlFor="nome">Descrição:
              <input type="text" id="nome" name="nome" onChange={(e) => setNome(e.target.value)} />
            </label>

            <label htmlFor="tamanho">Tamanho:
              <input type="text" id="tamanho" name="tamanho" onChange={(e) => setTamanho(e.target.value)} />
            </label>

            <label htmlFor="cor">Cor:
              <input type="text" id="cor" name="cor" onChange={(e) => setCor(e.target.value)} />
            </label>

            <label htmlFor="genero">Gênero:
              <input type="text" id="genero" name="genero" onChange={(e) => setGenero(e.target.value)} />
            </label>

            <label htmlFor="preco">R$:
              <input type="text" id="preco" name="preco" onChange={(e) => setPreco(e.target.value)} />
            </label>


            <input type="submit" className='btnCadastrar' onClick={handleSubmit} value="Salvar Alterações" />
            <input type="submit" className='btnCancelar' onClick={handleCancel} value="Cancelar" />
          </form>
          {/* <Alert severity="error">This is an error Alert.</Alert> */}
        </div>
      </div>
    </div>
  )
}

export default Altera