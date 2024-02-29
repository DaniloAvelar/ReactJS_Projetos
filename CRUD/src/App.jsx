import { useState, useParams } from 'react'
import './App.css'
import Topo from './Components/Topo/Topo'

//Router
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//Pages
import Visualiza from './Views/Visualiza';
import Insere from './Views/Insere';
import Altera from './Views/Altera'
import Exclui from './Views/Exclui'

function App() {

  //Variavel que controla a pagina em que o usuario esta
  const[page, setPage] = useState(0);
 
  return (
    <div className="App">
      <BrowserRouter>
      <Topo />
        <Routes>
          <Route path='/' element={<Visualiza />}></Route>
          <Route path='/produto' element={<Insere />}></Route>
          <Route path='/editProduct/:id' element={<Altera />}></Route>
          <Route path='/deleteProduct/:id' element={<Exclui />}></Route>
        </Routes>
      </BrowserRouter>
    </div>


    // <div>
    //   <div className="topo">
    //     {/* Topo */}
    //     <Topo /> 
    //   </div>
    //   <div className="conteudo">
    //     {/* Conteudo */}
    //     <Visualiza page={page} setPage={setPage}/>
    //   </div>
    //   {/* MENU */}
    //   {/* <Menu /> */}

    // </div>
  )
}



export default App
