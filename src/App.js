import React,{useState,createContext} from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import "./App.css"
import Register from './components/Register';
import Login from './components/Login';
import Myprofile from './components/Myprofile';

export const store= createContext();

const App = () => {
  
const [token, setToken]= useState(null);
  return (
    <div>
    <store.Provider value={[token,setToken]}>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/register' Component={Register}/>
        <Route path="/login" Component={Login}/>
        <Route path="/myprofile" Component={Myprofile}/> 
      </Routes>
    </BrowserRouter>
    </store.Provider>

    </div>
  )
}

export default App