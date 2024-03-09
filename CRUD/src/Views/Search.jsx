import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//Table Cell
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Style da Table
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Search = () => {
    // Pegando o que vem do parametro da busca
    const [searchParams] = useSearchParams();

    //URL enviada para API
    const urlDB = "http://localhost:3000/produtos?" + searchParams;

    const [products, setProducts] = useState([]);

    const classes = useStyles();

    const navigate = useNavigate()

    //Metodo para ler o Item a ser BUSCADO
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(urlDB); //Lendo a URL do DB Json
            const data = await res.json(); //Convertendo no formato Json para leitura
            setProducts(data); //Alterando o estado da variavel de produtos alimentando ela com os novos produtos
            console.log(data)
        }
        fetchData();
    }, [urlDB]);

    // Função que redireciona os botões (Add-Edit-Delete)
    function handleClick(e) {
        e.preventDefault();
        let redirect = e.currentTarget.name
        let idProdEdit = e.currentTarget.id
        let idProdDelete = e.currentTarget.id
        let idVoltar = e.currentTarget.id

        if (redirect === 'add')
            navigate("/produto")

        if (redirect === 'edit')
            navigate("/editProduct/" + idProdEdit)

        if (redirect === 'delete')
            navigate("/deleteProduct/" + idProdDelete)

        if (idVoltar === 'voltar')
            navigate("/")
    }

    return (
        <div className="Container">
            <div className='topo'>
                <h1>Produtos</h1>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={classes.table}>
                            {/*Titulos das Colunas*/}
                            <TableCell><b>Produto</b></TableCell>
                            <TableCell align="center"><b>Tamanho</b></TableCell>
                            <TableCell align="center"><b>Cor</b></TableCell>
                            <TableCell align="center"><b>Gênero</b></TableCell>
                            <TableCell align="center"><b>Preço</b></TableCell>
                            <TableCell align="center"><b>Editar</b></TableCell>
                            <TableCell align="center"><b>Excluir</b></TableCell>
                        </TableRow>
                    </TableHead>
                    {products && products.map((row) => (
                        <TableBody>
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.nome}</TableCell>
                                <TableCell align="center">{row.tamanho}</TableCell>
                                <TableCell align="center">{row.cor}</TableCell>
                                <TableCell align="center">{row.genero}</TableCell>
                                <TableCell align="center">{row.preco}</TableCell>
                                <TableCell align="center">
                                    <button type="submit" id={row.id} name="edit" className="btnEdit" onClick={handleClick}><span className="material-symbols-outlined">edit</span></button>
                                </TableCell>
                                <TableCell align="center">
                                    <button type="submit" id={row.id} name="delete" className="btnDelete" onClick={handleClick}><span className="material-symbols-outlined">delete</span></button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
            {products.length >= 1 ? null :
                <div className="Container">
                    <h2>Nenhum produto encontrado</h2>
                    <input type='submit' id="voltar" onClick={handleClick} value="Voltar" />
                </div>
            }
        </div>
    )
}

export default Search