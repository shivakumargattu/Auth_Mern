import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { store } from '../App'

const Navbar = () => {
  const [token,setToken]=useContext(store)
  return (
    <div>{!token&&
    <nav class="navContainer">
    <div>
    <h4>Logo</h4>
    </div>
    <ul>
       <Link className='linkStale' to="/register" ><li>Register</li></Link>
       <Link  className="linkStale" to="/login"> <li>Login</li></Link>
    </ul>
    </nav>
        
    }</div>
  )
}

export default Navbar