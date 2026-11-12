import {useNavigate} from 'react-router-dom';
import {Context} from './context.tsx';
import {useContext,useEffect,useReducer} from 'react';
import './admin.css';
import api from './api.ts';
import {AdminReducer} from './reducer.tsx';
import img from './img.ts';

export default function Admin(){
    const navigate = useNavigate();
    const { user, id } = useContext(Context);
    const [status,dispatch] = useReducer(AdminReducer,{status:false,data:[],select:0});
    const findId = status.data.find((items)=>items.id == status.select);
    async function Inquiry(){
        
        const response = await api.get("/Inquiry");
        
        if(response.data.success)return dispatch({type:"data",value:response.data.data});

        alert("账号失效，重新登录");
        return navigate('/login',{replace:true});
    }
    console.log(status.data[0]);

    async function Submit(options:"agree" | "reject"){
        dispatch({type:"datachange",value:options})
        const response = await api.post(`/admin/${options}`,{id:status.select})

        if(!response.data.success){
            alert("提交失败，请重试");
            dispatch({type:"change",value:false});
            return;
        }
        alert("提交成功！！！");
        dispatch({type:"change",value:false});
        return;
    }

    useEffect(()=>{
        Inquiry();
    },[])
    return(
     <div className = "w-[100vw] h-[100vh] flex flex-col max-w-[2800px] max-w-[926px] mx-auto">
        <div className = "admin_nav flex-1 flex p-5 bg-gray-800/50">
            <div className = "flex self-center pl-10">
                <div>
                <h1>设备管理-管理端</h1> 
                <p>账号:{user} ID:{id}</p>               
                </div>
                <div className = "relative group">
                <button className = "ml-5 h-[50px] p-2 exit relative group-hover:text-white" onClick = {()=>navigate('/login',{replace:true})}>退出</button>
                <div className = "border-2 w-[50px] h-[50px] absolute inset-0 left-5 rounded-xl bo transition-all duration-400 ease-in group-hover:rotate-150 group-hover:border-white group-hover:bg-gray-700/30 bg-white"></div>
                </div>
            </div>
            <div>

            </div>
            <div></div>
        </div>
        <div className = " relative flex-7 flex max-[960px]:flex-col gap-5 pt-5 justify-center">
            <div className = "max-[960px]:hidden"><h2 className = "">申请项目</h2></div>
                <div className = {`absolute z-50 inset-0 bg-white top-3 w-[38%] max-[960px]:w-[100%] h-[91%] max-h-[708px]  flex flex-col transition-all duration-300 ease-linear origin-left rounded-2xl shadow-[0_10px_10px_-5px_black] perspective-[800px] ${status.status ? "scale-x-[1] max-[960px]:static opacity-100" : "scale-x-[0] opacity-0"}`}>
                    <button className = "absolute right-2 w-auto h-auto hover:[transform:translateZ(2px)]" onClick = {()=>dispatch({type:"change",value:false})}>关闭</button>
                    {(findId) && (
                        <>
                            <div className = "self-center border rounded-3xl shadow-[4px_5px_2px_2px_rgba(0,0,0,0.9),4px_5px_2px_15px_rgba(255,255,255,0.8)] mt-20">
                            <img src={img[findId.requestid]} className = "flex-1 w-[300px] h-[300px]"/>
                            </div>
                            <div className = "flex-1 justify-center items-center flex flex-col max-[960px]:mt-10">
                            <h1>设备编号:{findId.requestid}</h1>
                            <p>设备数量:{findId.device}</p>
                            <p>申请用户Id:{findId.user_id}</p>
                            <p>状态:{(findId.status == 0)?"待确认":(findId.status == 1)?"已确认":"以驳回"}</p>
                            <div className = "mt-20 max-[960px]:mt-5 max-[960px]:mb-2 border w-[150px] h-[50px] justify-center flex rounded-2xl perspective-[800px]">
                            <button className = "mr-2 hover:[transform:translateZ(10px)] hover:translate-x-[5px]" onClick = {()=>Submit("agree")}>同意</button>
                            <button className = "ml-2 hover:[transform:translateZ(10px)] hover:translate-x-[5px]"onClick = {()=>Submit("reject")}>驳回</button>
                            </div>
                            </div>
                        </>
                    )}
                </div>
            <div className = {`relative w-[88%] h-[100%] pl-5 max-[960px]:pl-0 transition-all duration-100 ease-linear justify-end flex max-[957px]:w-[100%]`}>
                <div className = {` w-[1px] transtion-all duration-300 ease-linear shadow-[0_0_10px_3px_black,0_0_10px_6px_rgba(0,0,0,0.3),0_0_10px_7px_white] ${status.status ? " h-[92%]" : " h-[100%]"} max-[957px]:hidden`}></div>
                <div className = {`flex ml-4 max-[960px]:ml-0 flex-wrap overflow-y-auto history gap-5 h-[500px] transition-all duration-300 ease-linear pl-2 pt-2 shadow-[0_10px_10px_-5px_black] perspective-[800px] rounded-[15px_2%] max-[960px]:justify-center ${status.status ? "w-[65%] max-[960px]:w-[100%] content-start shadow-[0_10px_10px_-5px_black]  h-[700px]" : "w-[100%]"}`}>
                {status.data.map(({status:status1,device:mount,user_id,requestid:deviceId,id},index)=>(
                    <div key={index} className = {`bg-gray-500  p-5 rounded-[15px] text-white transtion-all duration-300 ease-linear hover:[transform:translateZ(5px)] min-w-[125px] min-h-[14vh] ${(status1 == 0) ? "inset-shadow-[0_0_15px_2px_var(--color-yellow-700)]" : (status1 == 1) ? "inset-shadow-[0_0_10px_2px_var(--color-green-700)]" : "inset-shadow-[0_0_10px_2px_var(--color-red-900)]"} ${status.status ? "w-[100px] h-[140px]" : "w-[100px] h-[140px] "}`} onClick={()=>{
                        dispatch({type:"change",value:true});
                        dispatch({type:"select",value:id});
                    }}>
                        <h1>设备代码:{deviceId}</h1>
                        <p>数量:{mount}</p>
                        <p>用户id:{user_id}</p>
                        <p>状态:{(status1 == 0)?"待确认":(status1 == 1)?"已确认":"以驳回"}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
        
     </div>
    )
}