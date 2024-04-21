import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";

import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";

const SidebarApp = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sidebar collapsed={collapsed}>
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                color: disabled ? "#95bf9d" : "#007a16",
                backgroundColor: active ? "#c3deba" : undefined,
              };
          },
        }}
      >
        <MenuItem icon={<MenuOutlinedIcon />} onClick={toggleCollapsed} />
        <SubMenu
          defaultOpen
          active
          label="Management"
          icon={<SettingsTwoToneIcon />}
        >
          <MenuItem component={<Link to={"/groups"} />}>Groups</MenuItem>
          <MenuItem component={<Link to={"/add-task"} />}>Tasks</MenuItem>
        </SubMenu>

        <SubMenu
          defaultOpen
          active
          label="My Assigments"
          icon={<ListAltIcon />}
        >
          <MenuItem
            icon={<ListAltIcon />}
            component={<Link to="/list-task" className="link" />}
          >
            Check My tasks
          </MenuItem>
        </SubMenu>

        <SubMenu active label="Live View Map" icon={<SaveAsTwoToneIcon />}>
          <MenuItem component={<Link to="/map" className="link" />}>
            Map
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SidebarApp;
