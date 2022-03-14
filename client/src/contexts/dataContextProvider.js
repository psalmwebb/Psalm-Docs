import {createContext,useState,useEffect} from "react";


export const DataContext = createContext();

const app_mode = process.env.REACT_APP_MODE;

const URL  = app_mode === 'development' ? 'http://localhost:5000' :"";

export default function DataContextProvider({children}){
    
    const [showDownloadDiv,setShowDownloadDiv] = useState(false);

    const [userObj,setUserObj] = useState({});

    const [filename,setFilename] = useState('Untitled');

    // console.log(filename);

    // console.log(userObj);

    const [canShow,setCanShow] = useState(false);

    useEffect(()=>{
      
        ( async ()=>{
            let data = await (await fetch(`${URL}/users/user`,{
                method:"post",
                credentials:'include'
            })).json();
    
            if(data.user){
                setUserObj({...userObj,...data.user});
            }
    
            setCanShow(true);
        })();
    },[])

    return (
        <DataContext.Provider value={
            {
                filename,
                setFilename,
                showDownloadDiv,
                setShowDownloadDiv,
                userObj,
                setUserObj
            }
            }>
           { canShow && children}
        </DataContext.Provider>
    )
}