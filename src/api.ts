import axios from 'axios';

const api = axios.create({
    baseURL:"http://127.0.0.1:3000"
})

api.interceptors.request.use((config)=>{
    console.log(config);

    const token = localStorage.getItem("token");
    if(token){
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(
    (response)=>{
        console.log("interceptor response");
        console.log(response);
        return response;
    }
    ,
    (error)=>{
        console.log("interceptor error");
        console.log(error);
        return Promise.reject(error);
    }
)


export default api;