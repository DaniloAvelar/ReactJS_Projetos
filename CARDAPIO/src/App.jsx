import { useState } from 'react'
import restaurante from './assets/hashtaurante.webp'
import logo from './assets/Logo_rashtaurante-removebg.png'
import './App.css'
import { Navegacao } from './Navegacao'
import {ItemCardapio} from './ItemCardapio'
import { pratosPrincipais, sobremesas, bebidas } from './cardapio'

export function App() {
  
  //Criando uma Lista das lintas do Menu de opções
  const paginasMenu = [pratosPrincipais, sobremesas, bebidas]
  //variavel de controle do menu (useState)
  const [paginaSelecionada, setPaginaSelecionada] = useState(0);
  
  return <>
    <img src={logo} alt="" className='capa'/>
    <Navegacao setPaginaSelecionada={setPaginaSelecionada}/>
    <div className='menu'>
      {paginasMenu[paginaSelecionada].map(item => <ItemCardapio nome={item.nome} descricao={item.descricao} preco={item.preco} imagem={item.imagem}/>)}
    </div>
  </>
}