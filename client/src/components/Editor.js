import Navbar from "./Navbar";
import PopUp from "./PopUp";
import TextEditor from "./TextEditor";
import IO from "socket.io-client";
import { DataContext } from "../contexts/dataContextProvider";
import { SocketContext } from "../contexts/socketContextProvider";
import { useContext,useState, useEffect,useRef} from "react";

import { useParams } from "react-router-dom";

const app_mode = process.env.REACT_APP_MODE;

const URL  = app_mode === 'development' ? 'http://localhost:5000' :"";

export default function Editor(){

    const {setFilename,showDownloadDiv,userObj} = useContext(DataContext);

    const {setSocketObj} = useContext(SocketContext);

    const [defaultContent,setDefaultContent] = useState({data:'',name:''});

    const [saveStatus,setSaveStatus] = useState('');

    const [canShow,setCanShow] = useState(false);

    const param = useParams();

    const docId = useRef(param.docId);


    function handleDefaultContent(obj){
      setDefaultContent({...defaultContent,...obj});

      setFilename(obj.name);
    }
    
    useEffect(()=>{

        if(userObj.username)
           setSocketObj(IO(`${URL}/`));
        
        if(Number(param.docId) === 0){
            setCanShow(true)
            return
        }
        
      ( async ()=>{
          let data = await (await fetch(`${URL}/users/documents/${param.docId}`,{
              method:'post',
              headers:{
                  'Content-Type':'application/json'
              },
              credentials:'include'
          }))
          .json();

          if(data.document){
              handleDefaultContent(data.document);
          }
        //   console.log(data.document);
          setCanShow(true);
      })()
      
  },[param.docId])

    return (
        <>{
            canShow ? 
          <>
            <Navbar 
              docName={defaultContent.name} 
              saveStatus={saveStatus}
              setSaveStatus={setSaveStatus}
              docId={docId} setDefaultContent={handleDefaultContent}
            />

            <TextEditor 
              defaultContent={defaultContent.data} 
              docId={docId}
              setSaveStatus={setSaveStatus}
            />
          </>
          :
          <div>LOADING DOCUMENT</div>
        }
          { showDownloadDiv && <PopUp/> }
        </>
    )
}