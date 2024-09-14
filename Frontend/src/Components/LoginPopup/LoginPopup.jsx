import React, { useState } from 'react'
import axios from 'axios'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import StoreContextProvider, { StoreContext } from '../../Context/StoreContext'
function LoginPopup({setShowLogin}) {
  const [currState,setCurrState]=useState("Sign up")

  let [data ,setdata ] = useState({name:"",email:"",password:""})

  const {setToken} = useContext(StoreContext)


  function onchangeHandler(e){
    setdata((data)=>({...data,[e.target.name]:e.target.value}))
  }

  async function submitHandler(e){
    e.preventDefault()

    let url = 'http://localhost:4000'

    let newurl = url

    if(currState == "Login"){
   
      newurl = `${url}/api/user/login`
      
    }else {
       newurl = `${url}/api/user/register`
    }

   await axios.post(newurl,data).then((res)=>{
    setToken(res.data.token)
      localStorage.setItem("token",res.data.token)
      setShowLogin(false)
    })

  }
  return (
    <>
      <div className="LoginPopup">
        <div className="Login-popup-content">
          <div className="Login-popup-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <form className="login-popup-input">
            {currState === 'Login' ? (
              <></>
            ) : (
              <input type="text" name='name' onChange={onchangeHandler} value={data.name} placeholder="Enter your Name" required />
            )}

            <input name='email' onChange={onchangeHandler} value={data.email}  type="email" placeholder="abc@gmail.com" />
            <input name='password' onChange={onchangeHandler} value={data.password}  type="password" placeholder="password" />
          </form>
          <button onClick={submitHandler}>{currState == 'Sign up' ? 'Create account' : 'Login'}</button>
          <div className="login-popup-condition">
            <input type="checkbox" name="" required id="" />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
          {currState === 'Sign up' ? (
            <p>
              Already have an account?{' '}
              <span onClick={() => setCurrState('Login')}>Login here</span>
            </p>
          ) : (
            <p>
              Create a new account?{' '}
              <span onClick={() => setCurrState('Sign up')}>Click here</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPopup