import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import TaskIcon from '@mui/icons-material/Task';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import IosShareIcon from '@mui/icons-material/IosShare';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import Groups3Icon from '@mui/icons-material/Groups3';
import RecentActorsIcon from '@mui/icons-material/RecentActors';




import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';

const SidebarApp = () => {


  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    < Sidebar collapsed={collapsed}>
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                color: disabled ? '#95bf9d' : '#007a16',
                backgroundColor: active ? '#c3deba' : undefined,
              };
          },
        }}
      >
        <MenuItem icon={<MenuOutlinedIcon />} onClick={toggleCollapsed} />
        <SubMenu defaultOpen active label="Management" icon={<SettingsTwoToneIcon />}>
          <MenuItem component={<Link to={"/groups"} />}>Create Groups</MenuItem>
          <MenuItem component={<Link to={"/add-task"} />}>Task</MenuItem>
        </SubMenu>

        <SubMenu active label="Assigments" icon={<SaveAsTwoToneIcon />}>
          <MenuItem component={<Link to={"/courses"} />}>Task to User</MenuItem>
          
        </SubMenu>

        <SubMenu defaultOpen active label="Taks" icon={<ListAltIcon />}>
          <MenuItem icon={<ListAltIcon />} component={<Link to="/list-task" className="link" />}>Assigned to me</MenuItem>
        </SubMenu>

        <MenuItem component={<Link to="/map" className="link" />}>
          <ContactsOutlinedIcon /> Map
        </MenuItem>
      </Menu>
    </Sidebar>

  )
};

export default SidebarApp;
