import React from "react";
import { Box } from "@mui/material";
import RotateRightIcon from "@mui/icons-material/RotateRight";

const Spinner = () => {
  return (
    <Box>
      <RotateRightIcon
        className="animate-spin font-bold text-lg"
        sx={{ fontSize: "68px", color: "#5e35b1" }}
      />
    </Box>
  );
};

export default Spinner;
