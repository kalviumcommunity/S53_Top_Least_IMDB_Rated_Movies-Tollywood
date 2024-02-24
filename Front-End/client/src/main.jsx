import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {ChakraProvider} from "@chakra-ui/react"
import ParentContext from './ParentContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <ParentContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ParentContext>
  
)
