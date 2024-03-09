import { useState, useParams } from 'react'
import './App.css'
import Topo from './Components/Topo/Topo'

//Router
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//Components
import SearchBusca from './Components/SearchForm/SearchBusca'
import Navigation from './Components/Navigation/Navigation'

//Context
// import TitleContext from './Components/Context/ChangeTitleContext'

//Pages
import Visualiza from './Views/Visualiza';
import Insere from './Views/Insere';
import Altera from './Views/Altera'
import Exclui from './Views/Exclui'
import Error from './Views/Error'
import Search from './Views/Search'

//Pages - Categoria
import Category from './Views/Category/IndexCategory'



function App() {

 
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
      {/* <Topo /> */}
      {/* Search - Busca */}
      {/* <SearchBusca /> */}
        <Routes>
          <Route path='/' element={<Visualiza />}></Route>
          <Route path='/produto' element={<Insere />}></Route>
          <Route path='/editProduct/:id' element={<Altera />}></Route>
          <Route path='/deleteProduct/:id' element={<Exclui />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='*' element={<Error />}></Route>
          {/* CATEGORIAS */}
          <Route path='/categorias' element={<Category />}></Route>

          <Route path='/navigation' element={<Navigation />}></Route>
        </Routes>
      </BrowserRouter>

      {/* <Category.consumer>
        <Topo />
      </Category.consumer> */}

    </div>
  )
}

export default App
