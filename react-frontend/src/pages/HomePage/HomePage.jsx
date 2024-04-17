import React, { useState } from "react";

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div >
      <h2>Home Page</h2>
    </div>

  );
};

export default HomePage;
