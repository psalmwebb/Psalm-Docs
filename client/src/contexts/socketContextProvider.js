import {createContext,useState,useEffect} from "react";


export const SocketContext = createContext();

const app_mode = process.env.REACT_APP_MODE;

const URL  = app_mode === 'development' ? 'http://localhost:5000' :"";

export default function SocketContextProvider({children}){

    
    const [socketObj,setSocketObj] = useState({});

    return (
        <SocketContext.Provider value={
            {
                socketObj,
                setSocketObj
            }
            }>
            {children}
        </SocketContext.Provider>
    )
}