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
        return response;
    }
    ,
    (error)=>{
        if(error == "404"){
            console.log("密码错误");
        }else if(error == "403"){
            console.log("服务器未知错误");
        }
        return Promise.reject(error);
    }
)


export default api;