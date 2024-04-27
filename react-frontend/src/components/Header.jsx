import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = ({ onLogout, username }) => {
  return (
    <AppBar sx={{ backgroundColor: "#1b5e20" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, height: "1.5em" }}
        >
          Gps Assign Task
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => {}}
          sx={{ fontSize: "1.1em" }}
        >
          <AccountCircleIcon />
          {username}
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => {
            onLogout();
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
