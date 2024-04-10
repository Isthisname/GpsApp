import React, { useState } from 'react';
import styles from './CustomSidebar.module.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Import the hamburger menu icon

const CustomSidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState('320px'); // Default sidebar width

  const toggleSidebarWidth = () => {
    setSidebarWidth((prevWidth) => (prevWidth === '320px' ? '60px' : '320px'));
  };

  return (
    <div className={styles.sidebarContainer}>
      <button className={styles.hamburgerMenu} onClick={toggleSidebarWidth}>
        <FaBars />
      </button>
      <Sidebar width={sidebarWidth}>
        <Menu menuItemStyles={{ button: styles.menuItem }}>
          <MenuItem>
            <Link to="/documentation">Documentation</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/calendar">Calendar</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/e-commerce">E-commerce</Link>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;