import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Dashboard, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import TogglePovider from "../context/SidebarContext";

import styled from "@emotion/styled";

const extended = 260;
const collapse = 70;
function SideBar() {
  const {
    isSidebarOpen,
    isDrawerHover,
    isHover,
    handleMouseEnter,
    handleMouseLeave,
  } = useContext(TogglePovider);

  const [isActivePage, setIsActivePage] = useState(
    JSON.parse(localStorage.getItem("path"))
  );

  // custom style
  // list item style
  const listStyle = {
    display: isSidebarOpen || isDrawerHover ? "flex" : "none",
    alignItems: "center",
    fontFamily: "Poppins",
    fontWeight: 500,
    whiteSpace: "nowrap",
    "&:hover": {
      color: "#774FBF",
    },
  };

  // link
  const styledLink = {
    textDecoration: "none",
    margin: "0px 0px 4px",
    padding: 0,
  };

  // styled List
  const styledList = {
    paddingTop: "0",
    padding: "0",
    marginLeft: "3px",
    marginRight: "3px",
    paddingBottom: isSidebarOpen ? "8px" : "0px",
  };

  // button in Link
  const styledButton = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    color: "#000",
    background: "#fff",
    borderRadius: 2,
    height: "46px",
    marginBottom: "3px",
    padding: isSidebarOpen ? "10px 16px 10px 24px" : "15px",
    "&:hover": {
      background: "#EDE7F6",
      borderRadius: 2,
      color: "#774FBF",
    },
  };

  const styledActiveButton = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    height: "46px",
    padding: isSidebarOpen ? "10px 16px 10px 24px" : "15px",
    background: "#EDE7F6",
    borderRadius: 2,
    marginBottom: "3px",
    color: "#774FBF",
    "&:hover": {
      background: "#EDE7F6",
      borderRadius: 2,
      color: "#774FBF",
    },
  };

  // icon wrapper

  const StyledIconWrapper = styled(ListItemIcon)({
    minWidth: "36px",
    color: "#5e35b1",
  });

  // Styled text
  const itemTextStyle = {
    fontFamily: "Poppins",
    fontWeight: 400,
  };

  const [menuItems] = useState(() => getMenuItems());
  function getMenuItems() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "admin" || user.role === "super") {
      return [
        {
          text: <Typography sx={itemTextStyle}>Dashboard</Typography>,
          icon: <Dashboard />,
          path: "/dashboard",
        },
        {
          text: <Typography sx={itemTextStyle}>Store</Typography>,
          icon: <Store />,
          path: "store",
        },
        {
          text: <Typography sx={itemTextStyle}>Product Catagory</Typography>,
          icon: <Store />,
          path: "productCatagory",
        },
        {
          text: <Typography sx={itemTextStyle}>Users</Typography>,
          icon: <SupervisedUserCircleIcon />,
          path: "user",
        },
      ];
    } else {
      return [
        {
          text: <Typography sx={itemTextStyle}>Dashboard</Typography>,
          icon: <Dashboard />,
          path: "/dashboard",
        },
        {
          text: <Typography sx={itemTextStyle}>Product Catagory</Typography>,
          icon: <Store />,
          path: "productCatagory",
        },
      ];
    }
  }
  const handleClick = (path) => {
    localStorage.setItem("path", JSON.stringify(path));
    setIsActivePage(JSON.parse(localStorage.getItem("path")));
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: isSidebarOpen || isHover ? extended : collapse,
          transition: "0.5s",
        },
      }}
    >
      <Box
        className="flex items-center justify-start pl-6"
        style={{
          marginBottom: isSidebarOpen || isDrawerHover ? 5 : 19,
          height: "70px",
          backgroundColor: "#5e35b1",
          color: "#fff",
        }}
      >
        <LocalGroceryStoreOutlinedIcon className="w-8 h-8 mr-1" />
        <Typography
          variant="h6"
          sx={{
            display: isSidebarOpen || isDrawerHover ? "flex" : "none",
            cursor: "pointer",
          }}
        >
          <Link to="/dashboard">OmniStock</Link>
        </Typography>
      </Box>

      {/* list of admin page */}
      <List sx={styledList}>
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path} style={styledLink}>
            <ListItemButton
              key={item.path}
              onClick={() => handleClick(item.path)}
              sx={
                isActivePage === item.path ? styledActiveButton : styledButton
              }
              className="flex items-center"
            >
              <StyledIconWrapper key={item.text}>{item.icon}</StyledIconWrapper>
              <ListItemText
                primary={item.text}
                key={item.path}
                sx={listStyle}
                className="my-auto"
              />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
