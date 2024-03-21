import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../Components/Hooks/useFetch'
import '../Views/Global.css';

const Exclui = () => {

  let navigate = useNavigate();

  //Pegando o parametro passado na rota (:id)
  const { id } = useParams();

  //URL que esta rodando a API Json Server
  const urlDB = "http://localhost:3000/produtos/" + id

  const { data, configDelete } = useFetch(urlDB);

  //Variavel de estado do produto
  const [products, setProducts] = useState([]);

  //Metodo para ler o Item a ser excluído
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(urlDB); //Lendo a URL do DB Json
      const data = await res.json(); //Convertendo no formato Json para leitura
      setProducts(data); //Alterando o estado da variavel de produtos alimentando ela com os novos produtos
      console.log(data)
    }
    fetchData();
  }, [urlDB]);

  const handleDelete = async (e) => {
    e.preventDefault();

    //Metodo Eclusão
    configDelete("DELETE")

  }

  const handleCancel = async => {
    navigate("/")
  }

  return (
    <div className="Container">
      <div className='topo'>
        <h1>Produtos</h1>
      </div>
      {/* <h3>Excluir produto</h3> */}
      <div className="divAlert">
        <span className="material-symbols-outlined">warning</span> Tem certeza que deseja <b>"EXCLUIR"</b> esse produto?
      </div><br />
      <div className="ContainerDelete">
        <div className='divContainerDelete'>
          <div className='containerGrid'>
            <label>Produto</label>
          </div>
          <div className='containerGrid'>
            <label>Tamanho</label>
          </div>
          <div className='containerGrid'>
            <label>Cor</label>
          </div>
          <div className='containerGrid'>
            <label>Gênero</label>
          </div>
          <div className='containerGrid'>
            <label>Preço</label>
          </div>
        </div>
        {
          <div className='divContainerDelete'>
            <div className='containerGrid'>
              {products.nome}
            </div>
            <div className='containerGrid'>
              {products.tamanho}
            </div>
            <div className='containerGrid'>
              {products.cor}
            </div>
            <div className='containerGrid'>
              {products.genero}
            </div>
            <div className='containerGrid'>
              {products.preco}
            </div>
          </div>
        }
      </div>

      <input type="submit" className='btnCancelar' onClick={handleDelete} value="Excluir Produto" />
      <input type="submit" className='btnEdit' onClick={handleCancel} value="Cancelar" />

    </div>
  )
}

export default Exclui