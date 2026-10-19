import {createContext} from 'react';

type userContextType = {
    user:string;
    setUser:React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<userContextType | null>(null);