import { useNavigate } from "react-router-dom"

export default function NavBar()
{
    const navigate = useNavigate();

    return (
        <div className="navbar">
          <div className="search-input-div">
           <input type={'search'} className='search-input' placeholder="Search documents"/>
          </div>

          <div>
              <button onClick={()=> navigate('/documents/0')}>START A NEW DOCUMENT</button>
          </div>

        </div>
    )
}