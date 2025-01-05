import React, { useContext, useState } from 'react';
import colorContext from '../context/color/colorContext';
import { useNavigate } from "react-router-dom";
import Loader from './Loader';

const Login = (props) => {

  const host = "http://192.168.141.42:5000";
  const context = useContext(colorContext);
  const { textColor, buttonColor } = context;
  const [credential, setCredential] = useState({ email: "", password: "" });
  let history = useNavigate();
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    setCredential({
      ...credential, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credential.email, password: credential.password })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        setLoading(false);
        history("/");  // Redirect to home after successful login
        props.showAlert("Login Successfully", "success");
      } else {
        setLoading(false);
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />  // Show the loader while the login request is processing
      ) : (
        <>
          <div className={`mt-3 text-${textColor}`}>
            <h1>Please Login To Continue With iNoteBook</h1>
          </div>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className={`form-group text-${textColor} my-3`}>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control my-3"
                  id="email"
                  value={credential.email}
                  name="email"
                  aria-describedby="emailHelp"
                  onChange={onHandleChange}
                  placeholder="Enter email"
                />
              </div>
              <div className={`form-group text-${textColor} my-3`}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control my-3"
                  value={credential.password}
                  onChange={onHandleChange}
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className={`btn btn-outline-${buttonColor} my-3`}
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
