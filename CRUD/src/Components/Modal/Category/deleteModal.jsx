import { useFetch } from '../../Hooks/useFetch'
import '../styleModal.css'

const DeleteModal = ({ isOpen, closeModal, idItem, object }) => {

    const urlDB = 'http://localhost:3000/categorias/'+idItem;
    const {configDelete} = useFetch(urlDB);

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

    const inputText = {
        border: '0',
        textAlign: 'center',
        color: '#000',
        backgroundColor: "rgb(0,0,0, 0.05)",
    }

    const handleDelete = async (e) => {

        e.preventDefault();


        //Metodo de exclusão
        configDelete("DELETE")
    } 

    if (isOpen) {
        return (
            <div style={BackgroudModal}>
                <div style={ModalStyle}>
                    <div className="container">
                        <div className="divAlert">
                            <span className="material-symbols-outlined">warning</span> Deseja<b> excluir</b> essa categoria?
                        </div><br />
                        <form>
                            <label key={idItem}>
                                <input type="text" style={inputText} name="descricao" id="descricao" value={object.descricao} readOnly/>
                            </label>
                        </form>
                        <div className="divButtons">
                            <button type='submit' className='btnSalvar' onClick={handleDelete}>Sim</button>
                            <button type='submit' className='btnCancelar' onClick={closeModal}>Não</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

export default DeleteModal;