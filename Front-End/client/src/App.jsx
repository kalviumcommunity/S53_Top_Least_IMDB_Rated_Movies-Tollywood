import AllRoutes from './Routes/AllRoutes'
import './App.css'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import FormsUse from './Components/Form'
import { useEffect,useContext } from 'react'
import { AppContext } from './ParentContext'

function App() {
  const {setlogin} = useContext(AppContext)

  useEffect(()=>{
    let data = localStorage.getItem("isLoggedIn")
    if(data == "true"){
      setlogin(true);
    }else{
      setlogin(false);
    }
  },[])

  return (
    <>
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  )
}

export default App
