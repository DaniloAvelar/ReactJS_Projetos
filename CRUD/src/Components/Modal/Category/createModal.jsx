import React, { useEffect, useState } from 'react'
import { useFetch } from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
// import '../styleModal.css'



const Modal = ({ isOpen, closeModal, idItem, object }) => {


    //URL que esta rodando a API Json Server
    const urlDB = "http://localhost:3000/categorias"
    const { data, configPost } = useFetch(urlDB);

    //Setando o Navigate
    const navigate = useNavigate();

    //Variaveis dos Campos da MODEL CATEGORIA
    const [categoria, setCategoria] = useState([]);

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
        console.log('Entrei no Handle');
        e.preventDefault();

        //Pegando a data tual para crava no campo Data Alteração da categoria.
        const current = new Date()
        const dateNow = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        //Objeto que será passado para POST
        const objPost = {

            descricao: categoria,
            dtCriacao: dateNow,
            dtAtualizcao: null,
            dtExclusao: null,
        }

        console.log(objPost);
        // POST
        configPost(objPost, "POST")
    }


    // if (isOpen) {

    //     const input = document.querySelector("#descricao")

    //     if (input) {

    //         input.value = object.descricao;
    //     }
    // }




    if (isOpen) {
        return (
            <div style={BackgroudModal}>
                <div style={ModalStyle}>
                    {/* <div className="divChildren">
                        {children}
                    </div> */}
                    <div className="divConteudo">
                        <div className="divAlertCreate">
                            <span className="material-symbols-outlined">
                                add_box
                            </span> Cadastrar nova categoria
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="descricao">Categoria:
                                <input type="text" id="descricao" name="descricao" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder='Nome da Categoria' required />
                            </label>
                            <br />
                            <br />
                            <div className="divButtons">
                                <button type='submit' className='btnSalvar'>Salvar</button>
                                <button type='submit' className='btnCancelar' onClick={closeModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

export default Modal