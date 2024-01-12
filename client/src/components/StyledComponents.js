import {
  Box,
  Button,
  InputBase,
  Toolbar,
  styled,
} from "@mui/material";
import Modal from "@mui/material/Modal";

export const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});



export const StyledButton = styled(Button)(({ theme, color }) => ({
  backgroundColor: color === "primary" ? theme.palette.primary.main : "error",
  color: "white",
  "&:hover": {
    backgroundColor:
      color === "primary"
        ? theme.palette.primary.dark
        : theme.palette.error[500],
  },
}));

export const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
export const StyledBoxFlex = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent:"center"
});

export const StyledBox = styled(Box)({
  backgroundColor: "white",
  padding: 20,
  borderRadius: 20,
});


export const StyledSearch = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#F5F6FC",
  borderRadius: "24px",
  width: "300px",
});

export const SearchInput = styled(InputBase)({
  padding: "10px",
  width: "100%",
  height: "32px",
});

export const ErrorLabel = styled(Box)(() => ({
  backgroundColor: "#FFF0F1",
  border: "1px solid #e5a9ac",
  padding: "5px",
  borderRadius: "10px",
  color: "#864348",
  marginTop: "10px",
}));
