import React, { useState } from 'react';
import { loginUser } from '../../actions/authenticationAction';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router';
import "../LoginScreen/loginscreen.css";
import Footer from '../../components/footer/Footer';
const LoginScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        login: '',
        password: '',
    });
    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(loginData));
        navigate('/')
    };

    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
    const isAuthenticated2 = useSelector(state => state.authentication.user);
    //console.log(isAuthenticated2)
    //console.log(isAuthenticated);



    return (

        <div>
            <Header></Header>
            <div className='full-size'>
                <div className='container'>
                    <h2>Login</h2>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        placeholder="Login"
                        value={loginData.login}
                        onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
                    />
                    <label>senha:</label>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginScreen;
