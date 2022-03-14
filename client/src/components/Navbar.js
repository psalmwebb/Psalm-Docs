import { DataContext } from "../contexts/dataContextProvider";
import { SocketContext } from "../contexts/socketContextProvider";
import { useContext, useRef } from "react"; 


export default function Navbar({docName,docId,setDefaultContent,saveStatus,setSaveStatus}){

    const {setShowDownloadDiv} = useContext(DataContext);

    const {socketObj} = useContext(SocketContext)

    const s = useRef(0);

    function handleChange(e){
      setDefaultContent({name:e.target.value});
      updateDocName(docId.current,e.target.value);
    }

    async function updateDocName(docId,docName){
      if(Object.keys(socketObj).length){
         clearTimeout(s.current);
         setSaveStatus('Saving...');
         setTimeout(()=>{
           socketObj.emit('rename-doc',{docId,docName});
         },2000);
      }
    }

    return (
        <div className="navbar">
          <div className="filename-div">
            <input type={'text'} value={docName} onChange={handleChange} placeholder="Untited"/>
          </div>
           <div>
             <h4>{saveStatus.toUpperCase()}</h4>
           </div>
          <button id="downloadBtn" onClick={setShowDownloadDiv.bind(this,true)}>
             DOWNLOAD
          </button>
        </div>
    )
}