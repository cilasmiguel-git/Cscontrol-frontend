import { request } from '../api/axios_helper'; // Importe a função request apropriada
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

// Ação de login assíncrono
export const loginUser = (formData) => {
    return async (dispatch) => {
        try {
            const response = await request('POST', '/auth/login', formData, { withCredentials: true }); // Adicione esta linha

            if (response.status === 200) {
                const resp = response
                console.log(resp)
                // Se o login for bem-sucedido, você receberá um token JWT
                const token = response.data.token;

                // Armazene o token no local storage
                Cookies.set('user',JSON.stringify(token),{expires:1});

                // Atualize o estado de autenticação com o token
                dispatch(loginSuccess(token));

                console.log(token)
            } else {
                dispatch(loginFailure('Login failed'));
            }
        } catch (error) {
            dispatch(loginFailure(error.response ? error.response.data.message : 'Unknown error'));
        }
    };
}


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
// Ação de registro assíncrono (pode ser usado com Redux Thunk)
export const signupUser = ({ username, password, role }) => {
    return async (dispatch) => {
        try {
            // Faça uma solicitação ao servidor para registrar o usuário
            const response = await request('POST', '/auth/register', { login: username, password, role });

            if (response.status === 200) {
                // Registro bem-sucedido
                dispatch(signupSuccess(response.data));
                const formData = { login: username, password }; // Crie o objeto de dados de login
                dispatch(loginUser(formData)); // Chame a ação de login
                // Você pode adicionar código adicional aqui, se necessário
            } else {
                // Em caso de falha no registro, despache uma ação de falha de registro
                if (response.data && response.data.message) {
                    dispatch(signupFailure(response.data.message));
                } else {
                    dispatch(signupFailure('Unknown error'));
                }
            }
        } catch (error) {
            // Trate outros erros, se necessário
            dispatch(signupFailure('Unknown error'));
        }
    };
};


