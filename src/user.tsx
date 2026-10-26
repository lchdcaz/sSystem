import {Context} from './context.tsx';
import {useContext,useEffect,useRef} from 'react';
import image1 from './assets/images (1).jpeg';
import image2 from './assets/images (2).jpeg';
import image3 from './assets/images (3).jpeg';
import image4 from './assets/images (4).jpeg';
import image5 from './assets/images (5).jpeg';
import image6 from './assets/images.jpeg';
import './user.css';
import {Canvas} from './canvas.tsx';


type device = {
    img:string;
}

export default function User(){
    const {user,id} = useContext(Context);
    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        if(!canvas.current)return;
        Canvas(canvas.current);
    },[])
    const device : device[] = [
        {img:`${image1}`},
        {img:`${image2}`},
        {img:`${image3}`},
        {img:`${image4}`},
        {img:`${image5}`},
        {img:`${image6}`}]
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
                {device.map(({img},index)=>(
                    <img key={index} src = {img} width="200" height="200"/>
                ))}
            </div>
        </div>            
        </div>
    )
}