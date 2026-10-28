import { createContext } from "react";

type UsercontextType = {
    user: string;
    id: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setId: React.Dispatch<React.SetStateAction<string>>;
};

export const Context = createContext<UsercontextType>({
    user: "",
    id: "",
    setUser: () => {},
    setId: () => {},
});