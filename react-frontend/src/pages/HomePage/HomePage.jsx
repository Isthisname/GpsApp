import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomSidebar from "../../components/sidebar/customsidebar";
import ReactDOM from "react-dom";


import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div >
      <h2>Welcome Page</h2>
    </div>

  );
};

export default HomePage;
