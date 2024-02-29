import React, { useState, useEffect } from 'react'
import 'react-data-grid/lib/styles.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom";
//Table Cell
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../Views/Global.css';
// import Alert from '@mui/material/Alert';


//URL que esta rodando a API Json Server
const urlDB = "http://localhost:3000/produtos"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

//Criando a cor do Botão NOVO PRODUTO

//Metodo GET - Fetch
const Visualiza = (props) => {

    let navigate = useNavigate(); 

    //Variavel de Estado dos Produtos
    const [products, setProducts] = useState([]);

    //Variavel que controla a pagina em que o usuario esta
    const[page, setPage] = useState(0);

    const classes = useStyles();

    useEffect(() => {
        async function fetchData(){
            const res = await fetch(urlDB); //Lendo a URL do DB Json
            const data = await res.json(); //Convertendo no formato Json para leitura
            setProducts(data); //Alterando o estado da variavel de produtos alimentando ela com os novos produtos
        }
        fetchData();
    }, []);

    // Função que redireciona os botões (Add-Edit-Delete)
    function handleClick(e){
      e.preventDefault();
      let redirect = e.currentTarget.name
      let idProdEdit = e.currentTarget.id
      let idProdDelete = e.currentTarget.id

      if(redirect === 'add')
        navigate("/produto")

     if (redirect === 'edit')
        navigate("/editProduct/"+idProdEdit)

     if (redirect === 'delete')
        navigate("/deleteProduct/"+idProdDelete)
      console.log(idProdDelete)
      
    }

  return (
    <div className="Container">
    {/* <div className='containerDataGrid'> */}
      <div className="btnContainer">
        <Button
          id="page-1"
          name="add"
          color="primary"
          variant="contained"
          startIcon={<AddIcon />} 
          onClick={handleClick}
        >
        Adicionar Produto
        </Button>
      </div>
      
        {/* GET - Proddutos - Fetch*/}
        {/* <ul>
        {products.map((produto) => (
             <li key={produto.id}>
             {produto.nome} - R$: {produto.preco} - Cor: {produto.cor}
           </li>
        ))}
        </ul> */}
        {/* <DataGrid className='dataGrid' columns={columns} rows={rows}/> */}
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/*Titulos das Colunas*/}
            <TableCell>Produto</TableCell>
            <TableCell align="center">Tamanho</TableCell>
            <TableCell align="center">Cor</TableCell>
            <TableCell align="center">Gênero</TableCell>
            <TableCell align="center">Preço</TableCell>
            <TableCell align="center">Editar</TableCell>
            <TableCell align="center">Excluir</TableCell>

          </TableRow>
        </TableHead>
          <TableBody>
            {products.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.nome}</TableCell>
              <TableCell align="center">{row.tamanho}</TableCell>
              <TableCell align="center">{row.cor}</TableCell>
              <TableCell align="center">{row.genero}</TableCell>
              <TableCell align="center">{row.preco}</TableCell>
              <TableCell align="center">
              <button type="submit" id={row.id} name="edit" className="btnEdit" onClick={handleClick}><span class="material-symbols-outlined">edit</span></button>
                {/* <Button
                  id={row.id}
                  name="edit"
                  variant="contained"
                  startIcon={<EditSharpIcon />}
                  onClick={handleClick}
                >
                </Button>  */}
              </TableCell>
              <TableCell align="center">
                {/* <input type="submit" id={row.id} name="delete" onClick={handleClick}></input> */}
                <button type="submit" id={row.id} name="delete" className="btnDelete" onClick={handleClick}><span class="material-symbols-outlined">delete</span></button>
                {/* <Button
                  id={row.id}
                  name="delete"
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={handleClick}
                ></Button> */}
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
    {/* </div> */}
    </div>
  )
}

export default Visualiza