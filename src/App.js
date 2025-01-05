import React, { useState } from 'react';
import './App.css';
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import ColorState2 from './context/color/ColorState2';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Profile from './component/Profile';
import Loader from './component/Loader';
function App() {
  const [alert, setalert] = useState();
  const [mode, setMode] = useState('light');
  const [modeText, setModeText] = useState('Enable dark Mode');
  const [textColor, settextColor] = useState('dark');
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
  const toggelMode = () => {
    if (mode == 'light') {
      setMode('dark');
      setModeText('Disable Dark Mode');
      settextColor('white');
      document.body.style.backgroundColor = "#343a40"


    } else {
      setMode('light');
      setModeText('Enable Dark Mode')
      settextColor('black');
      document.body.style.backgroundColor = "white"
    }
  }


  return (
    <>
   
      <NoteState>
     <ColorState2>
         
          <Router>
            <Navbar mode={mode}  modeText={modeText} textColor={textColor} />
            <Alert alert={alert}/>
        
            <div className="container">

              <Routes>

                <Route exact path='/' element={<Home textColor={textColor} showAlert={showAlert}/>}> </Route>
                <Route exact path='/about' element={<About showAlert={showAlert} />}> </Route>
                <Route exact path='/login' element={<Login showAlert={showAlert}/>}> </Route>
                <Route exact path='/signup' element={<SignUp showAlert={showAlert}/>} > </Route>
                <Route exact path='/profile' element={<Profile showAlert={showAlert}/>} > </Route>
              </Routes>
            </div>
          </Router>
          </ColorState2>
      </NoteState>
    </>
  );
}

export default App;
