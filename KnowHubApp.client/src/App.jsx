import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Welcome from "./pages/Welcome/Welcome.jsx";
import MyCourses from "./pages/MyCourses/MyCourses.jsx";
import MyProfile from "./pages/MyProfile/MyProfile.jsx";
import CourseCreationPage from "./CourseCreation/CourseCreationPage.jsx";
import DeleteCourse from "./DeleteCourse/DeleteCourse.jsx";
import UpdateCourse from "./UpdateCourse/UpdateCourse.jsx";
import SignUp from "./SignUp/SignUp.jsx";
import Login from "./Login/Login.jsx";
import Logout from "./Logout/Logout.jsx";
import SingleCourse from "./pages/SingleCourse/SingleCourse.jsx";

function App() {
  // Initialize theme from localStorage or fallback to 'light'
  const current_theme = localStorage.getItem("current_theme") || "light";
  const [theme, setTheme] = useState(current_theme);

  // Update localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <>
      {/* Apply the theme to the main container */}
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          {/* Define all application routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myCourses" element={<MyCourses />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/deletecourse" element={<DeleteCourse />} />
          <Route path="/updatecourse" element={<UpdateCourse />} />
          <Route path="/coursecreation" element={<CourseCreationPage />} />
          <Route path="/courses/:courseDTOID" element={<SingleCourse />} />
          <Route path="/logout" element={<Logout />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
