import { Link,useNavigate } from "react-router-dom";
import {useState} from "react";
import {useContext} from "react";
import { DataContext } from "../contexts/dataContextProvider";

const app_mode = process.env.REACT_APP_MODE;

const URL  = app_mode === 'development' ? 'http://localhost:5000' :"";

export default function Login(){

    const {userObj,setUserObj} = useContext(DataContext);

    const [formData,setFormData] = useState({});
    const [error,setError] = useState('');

    const navigate = useNavigate();

    async function handleClick(){

        setError('');
        let res = await fetch(`${URL}/users/login`,{
            method:"post",
            withCredentials:true,
            credentials:'include',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(formData),
        })

        let data = await res.json();

        console.log(data);

        if(data.error){
            setError(data.error);
        }
        else if(data.user){
            setUserObj((prevUserObj)=>{
              return {...prevUserObj,...data.user};
            })
            navigate('/dashboard');
        }
    }

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    return (
        <div className="login bg-white p-3 col-4">
            <div style={{'textAlign':'center'}}>
                {error.toUpperCase()}
            </div>
            <div className="mt-3">
                <label>Username</label>
                <input className="form-control" onChange={handleChange} name="username"/>
            </div>

            <div className="mt-3">
                <label>Password</label> 
                <input type="password" className="form-control" onChange={handleChange} name="password"/>
            </div>

            <div className="mt-3">
                <button className="btn btn-success col-12" onClick={handleClick}>Log In</button>
            </div>

            <div style={{textAlign:'center'}}>
              <small><Link to={'/auth/register'} style={{textDecoration:"none"}}>Don't have an account ? Register</Link></small>
            </div>
        </div>
    )
}