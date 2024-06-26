import React from 'react'
import "./Navbar.css"

//Components
import { NavLink, Link } from 'react-router-dom';
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';

const Navbar = () => {
  return (
    <nav id="nav">
        <Link to="/">ReactGRAM</Link>
        <form>
            <BsSearch />
            <input type="text" />
        </form>
        <ul id="nav-linkw">
            <NavLink to="/">
                <BsHouseDoorFill />
            </NavLink>
            <NavLink to="/login">
                Entrar
            </NavLink>
            <NavLink to="/register">
                Cadsatrar
            </NavLink>
        </ul>
    </nav>
  )
}

export default Navbar