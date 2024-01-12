import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CardWrapper = styled(Box)(() => ({
  border: "0",
  boxShadow: "0 10px 10px 20px #b0b8d617, 10px 10px 15px -5px #b0b8d6",
  borderRadius: "8px",
  padding: "50px",
  minHeight: "440px",
}));

export const StyledBox = styled(Box)(() => ({
  minHeight: "calc(100vh - 250px)",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
