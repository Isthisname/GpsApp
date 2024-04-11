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

const MySidebar2 = () => {


  const [collapsed, setCollapsed] = useState(false);



  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
  
    <Sidebar collapsed={collapsed}>

     <Menu iconShape="square" >
        <MenuItem  icon={<MenuOutlinedIcon />} onClick={toggleCollapsed}/>
      
        <SubMenu label="Task" icon={<TaskIcon />}>
          <MenuItem icon={<AddIcon />} component={<Link to="/add-task" className="link" />}>Add Task</MenuItem>
          <MenuItem icon={<ListAltIcon/>} component={<Link to="/list-task" className="link" />}>List Task</MenuItem>
          <MenuItem icon={<IosShareIcon/>}>Asign Task</MenuItem>
        </SubMenu>
        <SubMenu label="Groups" icon={<Groups3Icon />}>
          <MenuItem icon={<GroupAddIcon/>} component={<Link to="/add-groups" className="link" />}>Add Group</MenuItem>
          <MenuItem icon={<RecentActorsIcon/>} component={<Link to="/list-groups" className="link" />}>List Groups</MenuItem>
        </SubMenu>      
        <MenuItem component={<Link to="/map" className="link" />}>
              <ContactsOutlinedIcon /> Map
            </MenuItem>
        </Menu>
    </Sidebar>  
  )
};

export default MySidebar2;
