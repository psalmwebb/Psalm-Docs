import {Link} from "react-router-dom"
import {useState} from "react";
import {useNavigate} from "react-router-dom"


const app_mode = process.env.REACT_APP_MODE;

const URL  = app_mode === 'development' ? 'http://localhost:5000' :"";

export default function Register(){

    const [formData,setFormData] = useState({});
    const [error,setError] = useState('');

    const navigate = useNavigate();

    function handleChange(e){
       setFormData({...formData,[e.target.name]:e.target.value});
    }


    async function handleClick(){

        setError('');
        let res = await fetch(`${URL}/users/register`,{
            method:"post",
            withCredentials:true,
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(formData),
        })

        let data = await res.json();

        if(data.error){
            setError(data.error);
        }
        else if(data.success){
            console.log(data.success)
            navigate('/auth/login');
        }
    }

    return (
        <div className="register">
            <div style={{'textAlign':'center'}}>
                {error.toUpperCase()}
            </div>
            <div>
                <label>Username</label>
                <input type={'text'} name="username" onChange={handleChange}/>
            </div>

            <div>
                <label>Email</label>
                <input type={'text'} name="email" onChange={handleChange}/>
            </div>

            <div>
                <label>Password</label>
                <input type={'password'} name="password" onChange={handleChange}/>
            </div>

            <div>
                <label>Confirm Password</label>
                <input type={'password'} name="confirmPassword" onChange={handleChange}/>
            </div>

            <div>
                <button onClick={handleClick}>Sign Up</button>
            </div>

            <div style={{textAlign:'center'}}>
              <small><Link to={'/auth/login'} style={{textDecoration:"none"}}>Already have an account ? Log In</Link></small>
            </div>
        </div>
    )
}