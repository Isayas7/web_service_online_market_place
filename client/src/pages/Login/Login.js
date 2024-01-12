import { styled } from "@mui/material/styles";
import { Box, Button, Divider, Input, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Header from "../../components/UI/Header";

const ErrorLabel = styled(Box)(() => ({
  backgroundColor: "#FFF0F1",
  border: "1px solid #e5a9ac",
  padding: "5px",
  borderRadius: "10px",
  color: "#864348",
  marginTop: "10px",
}));
export const StyledButton = styled(Button)(() => ({
  backgroundColor: "#5E35B1",
  color: "white",
  margin: "5px",
  marginTop: "10px",
  marginBottom: "10px",
  "&:hover": {
    backgroundColor: "#3042b5",
  },
}));
export const StyledInput = styled(Input)(() => ({
  margin: "5px",
  marginTop: "10px",
}));
const StyledBox = styled(Box)(() => ({
  minHeight: "calc(100vh - 250px)",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CardWrapper = styled(Box)(() => ({
  border: "0",
  boxShadow: "0 10px 10px 20px #b0b8d617, 10px 10px 15px -5px #b0b8d6",
  borderRadius: "8px",
  padding: "50px",
  minHeight: "440px",
  marginTop: "200px",
  backgroundColor: "#fff",
}));
const styledImage = {
  width: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  textAlign: "center",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/dashboard");
      setUsername("");
      setPassword("");
    }
  };
  // changing active page to dashboard
  localStorage.setItem("path", JSON.stringify("/dashboard"));

  return (
    <>
      <Box sx={{ backgroundColor: "#EDF0FE", height: "100vh" }}>
        <Header isLogin={false} />
        <StyledBox>
          <CardWrapper>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={require("../../assets/unnamed.png")}
                alt={"W"}
                loading="Wolkite"
                style={styledImage}
              />
            </Box>
            <Divider sx={{ m: 2 }}>
              <Typography variant="h4" sx={{ fontFamily: "Fruktur" }}>
                OmniStock
              </Typography>
            </Divider>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                mb: 1,
                textAlign: "center",
                fontSize: 28,
                color: "#5E35B1",
                fontWeight: "400",
                fontFamily: "Pattaya",
              }}
            >
              Hi, Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 2, mb: 1, textAlign: "center", color: "#697586" }}
            >
              Enter your credentials to continue
            </Typography>

            <form onSubmit={handleSubmit}>
              <StyledInput
                type="text"
                placeholder="Username"
                fullWidth
                value={username}
                onChange={handleUsernameChange}
              />
              <StyledInput
                type="password"
                placeholder="Password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
              />

              <StyledButton type="submit" disabled={isLoading} fullWidth>
                Login
              </StyledButton>
              {error && <ErrorLabel>{error}</ErrorLabel>}
            </form>
            <Link to="/forgot-password">Forgot password?</Link>
          </CardWrapper>
        </StyledBox>
      </Box>
    </>
  );
};

export default Login;
