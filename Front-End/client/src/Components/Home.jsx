import "../App.css"
import {useEffect} from "react"

const api = "mongodb+srv://jahnaveshreddy:jahnavreddy@cluster0.4atmmjr.mongodb.net/Asap-project"

function Home() {

  useEffect(()=>{
    fetch("http://localhost:3000/ping")
    .then(data=>data.json())
    .then(res=>console.log(res))
    .catch(err =>{
      console.log("error",err)
    })
  })

  return(
    <div >

    </div>
  )
}

export default Home