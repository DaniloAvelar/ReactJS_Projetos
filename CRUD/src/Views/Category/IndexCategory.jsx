import React, { useState, useEffect } from 'react';
import { useFetch } from '../../Components/Hooks/useFetch';
import './indexCategory.css';

//Modal
import Modal from '../../Components/Modal/Category/editModal';
import DeleteModal from '../../Components/Modal/Category/deleteModal';
import CreateModal from '../../Components/Modal/Category/createModal'

const IndexCategory = () => {

    //URL que esta rodando a API Json Server
    const urlDB = "http://localhost:3000/categorias"

    // Custom Hook pegando os valores
    //NumRow é a qtde de linhas que veio do array
    const { data } = useFetch(urlDB);

    //Variavel de estado que controla o ID do item clicado na tela para edição
    const [idItem, setIdItem] = useState([]);
    const [categoria, setCategoria] = useState('');
    //const [dtCriacao, setDtCriacao] = useState();

    //Controle da Modal
    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);

    let urlIdCategory = '';

    function handleEdit(e) {

        e.preventDefault();
        setCategoria('');
        setIdItem(null);
        //Pega o id do item clicado
        let idCateg = e.currentTarget.id;

        //Setando o ID do Item na variavel de estado parqa pegar na outra tela
        setIdItem(idCateg);

        //Montando a nova URL com ID da categoria
        urlIdCategory = urlDB + '/' + idCateg

        //console.log("UrlId:", urlIdCategory)

        handlepopulamodal(idCateg)

        //Abro o Modal
        setOpenModal(true);
    }

    function handleDelete(e) {

        e.preventDefault();
        setCategoria('');
        setIdItem(null);
        //Pega o id do item clicado
        let idCateg = e.currentTarget.id;
        //Setando o ID do Item na variavel de estado parqa pegar na outra tela
        setIdItem(idCateg);

        //Montando a nova URL com ID da categoria
        urlIdCategory = urlDB + '/' + idCateg

        handlepopulamodal(urlIdCategory)

        setDeleteModal(true)
    }

    function handleCreate(e){
        e.preventDefault();
        setCreateModal(true)
    }

    const handlepopulamodal = async () => {
        const response = await fetch(urlIdCategory);
        const data = await response.json();
        setCategoria(data);
    }

    return (
        <div className="Container">
            <div className='topo'>
                <h1>Categorias</h1>
            </div>
            <button type="submit" name='categoria' className='btnCadastrar' onClick={handleCreate}>Nova Categoria</button>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        ID
                    </div>
                    <div className="col">
                        Categoria
                    </div>
                    <div className="col">
                        DT Criação
                    </div>
                    <div className="col">
                        DT Atualização
                    </div>
                    <div className="col">
                        Editar
                    </div>
                    <div className="col">
                        Excluir
                    </div>
                </div>
                {data && data.map((item) => (
                    <div className="row2" key={item.id}>
                        <div className="col">{item.id}</div>
                        <div className="col">{item.descricao}</div>
                        <div className="col">{item.dtCriacao}</div>
                        <div className="col">{item.dtAtualizcao}</div>
                        <div className="col">
                            <button type="submit" name='categoria' id={item.id} className="btnEdit" onClick={handleEdit}><span className="material-symbols-outlined">edit</span></button>
                        </div>
                        <div className="col">
                            <button type="submit" name="delete" id={item.id} className="btnDelete" onClick={handleDelete}><span className="material-symbols-outlined">delete</span></button>
                        </div>
                    </div>
                ))}
                {/* MODAL */}
                <Modal isOpen={openModal} closeModal={() => setOpenModal(!openModal)} idItem={idItem} object={categoria}>
                    {/* Children */}
                </Modal>
                <DeleteModal isOpen={deleteModal} closeModal={() => setDeleteModal(!deleteModal)} idItem={idItem} object={categoria}>
                    {/* O modal esta montado no arquivo da propria Modal */}
                </DeleteModal>
                <CreateModal isOpen={createModal} closeModal={() => setCreateModal(!createModal)}>

                </CreateModal>
            </div>
        </div> //Fim Container
    )
}

export default IndexCategory