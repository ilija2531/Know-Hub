import React from 'react'
import './SignUp.css'
import FullName from '../assets/Account/fullname.png'
import Mail from '../assets/Account/mail.png'
import UserName from '../assets/Account/username.png'
import Password from '../assets/Account/password.png'



const SignUp = () => {
  return (
    <>
                    
        
        <div className="container-signup">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={FullName} alt="" />
                    <input type="text" placeholder='Full Name' />
                </div>
                <div className="input">
                    <img src={Mail} alt="" />
                    <input type="email" placeholder='E-mail' />
                </div>
                <div className="input">
                    <img src={UserName} alt="" />
                    <input type="text" placeholder='User Name' />
                </div>
                <div className="input">
                    <img src={Password} alt="" />
                    <input type="password" placeholder='Password' />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">Sign Up</div>
            </div>
        </div>
       <div>
        <footer>@2025KnowHub All rights reserved!</footer>
       </div>
      
    </>
  )
}

export default SignUp