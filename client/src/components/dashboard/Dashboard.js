import Main from "./Main";
import NavBar from "./NavBar";
import "../../styles/dashboard.scss";
import {useContext, useEffect,useState} from "react";
import { DataContext } from "../../contexts/dataContextProvider";
import {useNavigate} from "react-router-dom";


export default function Dashboard()
{
    const {userObj} = useContext(DataContext);

    const [canShow,setCanShow] = useState(false);

    const navigate = useNavigate();


    useEffect(()=>{
        if(!userObj.username)
            return navigate('/auth/login');
        else
          setCanShow(true);
    },[])

    return (
        <div className="dashboard">
          { canShow && 
           <>
            <NavBar/>
            <Main/>
           </>
          }
        </div>
    )
}