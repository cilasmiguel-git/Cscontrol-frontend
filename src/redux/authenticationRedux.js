// authenticationReducer.js
const initialState = {
    user: null,
    isAuthenticated: false,
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        case 'SIGNUP_FAILURE':
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: action.payload, // Pode adicionar uma propriedade de erro para lidar com mensagens de erro
            };
        default:
            return state;
    }
};

export default authenticationReducer;
