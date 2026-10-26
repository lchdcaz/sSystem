import { useState,useEffect } from 'react';
import './App.css';
import Login from './login.tsx';
import {Routes,Route,Navigate} from 'react-router-dom';
import Admin from './admin.tsx';
import User from './user.tsx';
import {Context} from './context.tsx';


function App() {
  const role = localStorage.getItem("role");
  let user = "";
  let id = "";
  if(role){
    [user,id] = role.split(" ");
  }
  return (
    <div className = "web w-[100vw] h-[100vh]">

     <Context.Provider value = {{user:user,id:id}}>
      <Routes>
        <Route path="/" element={<Check />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/:id" element={<Admin />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
     </Context.Provider>
    </div>
  )
}

function Check(){
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if(!token || !role)return (<Navigate to="/login" replace />);
    const [user,id] = role.split(" ");
  return (<Navigate to={`/${user}/${id}`} replace />);
}

export default App
