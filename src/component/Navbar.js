import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import colorContext from '../context/color/colorContext';
import { useNavigate } from 'react-router-dom';
const Navbar = (props) => {
  const context = useContext(colorContext);
  const { toggelMode,mode,textColor,modeText,buttonColor } = context;
  let location = useLocation();
  let history=useNavigate();
  React.useEffect(() => {
   

  }, [location]);
  const handelLogout=()=>{
    localStorage.removeItem('token')
    history("/login")
  }

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme={`${mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
              <li className="nav-item my-2 mx-3">
                <div className="form-check form-switch">
                  <input className={`form-check-input  `} type="checkbox" onClick={toggelMode} role="switch" id="flexSwitchCheckDefault" />
                  <label className={`form-check-label mx-1 text-${textColor}`} htmlFor="flexSwitchCheckDefault">{modeText}</label>
                </div>
              </li>


            </ul>
           {!localStorage.getItem('token')? <form className='d-flex'>
            <Link className={`btn btn-outline-${buttonColor}`} role='button' to='/login'>Login</Link>
            <Link className={`btn btn-outline-${buttonColor} mx-3`} role='button' to='/signup'>SignUp</Link>
            </form>:<div>
            <Link className={`btn btn-outline-${buttonColor}`} role='button' to='/profile'>Profile</Link>
            <button onClick={handelLogout} className={`btn btn-outline-${buttonColor} mx-3`} role='button' to='/logout'>Log out</button>
            </div>}

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
