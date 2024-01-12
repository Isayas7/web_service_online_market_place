import React, { useState } from "react";
import SideBar from "./Sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Box from "@mui/material/Box";
import TogglePovider from "../context/SidebarContext";
import { VariantProvider } from "../context/VariantContext";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [isDrawerHover, setDrawerHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
    setDrawerHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setDrawerHover(false);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const ValueToShare = {
    isSidebarOpen,
    isHover,
    isDrawerHover,
    handleMouseEnter,
    handleMouseLeave,
    toggleSidebar,
  };

  return (
    <TogglePovider.Provider value={ValueToShare}>
      <Box ml={1}>
        <VariantProvider>
          <NavBar />
        </VariantProvider>
        <SideBar />
        <Box
          sx={{
            mt: "5rem",
            ml: isSidebarOpen ? "260px" : "70px",
            transition: "0.5s",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </TogglePovider.Provider>
  );
}

export default Layout;
