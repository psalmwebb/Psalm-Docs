import { Link,useNavigate } from "react-router-dom"
import "../styles/home.scss";

export default function Home()
{
    const navigate = useNavigate();

    return (
        <div className="home">
           <nav className="home-nav">
               <h3>PSALM DOCS</h3>
               <ul>
                   <li><Link to={'/auth/login'}>Login</Link></li>
                   <li><Link to={'/auth/register'}>Sign Up</Link></li>
               </ul>
           </nav>

          <div className="home-section">
            <div className="s-d-section">
                <div>
                    <h2>Create and share word documents seamlessly</h2>
                    <div className="free-btn-div">
                        <button onClick={()=> navigate('/documents/0')}>TRY IT</button>
                    </div>
                </div>
            </div>

            <div className="illustration-section">
                {/* <h3>Work with text documents</h3> */}

                <div className="illustration-img">
                    {/* Am images goes here */}
                </div>
            </div>
          </div>
        </div>
    )
}