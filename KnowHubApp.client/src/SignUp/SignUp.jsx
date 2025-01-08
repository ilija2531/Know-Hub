import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import fullName from "../assets/Account/fullname.png";
import mail from "../assets/Account/mail.png";
import userName from "../assets/Account/username.png";
import password from "../assets/Account/password.png";
import { useAuth } from "../AuthContext/AuthContext"; // Import the useAuth hook

const SignUp = () => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [UserName, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthToken } = useAuth(); // Access the setAuthToken function from context

  const handleSignUp = async () => {
    if (!FullName || !Email || !UserName || !Password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5188/api/accounts/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ FullName, Email, UserName, Password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAuthToken(data.token); // Use context to store the token
        alert("Sign up successful!");
        navigate("/home");
      } else {
        alert("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="container-signup">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={fullName} alt="" />
            <input
              type="text"
              name="FullName"
              placeholder="Full Name"
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={mail} alt="" />
            <input
              type="email"
              name="Email"
              placeholder="E-mail"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={userName} alt="" />
            <input
              type="text"
              name="UserName"
              placeholder="User Name"
              value={UserName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password} alt="" />
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSignUp}>
            Sign Up
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
