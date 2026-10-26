import {useNavigate} from 'react-router-dom';
import {Context} from './context.tsx';
import {useContext} from 'react';
import './admin.css';

export default function Admin(){
    const navigate = useNavigate();
    const {user,id} = useContext(Context);
    return(
     <div>
        <div className = "admin_nav">
            <div><h1>设备管理-管理端</h1></div> 
            <div></div>
            <div>账号:{user} ID:{id}</div>
        </div>
        <div>
            <h2>申请项目</h2>
        </div>
        <div>

        </div>
     </div>
    )
}