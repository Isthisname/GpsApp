import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import { isAuthenticated } from "./utils/auth"; // Import isAuthenticated function

import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapPage from "./pages/map/map";
import MySidebar2 from "./components/sidebar/MySidebar2";

import Header from "./components/Header/Header";
import AddTask from "./pages/task/AddTask";
import ListTask from "./pages/task/ListTask";
import ListGroups from "./pages/groups/ListGroups";
import AddGroup from "./pages/groups/AddGroups";
import * as auth from "./utils/auth";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated()); // Update isLoggedIn state
    };
    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Set isLoggedIn to true after successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false after logout
    auth.removeToken();
  };

  const handleProfileClick = () => {
  
  };

  return (
    
    <Router>
     {isLoggedIn? <Header user={"user Test"} onProfileClick={handleProfileClick} onLogoutClick={handleLogout}/>:<div></div>}
      <div style={{ display: 'flex' }}>
     
      {isLoggedIn? <MySidebar2/>:<div></div>}
      
      
        <Routes>
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />}/>
          <Route path="/" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <WelcomePage />}/>
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path="/welcome" element={isLoggedIn?<WelcomePage />:<LoginPage/>} />

          
          <Route path="/add-task" element={isLoggedIn ? <AddTask/> : <WelcomePage />}/>
          <Route path="/list-task" element={isLoggedIn ? <ListTask/> : <WelcomePage />}/>

          <Route path="/list-groups" element={isLoggedIn ? <ListGroups/> : <WelcomePage />}/>
          <Route path="/add-groups" element={isLoggedIn ? <AddGroup/> : <WelcomePage />}/>

          <Route path="/map" element={isLoggedIn?<MapPage/>: <WelcomePage />} />
        </Routes>
      </div>

    </Router>
  );
};

export default App;
