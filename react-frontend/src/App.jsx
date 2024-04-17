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
import MapPage from "./pages/map/MapPage";
import MySidebar from "./components/SidebarApp";

import Header from "./components/Header";
import AddTask from "./pages/task/AddTask";
import ListTask from "./pages/task/ListTask";
import CreateGroup from "./pages/groups/GroupManager";
import ManagementGroupPage from './pages/groups/ ManagementGroupPage'
import * as auth from "./utils/auth";
import { Container, Grid } from "@mui/material";
import SidebarApp from "./components/SidebarApp";
import TaskForm from "./components/task/TaskForm";


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
    <Container maxWidth="xl" sx={{padding: '1px 1px !important', marginTop:'65px'}}>
    <Router>
      <Grid container spacing={0}  >
        {isLoggedIn ? <Header /> : null}
        <Grid item xs={2}>
        {isLoggedIn ? <SidebarApp/>:null}
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />} />
            <Route path="/" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <WelcomePage />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/welcome" element={isLoggedIn ? <WelcomePage /> : <LoginPage />} />
            <Route path="/add-task" element={isLoggedIn ? <AddTask /> : <WelcomePage />} />
            <Route path="/list-task" element={isLoggedIn ? <ListTask /> : <WelcomePage />} />
            <Route path="/groups" element={isLoggedIn ? <ManagementGroupPage /> : <WelcomePage />} />
            <Route path="/map" element={isLoggedIn ? <TaskForm /> : <WelcomePage />} />
            <Route path="/test" element={isLoggedIn ? <ManagementGroupPage /> : <WelcomePage />} />
          </Routes>
        </Grid>
      </Grid>
    </Router>
  </Container>
  );
};

export default App;
