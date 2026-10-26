import {createContext} from 'react';

type UsercontextType = {
    user:string;
    id:string;
}
export const Context = createContext<UsercontextType>({
    user:"",
    id:""
});