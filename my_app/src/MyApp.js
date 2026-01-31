import React, { useContext } from 'react'
import App from './App'
import './MyApp.scss';
import { AuthContext } from './context/AuthContext'
import Sidebar from './components/Sidebar'
export default function MyApp() {
    const { admin } = useContext(AuthContext)
    return (
        <div className="myApp" >
            <App />
            {admin && (
                <Sidebar />
            )}
        </div>
    )
}
