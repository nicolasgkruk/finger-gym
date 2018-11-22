import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://finger-gym.firebaseio.com/'
});

export default instance;