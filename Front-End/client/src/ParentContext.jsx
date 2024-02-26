import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const ParentContext = ({children}) => {

  const [id,setId] = useState("")
  const [login,setlogin]= useState(false)
  const [update,setUpdate] = useState(false)
  return <AppContext.Provider value={{login,setlogin,id,setId,update,setUpdate}}>
    {children}
    
  </AppContext.Provider>
}

export default  ParentContext