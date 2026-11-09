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
     <div className = "w-[100vw] h-[100vh] flex flex-col">
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
        <div className = "flex-7 flex gap-5 pt-5 justify-end">
            <div className = "border-r-2"><h2 className = "px-8">申请项目</h2></div>
            <div className = {`w-[90vw] h-[500px]  shadow-[0_10px_10px_-5px_black] pt-5 rounded-[15px_3%] ml-3 pl-3 transition-all duration-300 ease-linear ${status.status ? "justify-items-end h-[700px]" : "w-[90vw] origin-right"}`}>
                <div className = {`flex flex-wrap overflow-y-auto history gap-5 h-[100%] transtion-all duration-300 ease-linear ${status.status ? "w-[61%] content-start" : "w-[100%]"}`}>
                {status.data.map(({status:status1,device:mount,user_id,requestid:deviceId,id},index)=>(
                    <div key={index} className = {`bg-gray-500  p-5 rounded-[15px] text-white transtion-all duration-300 ease-linear ${status.status ? "w-[10vw] h-[15vh]" : "w-[15vw] h-[20vh]"}`} onClick={()=>{
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
                <div className = {`absolute bg-white w-[40vw] h-[767px] top-40 flex card scale-x-[0] transition-all duration-300 ease-linear origin-left ${status.status ? "scale-x-[1]" : ""}`}>

                    {(findId) && (
                        <>
                            <img src={img[findId.requestid]} width="400" height = "200" className = "flex-1"/>
                            <div className = "flex-1 ml-10 justify-center items-center flex flex-col">
                            <button className = "absolute top-2 right-2" onClick = {()=>dispatch({type:"change",value:false})}>关闭</button>
                            <h1>设备编号:{findId.requestid}</h1>
                            <p>设备数量:{findId.device}</p>
                            <p>申请用户Id:{findId.user_id}</p>
                            <p>状态:{(findId.status == 0)?"待确认":(findId.status == 1)?"已确认":"以驳回"}</p>
                            <div className = "mt-20 gap-10 flex border p-3">
                            <button className = "" onClick = {()=>Submit("agree")}>同意</button>
                            <p>|</p>
                            <button onClick = {()=>Submit("reject")}>驳回</button>
                            </div>
                            </div>
                        </>
                    )}
                </div>
        
     </div>
    )
}