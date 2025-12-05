import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import MyUserProvider from "./context/MyUserProvider.jsx";
import { AuthProvider, MyAuthContext } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <MyUserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyUserProvider>
  </AuthProvider>
)
