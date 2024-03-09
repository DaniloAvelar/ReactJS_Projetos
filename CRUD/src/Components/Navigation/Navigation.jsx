import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'


const Navigation = () => {
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
                        <li><NavLink to='/categorias' className="menu__item">Categorias</NavLink></li>
                        <li><NavLink to='/' className="menu__item">Produtos</NavLink></li>
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
                    <span className="material-symbols-outlined">
                        notifications
                    </span>
                    <span className="material-symbols-outlined">
                        settings
                    </span>

                </div>
            </nav>
        </div>
    )

}

export default Navigation