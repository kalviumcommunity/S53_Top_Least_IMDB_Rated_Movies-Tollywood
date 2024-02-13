import AllRoutes from './Routes/AllRoutes'
import './App.css'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import FormsUse from './Components/Form'

function App() {

  return (
    <>
      <Navbar />
      <AllRoutes />
      {/* <FormsUse /> */}
      <Footer />
    </>
  )
}

export default App
