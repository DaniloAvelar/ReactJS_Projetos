import React, { useEffect, useState } from 'react'
import { useFetch } from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import '../styleModal.css'



const Modal = ({ isOpen, children, closeModal, idItem, object }) => {


    //URL que esta rodando a API Json Server
    const urlDB = "http://localhost:3000/categorias/" + idItem
    const { data, configPut } = useFetch(urlDB);

    //Setando o Navigate
    const navigate = useNavigate();

    const BackgroudModal = {
        position: 'fixed',
        whidth: '100%',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: "rgb(0,0,0, 0.7)",
        zIndex: '1000',
    }

    const ModalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        paddingTop: '50px',
        width: '600px',
        height: '500px',
        backgroundColor: "#fff",
        borderRadius: '8px',
        // zIndex: '1000',
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Pegando a data tual para crava no campo Data Alteração da categoria.
        const current = new Date()
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        //Objeto que será passado para UPDATE
        const objUpdate = {
            id: idItem,
            descricao: descricao.value,
            dtCriacao: dtCriacao.value,
            dtAtualizcao: date,
        }

        configPut(objUpdate, "PUT");
    }


    if (isOpen) {

        const input = document.querySelector("#descricao")

        if (input) {

            input.value = object.descricao;
        }
    }




    if (isOpen) {
        return (
            <div style={BackgroudModal}>
                <div style={ModalStyle}>
                    {/* <div className="divChildren">
                        {children}
                    </div> */}
                    <div className="divConteudo">
                        <div className="divAlertAlter">
                            <span className="material-symbols-outlined">settings</span> Alterar informações do produto
                        </div>
                        <form>

                            <label htmlFor="id" value={object.id}></label>


                            <label htmlFor="descricao">Descrição:
                                <input type="text" id="descricao" name="descricao" />
                            </label>
                            <br />
                            <br />
                            <label htmlFor="dtCriacao">Data Criação:
                                <input type="text" name="dtCriacao" id="dtCriacao" value={object.dtCriacao} />
                            </label>
                        </form>
                        {/* <Alert severity="error">This is an error Alert.</Alert> */}
                    </div>
                    <div className="divButtons">
                        <button type='submit' className='btnSalvar' onClick={handleSubmit}>Salvar</button>
                        <button type='submit' className='btnCancelar' onClick={closeModal}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

export default Modal