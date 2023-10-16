import React, { useState } from 'react';
import Header from '../../components/header/Header';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../actions/authenticationAction';
import { useNavigate } from 'react-router';
import './register.css'; // Importe o arquivo CSS aqui
import Footer from '../../components/footer/Footer';

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleRegister = () => {
        // Envie uma solicitação de registro para o servidor aqui
        dispatch(signupUser({ username, password, role: 'USER' }));
        //navigate('/');
    };

    return (
        <div> {/* Aplicar classe ao contêiner principal */}
            <Header></Header>
            <div className='full-size'>
                <div className="container">
                    <h2>Register</h2>
                    <label>Usuario</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Senha</label> {/* Alterei de "pasword" para "Senha" */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleRegister}>Register</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Register;
