import React, { useState } from "react";
import { StyledButton } from "../../components/StyledComponents";
import Table from "./components/Table";
import Modal from "./components/Modal";
import AlertDialog from "./components/Dialog";
import { useContext, useEffect } from "react";
import { StoreManagerPageProvider } from "../../context/CreateContext";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function UserManagment() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { handleModalOpen, setStoreManagers } = useContext(
    StoreManagerPageProvider
  );

  useEffect(() => {
    fetch("http://localhost:4040/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
        Role: user.role,
      },
    })
      .then((response) => response.json())
      .then((data) => setStoreManagers(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Store Manager" value="1" />
              <Tab
                label="Admin"
                value="2"
                sx={{ display: user.role !== "super" ? "none" : "block" }}
              />
            </TabList>
          </Box>

          <TabPanel value="1">
            <StyledButton
              color="primary"
              variant="contained"
              onClick={handleModalOpen}
            >
              +New
            </StyledButton>
            <Table role="sm" />
            <Modal role="sm" />
            <AlertDialog />
          </TabPanel>
          <TabPanel value="2">
            <StyledButton
              color="primary"
              variant="contained"
              onClick={handleModalOpen}
            >
              +New
            </StyledButton>
            <Table role="admin" />
            <Modal role="admin" />
            <AlertDialog />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
