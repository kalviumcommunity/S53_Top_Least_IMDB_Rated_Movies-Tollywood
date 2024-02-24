import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const ParentContext = ({children}) => {
  const [login,setlogin]= useState(false)
  return <AppContext.Provider value={{login,setlogin}}>
    {children}
    
  </AppContext.Provider>
}

export default  ParentContext