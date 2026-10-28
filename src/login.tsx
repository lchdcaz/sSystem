import './login.css';
import api from './api.ts';
import {useReducer,useState,useContext} from 'react';
import {Reducer} from './reducer.tsx';
import {useNavigate} from 'react-router-dom'
import {Context} from './context.tsx'

export default function Login(){
    const navigate = useNavigate();
    const [state,dispatch] = useReducer(Reducer,{"username":"","password":""});
    const {setUser,setId} = useContext(Context);
    async function register(){
        const response = await api.post("/register",state);

        console.log(response);
    }
    async function login(){
        const response = await api.post("/login",state);

        console.log(response);

        if(!response.data.success){
            alert("账号密码错误");
            dispatch({type:"username",value:""});
            dispatch({type:"password",value:""});
            return;
        }

        localStorage.setItem("token",response.data.data.jwt);
        localStorage.setItem("role",`${state.username} ${response.data.data.id}`);

        if(state.username == "admin"){
            setUser(state.username);
            setId(response.data.data.id.toString());
            navigate(`/admin/${response.data.data.id}`);
            console.log(response.data.data.id);
            return;
        }
        setUser(state.username);
        setId(response.data.data.id.toString());
        navigate(`/user/${response.data.data.id}`);
    }
    return(
     <div className = "login h-[100%] w-[100%] relative flex justify-center items-center">
        <div className="part1 flex flex-col min-h-[400px] border-1 min-w-[400px] p-3 rounded-4xl">
            <h1 className="text-center">设备管理系统</h1>
            <div className = "mt-20 mb-10 ">
            <label>账号</label>
            <input placeholder="输入账号" className = "ml-5 rounded-xl pl-1" value={state.username} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>dispatch({type:"username",value:`${e.target.value}`})}/>
            </div>
            <div className="mb-35">
            <label>密码</label>
            <input placeholder="输入密码" className = "ml-5 rounded-xl pl-1" value={state.password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>dispatch({type:"password",value:`${e.target.value}`})}/>           
            </div>
            <div className = "flex flex-around justify-around">
            <button onClick={()=>login()}>登录</button>
            <button onClick={()=>register()}>注册</button>
            </div>
        </div>
    </div>
    )
}