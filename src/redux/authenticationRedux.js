// authenticationReducer.js
const initialState = {
    user: null, // Você pode adicionar informações do usuário aqui se necessário
    isAuthenticated: false,
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user:action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
            };
        case 'SIGNUP_FAILURE':
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null, // Limpe as informações do usuário em caso de falha
                isAuthenticated: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authenticationReducer;
