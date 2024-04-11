import { useState } from "react";
import { ProSidebar, MenuItem } from "react-pro-sidebar";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return <ProSidebar />;
};

export default Sidebar;
