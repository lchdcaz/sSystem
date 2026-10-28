import {Context} from './context.tsx';
import {useContext,useEffect,useRef,useState,useReducer} from 'react';
import{useNavigate} from 'react-router-dom';
import image1 from './assets/images (1).jpeg';
import image2 from './assets/images (2).jpeg';
import image3 from './assets/images (3).jpeg';
import image4 from './assets/images (4).jpeg';
import image5 from './assets/images (5).jpeg';
import image6 from './assets/images.jpeg';
import './user.css';
import {Canvas} from './canvas.tsx';
import {UserReducer} from './reducer.tsx';
import api from './api.ts';




export default function User(){
    const canvas = useRef<HTMLCanvasElement>(null);
    const [status,dispatch] = useReducer(UserReducer,{status:false,pic:{img:"",deviceID:0,deviceModule:"",parameter:""},mount:0})
    const { user, id } = useContext(Context);   
    const navigate = useNavigate();
    useEffect(()=>{
        if(!canvas.current)return;
        Canvas(canvas.current);
    },[])

    const device = [
        {img:`${image1}`,deviceID:1,deviceModule:"办公键盘",parameter:"有线，薄膜，USB接口"},
        {img:`${image2}`,deviceID:2,deviceModule:"办公耳机",parameter:"无线，降噪，三模"},
        {img:`${image3}`,deviceID:3,deviceModule:"办公打印机",parameter:"彩色，联网，扫描"},
        {img:`${image4}`,deviceID:4,deviceModule:"办公显示屏",parameter:"dp接口，1k分辨率，100%高色域"},
        {img:`${image5}`,deviceID:5,deviceModule:"办公笔记本",parameter:"1k,i5 12400KF处理器，RTX 2060s显卡"},
        {img:`${image6}`,deviceID:6,deviceModule:"办公鼠标",parameter:"无线，高dpi，可拆卸电池"}]


    async function submit (){
        try{
        const response = await api.post("/Submit",{
            statusID:status.pic.deviceID,
            statusMount:status.mount
        })
        if(response.data.success == false){
            alert("账号失效，重新登录");
            navigate('/login');
            return;
        }
        alert("提交成功");
        dispatch({type:"change",status:false})
        
        }catch(e){
            console.log(e);
        }

    }

    return (
        <div className = "main">
            <div className = "user_nav">
                <div><h1>设备管理-用户端</h1></div> 
                <div></div>
                <div>账号:{user} ID:{id}</div>
            </div>
        <div className = "context">
            <div className = "dev">
                <canvas width="200" height="200" ref={canvas}></canvas>
                <button>目录</button>
                <button>申请</button>
                <button onClick = {()=>{if(!canvas.current) return;
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

                }}>blob</button>
            </div>
            <div className = "img">
                {device.map(({img,deviceID,deviceModule,parameter},index)=>(
                    <img key={index} src = {img} width="200" height="200" onClick={()=>{
                        dispatch({type:"change",status:true})
                        dispatch({type:"pic",pic:{img:img,deviceID:deviceID,deviceModule:deviceModule,parameter:parameter}})

                    }}/>
                ))}
            </div>
        
            {status.status == true && (
                <div className = "curtain fixed bg-gray-500/90 inset-0 flex justify-center items-center z-50">
                    <div className = "bg-white relative min-w-[50vw] h-[500px] z-100 flex p-5 rounded-2xl">
                                    <button className = "absolute top-2 right-2" onClick = {
                                        ()=>{
                                            dispatch({type:"change",status:false});
                                            }}>关闭</button>
                                    <img src={`${status.pic.img}`} width="200" height="500" className="flex-2 rounded-3xl pr-5"/>
                                    <div className = "flex-1 flex justify-center items-center">
                                        <div>
                                        <p>商品ID:{status.pic.deviceID}</p>
                                        <p>{status.pic.deviceModule}</p>
                                        <p>{status.pic.parameter}</p>
                                        </div>
                                        <div className = "absolute bottom-10 flex gap-5"> 
                                            <button onClick = {()=>dispatch({type:"add"})}>+</button>
                                            <input value = {status.mount} onChange = {(e:React.ChangeEvent<HTMLInputElement>)=>dispatch({type:"mount",mount:Number(e.target.value)})} className = "w-[100px]"/>
                                            <button onClick = {()=>dispatch({type:"cut"})}>-</button>
                                            <button onClick = {()=>submit()}>提交</button>
                                        </div>
                                    </div>
                    </div>            
                </div>
            )}

        </div>            
        </div>
    )
}