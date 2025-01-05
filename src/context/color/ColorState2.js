import React,{useState,useEffect} from 'react'
import colorContext from './colorContext'

const ColorState2 = (props) => {
   
    const [mode, setMode] = useState('light');
    const [modeText, setModeText] = useState('Enable dark Mode');
    const [textColor, settextColor] = useState('black');
    const [buttonColor,setButtonColor]=useState('primary');
    
   
    const toggelMode = () => {
     
        if (mode === 'light') {
            setMode('dark');
            setModeText('Disable Dark Mode');
            settextColor('white');
            setButtonColor('light')
            document.body.style.backgroundColor = "#343a40"
        } else {
            setMode('light');
            setModeText('Enable Dark Mode')
            settextColor('black');
            setButtonColor('primary');
            document.body.style.backgroundColor = "white"
            
        }
    }
  return (
    <>
      <colorContext.Provider value={{ toggelMode, mode, modeText, textColor,buttonColor }} >
                {props.children}
            </colorContext.Provider>

    </>
  )
}

export default ColorState2
