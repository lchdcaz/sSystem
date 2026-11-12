import {Context} from './context.tsx';
import {useContext,useEffect,useRef,useState,useReducer} from 'react';
import{useNavigate} from 'react-router-dom';
import img from './img.ts';
import './user.css';
import {Canvas} from './canvas.tsx';
import {UserReducer} from './reducer.tsx';
import api from './api.ts';




export default function User(){
    const canvas = useRef<HTMLCanvasElement>(null);
    const canvas1 = useRef<HTMLCanvasElement>(null);
    const [status,dispatch] = useReducer(UserReducer,{status:false,pic:{img:"",deviceID:0,deviceModule:"",parameter:""},mount:0,apply:[],context:0,nav:false,nav1:false})
    const { user, id } = useContext(Context);   
    const navigate = useNavigate();
    useEffect(()=>{
        if(!canvas.current || !canvas1.current)return;
        Canvas(canvas.current);
        Canvas(canvas1.current);
        if(!id)return;
        Get();
        console.log("调取数据");
    },[id])

    async function Get(){
        const response = await api.get("/got",{
            params:{
                userid:id
            }
        });

        console.log(response);

        if(!response.data.success){
            alert("账号密码失效，重新登录");
        navigate('/login',{replace:true});
        return;
        }

        dispatch({type:"apply",data:response.data.data})

    }

    

    const device = [
        {img:img[1],deviceID:1,deviceModule:"办公键盘",parameter:"有线，薄膜，USB接口"},
        {img:img[2],deviceID:2,deviceModule:"办公耳机",parameter:"无线，降噪，三模"},
        {img:img[3],deviceID:3,deviceModule:"办公打印机",parameter:"彩色，联网，扫描"},
        {img:img[4],deviceID:4,deviceModule:"办公显示屏",parameter:"dp接口，1k分辨率，100%高色域"},
        {img:img[5],deviceID:5,deviceModule:"办公笔记本",parameter:"1k,i5 12400KF处理器，RTX 2060s显卡"},
        {img:img[6],deviceID:6,deviceModule:"办公鼠标",parameter:"无线，高dpi，可拆卸电池"}]


    async function submit (){
        try{
        const response = await api.post("/Submit",{
            statusID:status.pic.deviceID,
            statusMount:status.mount,
            userID:id
        })
        if(response.data.success == false){
            alert("账号失效，重新登录");
            navigate('/login',{replace:true});
            return;
        }
        alert("提交成功");
        dispatch({type:"change",status:false})
        dispatch({type:"new",data:{id:response.data.message.insertId,user_id:id,status:0,device:`${status.mount}`,requestid:status.pic.deviceID}})
        
        }catch(e){
            console.log(e);
        }

    }

    return (
        <div className = "main flex flex-col mx-auto">
              <div className = "admin_nav flex-1 flex p-5 bg-gray-800/50">
                <div className = "flex self-center pl-10">
                    <div>
                    <h1>设备管理-用户端</h1> 
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
              <div className = "context flex-7 flex mt-10 max-md:mt-0 group w-inherit max-md:flex-col max-md:items-center" data-value = {status.context}>
               <div className = "dev flex w-[8%] flex-col justify-start items-center pt-20 mr-5 max-md:hidden">
                 <div className = {`relative mb-20 perspective-[800px]`}>
                 <canvas width="50" height="50" ref={canvas} className = {`transition-all duration-400 ease-linear ${status.context ==1 && "rotate-[1rad] shadow-[25px_5px_15px_1px_red] inset-shadow-[0_0_1px_2px_black]"}`}></canvas>
                 <button className = {`absolute inset-0 hover:[transform:translateZ(20px)] active:[transform:translateZ(-20px)]`} onClick={()=>dispatch({type:"context",value:1})} >目录</button>
                 </div>
                 <div className = {`relative perspective-[800px]`}>
                 <canvas width="50" height="50" ref={canvas1} className = {`transition-all duration-400 ease-in-out ${status.context ==2 && "rotate-[1rad] shadow-[25px_5px_15px_1px_red] inset-shadow-[0_0_1px_2px_black]"}`}></canvas>
                 <button className = "absolute inset-0 hover:[transform:translateZ(20px)] active:[transform:translateZ(-20px)]" onClick={()=>dispatch({type:"context",value:2})} >申请</button>
                 </div>
                                    {/*<button onClick = {()=>{if(!canvas.current) return;
                                        const url = canvas.current.toDataURL("image/png");
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = "conrner.png";
                                        a.click();
                                        console.log(url);
                                    }}>导出</button>
                                    <button onClick={()=>{
                                        if(!canvas.current) return;
                                        canvas.current.toBlob((Blob)=>{
                                            console.log(Blob);
                                            if(!Blob) return;
                                            const url = URL.createObjectURL(Blob);

                                            const a = document.createElement("a");
                                            a.href = url;
                                            a.download = "corner.png";
                                            a.click();

                                            URL.revokeObjectURL(url);

                                        })

                                    }}>blob</button> */}
                 </div>
                 <div className = "w-[1px] h-[100%] shadow-[0_0_10px_3px_black,0_0_10px_6px_rgba(0,0,0,0.3),0_0_10px_7px_white] mr-10 border-1 border-white max-md:hidden"></div>
                 <div className = "min-md:hidden w-[100vw] h-[30px] bg-gray-800/60 flex items-center justify-center active:bg-white transition-all duration-300 ease-in-out perspective-[800px] group" onClick = {()=>{dispatch({type:"nav",value:(status.nav)});dispatch({type:"context",value:1});}}><button className = {`transition-all duration-300 ease-in-out text-xl ${status.nav ? "rotate-[90deg]" : "rotate-[-90deg]"}`}>{">"}</button></div>
                 <div className = {` flex content-start gap-5 flex-wrap max-h-[500px] justify-center history overflow-y-auto mr-10 pt-3 rounded-2xl shadow-[0_10px_10px_-5px_black] transition-all duration-400 min-md:group-data-[value=2]:hidden max-md:mr-0 ${status.context == 1 ? "w-[100%] max-md:h-[500px] justify-start pl-3" : "w-[55%] max-md:w-[100%] max-md:h-[300px]"}`}>
                 {status.apply.map(({status,device:mount,user_id,requestid:deviceId,id},index)=>(
                    <div key = {index} className ={`bg-gray-500 w-[13vw] h-[20vh] min-w-[126px] min-h-[100px] max-md:h-[15vh] p-5 rounded-2xl text-white ${(status == 0) ? "inset-shadow-[0_0_15px_2px_var(--color-yellow-700)]" : (status == 1)? "inset-shadow-[0_0_10px_2px_var(--color-green-700)]" : "inset-shadow-[0_0_10px_2px_var(--color-red-900)]"}`}>
                        <h1>设备id:{deviceId}</h1>
                        <p>数量:{mount}</p>
                        <p>用户id:{user_id}</p>
                        <p>状态:{(status == 0)?"待确认":(status == 1)?"已确认":"以驳回"}</p>
                    </div>
                 ))}
                 </div>
                 <div className = "w-[1px] h-[100%] shadow-[0_0_10px_3px_black,0_0_10px_6px_rgba(0,0,0,0.3),0_0_10px_7px_white] min-md:group-data-[value=1]:hidden min-md:group-data-[value=2]:hidden min-md:mr-10 border-1 border-white max-md:w-[100%] max-md:h-[1px] max-md:mt-5"></div>
                 <div className = "min-md:hidden w-[100vw] h-[30px] bg-gray-800/60 flex items-center justify-center active:bg-white transition-all duration-300 ease-in-out perspective-[800px] group mt-5" onClick = {()=>{dispatch({type:"nav1",value:(status.nav1)});dispatch({type:"context",value:2})}}><button className = {`transition-all duration-300 ease-in-out text-xl bg-red max-md:min-h-[200px] ${status.nav1 ? "rotate-[90deg]" : "rotate-[-90deg]"}`}>{">"}</button></div>
                 {/* <div className = "h-[1000px] w-[100vw] border-1 bg-red-800"></div> */}
                 <div className = {`img gap-5 flex flex-wrap content-start justify-center pt-5 rounded-2xl shadow-[0_10px_10px_-5px_black] mr-10 ml-auto overflow-y-auto history max-h-[500px] max-md:mb-5 max-md:mt-5 perspective-[800px] min-md:group-data-[value=1]:hidden transition-all duration-400 ease-linear ${status.context == 2 ? "w-[100%] max-md:h-[500px]" : "w-[50%] max-md:w-[100%] max-md:h-[300px]"}`}>
                 {device.map(({img,deviceID,deviceModule,parameter},index)=>(
                    <img  key={index} src={img} className="w-[200px] h-[200px]  object-contain hover:[transform:translateZ(10px)] active:[transform:translateZ(-5px)]" onClick={()=>{
                        dispatch({type:"change",status:true})
                        dispatch({type:"pic",pic:{img:img,deviceID:deviceID,deviceModule:deviceModule,parameter:parameter}})
                    }}/>
                 ))}
                </div>
            </div>
            {status.status == true && (
                <div className = "curtain fixed bg-gray-500/90 inset-0 flex justify-center items-center z-50 ">
                    <div className = "bg-white relative min-w-[50vw] h-[500px] z-100 flex p-5 rounded-2xl perspective-[800px]">
                                    <button className = "absolute top-2 right-2 hover:[transform:translateZ(2px)] active:[transform:translateZ(-5px)]" onClick = {
                                        ()=>{
                                            dispatch({type:"change",status:false});
                                            }}>关闭</button>
                                    <div className = "self-center ml-3 border rounded-3xl shadow-[4px_5px_2px_2px_rgba(0,0,0,0.9),4px_5px_2px_15px_rgba(255,255,255,0.8)]">
                                    <img src={`${status.pic.img}`} className="flex-2 rounded-3xl pr-5 w-[400px] h-[400px]"/>
                                    </div>
                                    <div className = "flex-1 flex justify-center items-center flex-col">
                                        <div className='mb-10'>
                                        <p>商品ID:{status.pic.deviceID}</p>
                                        <p>{status.pic.deviceModule}</p>
                                        <p>{status.pic.parameter}</p>
                                        </div>
                                        <div className = "flex gap-5 ml-10 perspective-[800px]"> 
                                            <button onClick = {()=>dispatch({type:"add"})} className = "hover:[transform:translateZ(10px)] active:[transform:translateZ(-5px)]">+</button>
                                            <input value = {status.mount} onChange = {(e:React.ChangeEvent<HTMLInputElement>)=>dispatch({type:"mount",mount:Number(e.target.value)})} className = "w-[100px]"/>
                                            <button onClick = {()=>dispatch({type:"cut"})} className = "hover:[transform:translateZ(15px)] active:[transform:translateZ(-10px)]">-</button>
                                            <button onClick = {()=>submit()} className = "hover:[transform:translateZ(10px)] active:[transform:translateZ(-5px)]">提交</button>
                                        </div>
                                    </div>
                    </div>            
                </div>
            )}

        </div>
    )
}