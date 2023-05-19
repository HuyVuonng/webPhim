import axios from 'axios';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_DOMAIN,
    // baseURL: 'https://api.themoviedb.org/3',
});

export default httpRequest;
