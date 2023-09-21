// authenticationActions.js
import { useNavigate } from 'react-router';
import apiAxios from '../api/apiAxios';
import Cookies from 'js-cookie';

// Ação de login bem-sucedido
export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

// Ação de login com falha
export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

// Ação de login assíncrono (pode ser usado com Redux Thunk)
export const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            // Faça uma solicitação ao servidor para autenticar o usuário
            const response = await apiAxios.post('/user/login', { username, password });
            
            if (response.status === 200) {
                // Se a autenticação for bem-sucedida, atualize o estado de autenticação
                dispatch(loginSuccess(response.data));
                // Salve as informações do usuário em um cookie
                Cookies.set('user', JSON.stringify(response.data));
            } else {
                // Trate a resposta como um erro
                dispatch(loginFailure('Login failed'));
            }

        } catch (error) {
            // Em caso de falha, despache uma ação de falha de login
            dispatch(loginFailure(error.response ? error.response.data.message : 'Unknown error'));
        }
    };
};

// Ação de logout
export const logoutUser = () => {
    // Remova as informações do usuário do cookie
    Cookies.remove('user');
    
    return {
        type: 'LOGOUT',
    };
};


// Ação de registro bem-sucedido
export const signupSuccess = (user) => ({
    type: 'SIGNUP_SUCCESS',
    payload: user,
});

// Ação de registro com falha
export const signupFailure = (error) => ({
    type: 'SIGNUP_FAILURE',
    payload: error,
});

// Ação de registro assíncrono (pode ser usado com Redux Thunk)
export const signupUser = ({username,password,email}) => {
    return async (dispatch) => {
        try {
            // Faça uma solicitação ao servidor para registrar o usuário
            const response = await apiAxios.post('/user/register', {username,password,email});

            // Se o registro for bem-sucedido, atualize o estado de autenticação
            dispatch(signupSuccess(response.data));

            // Salve as informações do usuário em um cookie (se necessário)
            // Cookies.set('user', JSON.stringify(response.data));

        } catch (error) {
            // Em caso de falha no registro, despache uma ação de falha de registro
            dispatch(signupFailure(error.response.data.message));
        }
    };
};