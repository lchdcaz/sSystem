import {useState} from 'react';
import {UserContext} from './context.tsx';
import Child from "./Child";

function App() {
  const [user,setUser] = useState("hello");
  return (
    <>
    <UserContext.Provider value={{user,setUser}}>
      <button onClick = {()=>setUser("li")}>change</button>
      <Child />
    </UserContext.Provider>

    </>
  )
}

export default App
