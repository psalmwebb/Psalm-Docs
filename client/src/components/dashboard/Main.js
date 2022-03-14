import {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {DataContext} from  "../../contexts/dataContextProvider";
import {useState} from "react";


const app_mode = process.env.REACT_APP_MODE;

const URL  = app_mode === 'development' ? 'http://localhost:5000' :"";

export default function Main(){
    const {userObj,setUserObj} = useContext(DataContext);

    const [canShow,setCanShow] = useState(false)

    const navigate = useNavigate();

    useEffect(()=>{

        ( async ()=>{
            let res = await fetch(`${URL}/users/documents`,{
                method:"post",
                credentials:'include',
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({userId:userObj.id})
            })
    
            let data = await res.json();
            
            setUserObj((prevUserObj)=>{
                return {...prevUserObj,documents:data};
            })
    
            setCanShow(true);
        })();
    },[]);

    // console.log(userObj.documents)

    return (
        <div className="main">
            <h3>Recent Documents</h3>
           <div className="recent-doc-div">
             {
                 canShow ? 
                 userObj.documents.length ?
                 
                    userObj.documents.map((doc,i)=>
                     <div className="doc-div" key={i}>
                        <p>{doc.name}</p>
                        <div key={i} className="doc" onClick={()=> navigate(`/documents/${doc.id}`)}>
                            <div dangerouslySetInnerHTML={{__html:doc.data}}>
                            </div>
                        </div>
                     </div>
                    )
                    :
                    <div style={{'textAlign':'center'}}>
                        NO DOCUMENT
                    </div>
                 :
                 <div className="" style={{'textAlign':"center"}}>
                     GETTING DOCUMENTS...
                 </div>
             }
           </div>
           
        </div>
    )
}