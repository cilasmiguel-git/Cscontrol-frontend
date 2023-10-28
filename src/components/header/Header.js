import React, { useEffect, useState } from 'react';
import { IoIosCar, IoIosMenu, IoIosLogIn, IoIosPersonAdd } from 'react-icons/io';
import { TbLogout2 } from 'react-icons/tb';
import { BiSolidCarMechanic } from 'react-icons/bi';
import './header.css'; // Crie um arquivo CSS para o estilo do cabeçalho
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/authenticationAction';
import jwtDecode from 'jwt-decode';

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

    // Use o estado local para armazenar o nome do usuário
    const [userName, setUserName] = useState('');
    const [decodedToken, setDecodedToken] = useState(null); // Inicialize com null

    useEffect(() => {
        if (state.isAuthenticated) {
            const token = state.user;
            if (token) {
                const decoded = jwtDecode(token);
                console.log("-->", decoded);

                // Verifique se o token JWT contém informações de usuário
                if (decoded && decoded.sub) {
                    const userFullName = decoded.sub; // Substitua 'sub' pelo campo correto do token
                    setUserName(userFullName);
                    setDecodedToken(decoded); // Atualize o estado do decodedToken
                }
            }
        }
    }, [state.isAuthenticated, state.user]);

    return (
        <header className="header">
            <div className="logo-container" onClick={closeMenu}>
                <Link to="/">
                    <IoIosCar className="car-icon" />
                    <span className="logo-text">MyCars.com</span>
                </Link>
            </div>
            <nav className="nav">
                {state.isAuthenticated === true ? (
                    <h3 style={{ marginRight: "10px" }}>Olá, seja bem-vindo {userName} 🤗</h3>
                ) : null}
                <IoIosMenu className="menu-icon" onClick={toggleMenu} />
                <ul className={`menu-list ${menuOpen ? 'open' : ''}`}>
                    {state.isAuthenticated === false ? (
                        <li onClick={handleMenuItemClick}>
                            <IoIosLogIn className="login-icon" />
                            <Link to="/login">Login</Link>
                        </li>
                    ) : null}

                    {state.isAuthenticated === false ? (
                        <li onClick={handleMenuItemClick}>
                            <IoIosPersonAdd className="register-icon" />
                            <Link to="/register">Registrar</Link>
                        </li>
                    ) : null}

                    {state.isAuthenticated === true && decodedToken && decodedToken.admin === 'admin' ? (
                        <li onClick={handleMenuItemClick}>
                            <IoIosCar className="register-icon" />
                            <Link to="/addcar">Adicionar Carro</Link>
                        </li>
                    ) : null}

                    {state.isAuthenticated === true && decodedToken && decodedToken.admin === 'admin' ? (
                        <li onClick={handleMenuItemClick}>
                            <BiSolidCarMechanic className="register-icon" />
                            <Link to="/reservedcars" style={{ font: "bold 10pt arial" }}>Gerenciar reservas</Link>
                        </li>
                    ) : null}

                    {state.isAuthenticated === true ? (
                        <li onClick={handleMenuItemClick}>
                            <TbLogout2 onClick={handleLogout} className="register-icon" />
                            <Link onClick={handleLogout} to="/">Sair</Link>
                        </li>
                    ) : null}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
