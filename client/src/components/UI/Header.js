import styled from "@emotion/styled";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "#fff",
  fontSize: "20px",
  marginLeft: "10px",
}));
const styledImage = {
  marginRight: "10px",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  objectFit: "cover",
};
const Header = ({ isLogin }) => {
  return (
    <AppBar
      sx={{
        backgroundColor: "#5e35b1",
        height: isLogin ? "0" : "100px",
      }}
    >
      <Toolbar
        position="fixed"
        className=" px-32"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#663ebc",
          boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
        }}
      >
        <StyledLink to="/" className="pl-64">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={require("../../assets/unnamed.png")}
              alt={"W"}
              loading="W"
              style={styledImage}
            />
            <Typography sx={{ fontFamily: "Fruktur", fontSize: "38" }}>
              OmniStock
            </Typography>
          </Box>
        </StyledLink>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end" }}
          className="pr-64"
        >
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/">About</StyledLink>
          <StyledLink to="/">Contact</StyledLink>
          {isLogin && <StyledLink to="/login">Login</StyledLink>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
