import axios from "axios";

//const baseurl = "http://localhost:3003/api";
const baseurl = "https://dairy-dash-back-end-2.onrender.com";

const authInstance = axios.create({
    baseURL : baseurl,
    timeout : 5000,
    headers : {
        'Content-Type' : 'application/json'
    }
});

const protectedInstance = axios.create({
    baseURL : baseurl,
    timeout : 5000,
    headers : {
        'Content-Type' : 'application/json'
    }
});

protectedInstance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token')

        if(token){
            config.headers['Authorization'] = 'bearer ' + token;
        }
        return config;
    }
);

export default {
    authInstance,
    protectedInstance
}