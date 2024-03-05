import { useState, useParams } from 'react'
import './App.css'
import Topo from './Components/Topo/Topo'

//Router
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//Components
import SearchBusca from './Components/SearchForm/SearchBusca'

//Pages
import Visualiza from './Views/Visualiza';
import Insere from './Views/Insere';
import Altera from './Views/Altera'
import Exclui from './Views/Exclui'
import Error from './Views/Error'
import Search from './Views/Search'

function App() {

  //Variavel que controla a pagina em que o usuario esta
  const[page, setPage] = useState(0);
 
  return (
    <div className="App">
      <BrowserRouter>
      <Topo />
      {/* Search - Busca */}
      {/* <SearchBusca /> */}
        <Routes>
          <Route path='/' element={<Visualiza />}></Route>
          <Route path='/produto' element={<Insere />}></Route>
          <Route path='/editProduct/:id' element={<Altera />}></Route>
          <Route path='/deleteProduct/:id' element={<Exclui />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='*' element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
