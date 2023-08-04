import "../styles/Header.css"
import {useState, useEffect} from 'react'
//import {MdWbSunny, MdNightlight} from "react-icons/md"

export default function Header({currencys, fun, cur}) {
  const [theme, setTheme] = useState(true)
  const toggleTheme = _ => {
    setTheme(!theme)
  }
  useEffect(() => {
    if(!theme){
      //linear-gradient(#b7daac, #315439)
      document.documentElement.style.setProperty("--bg","#c9ffdb")
      document.documentElement.style.setProperty("--colorS","linear-gradient(#08771c, #14b157)")
      document.documentElement.style.setProperty("--colorTxtCR","black") 
    }else{
      document.documentElement.style.setProperty("--bg","#121212")
      document.documentElement.style.setProperty("--colorS","#1f1f1f")
      document.documentElement.style.setProperty("--colorTxtCR","#eff2f7")  
    }
  },[theme])
  
  return (
    <header className='app-header'>
      <p>Crypto Dash</p>
      <div className='select-button'>
      <select value={cur} id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      <button className='toogleMode' onClick={toggleTheme}>
        {!theme ? <img src="../img/Sol.png" className="icon-toogle" alt="Sol"size={30}/>
        : <img src="../img/Luna-Gray.png" className="icon-toogle" alt="Luna"size={30}/>
        }
      </button>
      </div>
    </header>
  )
}
