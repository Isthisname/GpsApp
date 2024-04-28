import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import { isAuthenticated } from "./utils/auth"; // Import isAuthenticated function

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapPage from "./pages/map/MapPage";
import MySidebar from "./components/SidebarApp";

import Header from "./components/Header";
import AddTask from "./pages/task/AddTask";
import ListTask from "./pages/task/ListTask";
import CreateGroup from "./pages/groups/GroupManager";
import ManagementGroupPage from "./pages/groups/ ManagementGroupPage";
import * as auth from "./utils/auth";
import { Container, Grid } from "@mui/material";
import SidebarApp from "./components/SidebarApp";
import TaskForm from "./components/task/TaskForm";
import MapComponent from "./components/maps/MapComponent";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [loginName, setLoginName] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated()); // Update isLoggedIn state
    };
    checkAuthStatus();
  }, []);

  const handleLogin = (user) => {
    setLoginName(user);
    setIsLoggedIn(true); // Set isLoggedIn to true after successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false after logout
    auth.removeToken();
  };

  const handleProfileClick = () => {};

  return (
    <Container
      maxWidth="xl"
      sx={{ padding: "1px 1px !important", marginTop: "65px" }}
    >
      <Router>
        <Grid container spacing={0}>
          {isLoggedIn ? <Header onLogout={handleLogout} /> : null}
          <Grid item xs={2}>
            {isLoggedIn ? <SidebarApp /> : null}
          </Grid>
          <Grid item xs={10}>
            <Routes>
              <Route
                path="/signup"
                element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />}
              />

              <Route
                path="/"
                element={isLoggedIn ? <HomePage /> : <WelcomePage />}
              />
              <Route
                path="/login"
                element={
                  !isLoggedIn ? (
                    <LoginPage setIsLoggedIn={handleLogin} />
                  ) : (
                    <HomePage />
                  )
                }
              />
              <Route
                path="/add-task"
                element={isLoggedIn ? <AddTask /> : <WelcomePage />}
              />
              <Route
                path="/list-task"
                element={isLoggedIn ? <ListTask /> : <WelcomePage />}
              />
              <Route
                path="/groups"
                element={isLoggedIn ? <ManagementGroupPage /> : <WelcomePage />}
              />
              <Route
                path="/map"
                element={
                  isLoggedIn ? (
                    <MapComponent
                      data={[
                        { lat: 40.5486807849397, lng: -111.9137212403442 },
                      ]}
                    />
                  ) : (
                    <WelcomePage />
                  )
                }
              />
              <Route
                path="/test"
                element={isLoggedIn ? <ManagementGroupPage /> : <WelcomePage />}
              />
            </Routes>
          </Grid>
        </Grid>
      </Router>
    </Container>
  );
};

export default App;
