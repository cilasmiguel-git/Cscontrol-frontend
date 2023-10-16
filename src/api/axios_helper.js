import axios from 'axios';
import store from '../store'

export const getAuthToken = () => {
    return window.localStorage.getItem('user');
};

export const setAuthHeader = (token) => {
    window.localStorage.setItem('user', token);
};

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {
    const token = store.getState().authentication.user;

    let headers = {};
    if (token !== null && token !== "null") {
        headers = { 'Authorization': `Bearer ${token}` };
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    });
};