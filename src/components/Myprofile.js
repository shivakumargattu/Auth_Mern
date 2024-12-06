import React,{useContext,useState, useEffect} from 'react'
import { store } from '../App'
import { Navigate } from 'react-router-dom'
import axios from 'axios'


const Myprofile = () => {
    const [token, setToken]= useContext(store)
    const [data,setData]=useState(null);
    useEffect(()=>{
      axios.get("http://localhost:5000/myprofile",{
        headers:{
            "x-token":token
        }
      }).then(res=>setData(res.data)).catch((err)=>console.log(err))
    },[token])
    if(!token){
        return <Navigate to="/login"/>
    }
  return (
    <div>
       {data && <center>
           Hellow  Well come to :{data.username}
            <br/>
            <button onClick={()=>setToken(null)}>log out</button>
        </center>
       }
    </div>
       
  )
}

export default Myprofile