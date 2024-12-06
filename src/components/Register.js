import React,{useState} from 'react';
import axios from "axios"

const Register = () => {
    const [data,setData]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
    })

    const changeHandlar=e=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const submitHandler=e=>{
      e.preventDefault();
      axios.post("http://localhost:5000/register",data).then(
        res=>alert(res.data)
      )
    }

  return (
    <div>
    <center>
      <form onSubmit={submitHandler}>
        <h3>Register</h3>
        <input type='text' onChange={changeHandlar} name="username" placeholder='User name'/><br/>
        <input type='email' onChange={changeHandlar} name="email" placeholder='Email'/><br/>
        <input type='password' onChange={changeHandlar} name="password" placeholder='Password'/><br/>
        <input type='password' onChange={changeHandlar} name="confirmpassword" placeholder='Confirmpassword'/><br/>
        <input type="submit" value="Register"/>
     </form>
    </center>
    </div>
  )
}

export default Register