import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Welcome from "./pages/Welcome/Welcome.jsx";
import MyCourses from "./pages/MyCourses/MyCourses.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";
import MyProfile from "./pages/MyProfile/MyProfile.jsx";
import CourseCreationPage from "./CourseCreation/courseCreationPage.jsx";
import SignUp from "./SignUp/SignUp.jsx";
import Login from "./Login/Login.jsx";
import { Route, Routes } from "react-router-dom";

function App() {



    const current_theme = localStorage.getItem('current_theme');
    const [theme, setTheme] = useState(current_theme ? current_theme :'light');

    useEffect(()=>{
      localStorage.setItem('current_theme', theme);
    },[theme])

    return(
      <>
     <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme}/>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/myCourses" element={<MyCourses/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/myProfile" element={<MyProfile/>}/>
      </Routes>
      <Footer/>
      </div>
      </>
    );
}

export default App
