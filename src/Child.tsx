import {useContext} from 'react';
import {UserContext} from "./context.tsx";

export default function Child(){
    const context = useContext(UserContext);
    if(!context) return null;

    const {user,setUser} =context;

    return(
        <>
        <button onClick={()=>setUser("cheng")}>change</button>
        <h1>{user}</h1>        
        </>

    )
}