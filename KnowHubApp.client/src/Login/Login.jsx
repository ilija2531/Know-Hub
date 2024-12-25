import React from 'react'
import './Login.css'
import UserName from '../assets/Account/username.png'
import Password from '../assets/Account/password.png'

const Login = () => {
  return (
    <>
            <div className="container-login">
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    
                    <div className="input">
                        <img src={UserName} alt="" />
                        <input type="text" placeholder='User Name' />
                    </div>
                    <div className="input">
                        <img src={Password} alt="" />
                        <input type="password" placeholder='Password' />
                    </div>
                </div>
                <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>
                <div className="submit-container">
                    <div className="submit">Login</div>
                </div>
            </div>
        
            <div>
                <footer>@2025KnowHub All rights reserved!</footer>
            </div>
        </>
   
  )
}

export default Login