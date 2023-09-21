import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';
import authenticationReducer from './redux/authenticationRedux';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer, // Substitua pelo seu reducer de autenticação
  },
  middleware: [thunk],
});

// Carregar o estado inicial de autenticação a partir do cookie
const userFromCookie = Cookies.get('user');
if (userFromCookie) {
  console.log('User info from cookie:', JSON.parse(userFromCookie));
  store.dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(userFromCookie) });
}

export default store;
