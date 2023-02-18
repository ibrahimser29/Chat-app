import api from '../api';

export const SendRegisterRequest = (data) => {
    return api.post('/register',data,{headers:{"Content-Type": "multipart/form-data"}});
}

export const SendLoginRequest = (cardentials) => {
    return api.post('/login',cardentials);
}

export const SendLogoutRequest = () => {
    return api.get('/logout');
}