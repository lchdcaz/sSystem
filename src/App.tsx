import { useState,useEffect } from 'react';
import './App.css';
import Login from './login.tsx';
import {Routes,Route,Navigate} from 'react-router-dom';
import Admin from './admin.tsx';
import User from './user.tsx';
import {Context} from './context.tsx';
type Props = {
  children:React.ReactNode;
}


function App() {
  const [username,setusername] = useState("");
  const [id,setid] = useState("");

  return (

    <div className = "web w-[100vw] h-[100vh]">

     <Context.Provider value={{user:username,id:id,setId:setid,setUser:setusername}}>
      <Routes>
        <Route path="/" element={<Check />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/:id" element={
          <CheckLogin>
            <Admin />
          </CheckLogin>
        } />
        <Route path="/user/:id" element={
          <CheckLogin>
            <User />
          </CheckLogin>
        } />
      </Routes>
     </Context.Provider>
    </div>
  )
}

function CheckLogin ({children}:Props) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

function Check(){
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if(!token || !role)return (<Navigate to="/login" replace />);
  const[_,id] = role.split(" ");
  return (<Navigate to={`/user/${id}`} replace />)
}

export default App
