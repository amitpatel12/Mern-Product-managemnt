import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() =>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    },[])

    const handleLogin = async () => {
        console.log(email, password)
        let result = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),    
            headers:{
                'Content-Type': 'application/json'
            }
        })

        result = await result.json();
        console.warn(result)

        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth))
            navigate('/')
        }
        else{
           alert('please enter correct data')
        }
    }
  return (
    <div className='login'>
        <h1>Log In</h1>
      <input className='inputBox' 
      type='text' 
      placeholder='Enter Email'
      value={email} 
      onChange={(e) => setEmail(e.target.value)}
      />
      <input 
      className='inputBox' 
      type='password' 
      placeholder='Enter Password' 
      value={password} 
      onChange={(e) => setPassword(e.target.value)}
      />

      <button className="appButton" type="button" onClick={handleLogin}>
        Log In
      </button>

    </div>
  )
}

export default LogIn
