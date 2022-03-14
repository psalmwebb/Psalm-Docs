import { useParams } from "react-router-dom"
import Login from "./Login";
import Register from "./Register";

import "../styles/authview.scss";


export default function AuthView()
{
    const params = useParams();

    return (
        <>
          <div className="auth-view">
            <nav>
              <h3>PSALM DOCS</h3>
            </nav>
              { params.comp.toLowerCase() === "login" && <Login/>}
              { (params.comp.toLowerCase() === "register" || params.comp.toLowerCase() === "signup") 
              && <Register/>}

            <div className="divider">
            </div>
          </div>
        </>
    )
}