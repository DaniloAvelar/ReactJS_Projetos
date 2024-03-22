import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './Topo.css';


const Topo = () => {

  const localizacao = useLocation();

   useEffect(() => {
     //console.log(localizacao.pathname)
     changeTitle();
   });


  //Variavel que controla a pagina em que o usuario esta
  const [pageTitle, setPageTitle] = useState('');

  const changeTitle = () => {

    console.log(localizacao.pathname)

    if (localizacao.pathname === '/categorias') {

      setPageTitle('Categorias')
    }
    if (localizacao.pathname === '/') {
      setPageTitle('Produtos')
    }
    if ((localizacao.pathname !== '/categorias') && (localizacao.pathname !== '/')){
      setPageTitle('Erro') 
    }
  }

  return (
    <div className='topo'>
      <h1>{pageTitle}</h1>
    </div>
  )
}

export default Topo