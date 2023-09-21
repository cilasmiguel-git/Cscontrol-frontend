import React, { useState } from 'react';
import { IoIosCar, IoIosMenu, IoIosLogIn, IoIosPersonAdd } from 'react-icons/io';
import { TbLogout2 } from 'react-icons/tb';
import './header.css'; // Crie um arquivo CSS para o estilo do cabeçalho
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/authenticationAction';

const Header = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.authentication);

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleMenuItemClick = () => {
        closeMenu(); // Fecha o menu quando um item é clicado
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };


    return (
        <header className="header">
            <div className="logo-container" onClick={closeMenu}>
                <Link to="/"><IoIosCar className="car-icon" />
                    <span className="logo-text">MyCars.com</span>
                </Link>
            </div>
            <nav className="nav">
                {state.isAuthenticated === true ? <h3 style={{ marginRight: "10px" }}>Olá,seja bem vindo {state.user.username}</h3> : null}
                <IoIosMenu className="menu-icon" onClick={toggleMenu} />
                <ul className={`menu-list ${menuOpen ? 'open' : ''}`}>
                    {state.isAuthenticated === false ?
                        <li onClick={handleMenuItemClick}>
                            <IoIosLogIn className="login-icon" />
                            <Link to="/login">Login</Link>
                        </li>
                        : null}

                    {state.isAuthenticated === false ?
                        <li onClick={handleMenuItemClick}>
                            <IoIosPersonAdd className="register-icon" />
                            <Link to="/register"> Registrar</Link>
                        </li>
                        : null}

                    {state.isAuthenticated === true ?
                        <li onClick={handleMenuItemClick}>
                            <IoIosCar className="register-icon" />
                            <Link to="/addcar">Adicionar Carro</Link>
                        </li>
                        : null}

                    {state.isAuthenticated === true ?
                        <li onClick={handleMenuItemClick}>
                            <TbLogout2 onClick={handleLogout} className="register-icon" />
                            <Link onClick={handleLogout} to="/">Sair</Link>
                        </li>
                        : null}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
