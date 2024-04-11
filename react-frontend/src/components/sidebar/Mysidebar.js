import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
  ProSidebarProvider,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const App = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          <MenuItem
            component={<Link to="/" className="link" />}
            className="menu1"
            icon={
              <MenuOutlinedIcon
                onClick={() => {
                  collapseSidebar();
                }}
              />
            }
          >
            <h2>QUICKPAY</h2>
          </MenuItem>
          <SubMenu label="Navigation">
            <MenuItem component={<Link to="/teams" className="link" />}>
              <HomeOutlinedIcon /> Teams
            </MenuItem>
            <MenuItem component={<Link to="/people" className="link" />}>
              <PeopleOutlinedIcon /> People
            </MenuItem>
            <MenuItem component={<Link to="/create-task" className="link" />}>
              <ContactsOutlinedIcon /> Create Task
            </MenuItem>
          </SubMenu>
          <MenuItem component={<Link to="/profile" className="link" />}>
            <ReceiptOutlinedIcon /> Profile
          </MenuItem>
          <MenuItem component={<Link to="/faq" className="link" />}>
            <HelpOutlineOutlinedIcon /> FAQ
          </MenuItem>
          <MenuItem component={<Link to="/calendar" className="link" />}>
            <CalendarTodayOutlinedIcon /> Calendar
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default App;