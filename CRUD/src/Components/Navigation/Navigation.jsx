import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'
import { useNotification } from '../Hooks/useNotification';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const Navigation = () => {

    const { countAvisos } = useNotification();

    //Função para fechar o menu após clique em qq opção
    function closeMenu() {
        var x = document.getElementById("menu__btn");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    /* MODAL */
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">

                {/* Menu Hamburger */}
                <div className="hamburger-menu">
                    <input id="menu__toggle" type="checkbox" />
                    <label className="menu__btn" htmlFor="menu__toggle">
                        <span></span>
                    </label>

                    <ul className="menu__box">
                        <li><NavLink to='/categorias' className="menu__item" onClick={closeMenu}>Categorias</NavLink></li>
                        <li><NavLink to='/' className="menu__item" onClick={closeMenu}>Produtos</NavLink></li>
                        {/* <li><a className="menu__item" href="#">Home</a></li>
                        <li><a className="menu__item" href="#">About</a></li>
                        <li><a className="menu__item" href="#">Team</a></li>
                        <li><a className="menu__item" href="#">Contact</a></li>
                        <li><a className="menu__item" href="#">Twitter</a></li> */}
                    </ul>
                </div>
                {/* Menu Hamburger */}
                <div className="rigthtButtons">
                    <span className="material-symbols-outlined">
                        person
                    </span>
                    {/* <span className="notif">{countAvisos} */}
                    <span className="notif" onClick={handleShow}>{countAvisos}</span>
                    <span className="material-symbols-outlined sino" onClick={handleShow}>
                        notifications
                    </span>

                    <span className="material-symbols-outlined">
                        settings
                    </span>

                </div>
            </nav>
            {/* MODAL ============================================================= */}
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Notificações do usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Aqui apareceram as suas notificações
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    )
}

export default Navigation