import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import MyLearning from "./pages/MyLearning/MyLearning.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
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
        <Route path="/" element={<Home/>}/>
        <Route path="/myLearning" element={<MyLearning/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
      </Routes>
      </div>
      </>
    );
}

export default App
