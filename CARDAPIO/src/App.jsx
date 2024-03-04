import * as React from "react";
import { useState } from 'react'
import logo from './assets/Logo_rashtaurante-removebg.png'
import './App.css'
import { Navegacao } from './Navegacao'
import {ItemCardapio} from './ItemCardapio'
import { pratosPrincipais, sobremesas, bebidas } from './cardapio'
import { MenuBar } from './Components/MenuBar/MenuBar'



export function App() {
  
  //Criando uma Lista das listas do Menu de opções
  const paginasMenu = [pratosPrincipais, sobremesas, bebidas]

  //variavel de controle do menu (useState)
  const [paginaSelecionada, setPaginaSelecionada] = useState(0);
  
  return <>
    <MenuBar />
    <img src={logo} alt="" className='capa'/>
    <Navegacao setPaginaSelecionada={setPaginaSelecionada}/>
    <div className='menu'>
      {paginasMenu[paginaSelecionada].map(item => <ItemCardapio nome={item.nome} descricao={item.descricao} preco={item.preco} imagem={item.imagem}/>)}
    </div>
  </>
}