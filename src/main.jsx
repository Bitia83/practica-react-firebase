import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import UserProvider from './context/UserProvider'
import 'flowbite-react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <UserProvider>
            <App />
            </UserProvider>
    </BrowserRouter>,
)
