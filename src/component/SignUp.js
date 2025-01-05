import React, { useContext, useState } from 'react'
import colorContext from '../context/color/colorContext'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
const SignUp = (props) => {
  const host = "http://192.168.39.61:5000";
  const context = useContext(colorContext);
  const { textColor, buttonColor } = context;
  const [credential, setcredential] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  let history = useNavigate();
  const handelonchange = (e) => {
    setcredential({
      ...credential, [e.target.name]: e.target.value
    })
  }
  const handelSubmit = async (e1) => {

    try {
      e1.preventDefault();
      setLoading(true);

      const { name, email, password } = credential
      const response = await fetch(`${host}/api/auth/createuser`, {

        method: 'POST',
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ name, email, password })

      })

      const json = await response.json();
      console.log(json);
      setTimeout(() => {


        if (json.success) {
          //redirect
          localStorage.setItem('token', json.authtoken);
          setLoading(false)
          history("/")
          props.showAlert("Account created successfully", "success");
        } else {
          setLoading(false)
          props.showAlert(json, "danger")

        }
      }, 3000);
    }
    catch (error) {
      setLoading(false)
      console.log(error)
    }


  }
  return (
    <>
      {loading ? (<Loader />) : (<>
        <div className={`mt-3 text-${textColor}`}>
          <h1>Create a New Account</h1>
        </div>
        <div className="container">
          <form onSubmit={handelSubmit}>
            <div className={`mb-3 text-${textColor}`}>
              <label htmlFor="name" className="form-label my-2">Name</label>
              <input type="text" className="form-control my-2" id="name" name='name' aria-describedby="emailHelp" onChange={handelonchange} />
            </div>
            <div className={`mb-3 text-${textColor}`}>
              <label htmlFor="Email" className="form-label my-2">Email address</label>
              <input type="email" className="form-control my-2" id="email" name='email' aria-describedby="emailHelp" onChange={handelonchange} />
            </div>
            <div className={`mb-3 text-${textColor}`}>
              <label htmlFor="password" className="form-label my-2">Password</label>
              <input type="password" className="form-control my-2" id="password" name='password' onChange={handelonchange} />
            </div>
            <div className={`mb-3 text-${textColor}`}>
              <label htmlFor="cpassword" className="form-label my-2">Confirm Password</label>
              <input type="password" className="form-control my-2" id="cpassword" name='cpassword' onChange={handelonchange} />
            </div>

            <button type="submit" className={`btn btn-outline-${buttonColor} my-3`}>Submit</button>
          </form>
        </div></>
      )}

    </>
  )
}

export default SignUp
