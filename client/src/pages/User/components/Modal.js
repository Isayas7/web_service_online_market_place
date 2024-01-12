import {
  StyledModal,
  StyledBox,
  StyledButton,
  StyledBoxFlex,
} from "../../../components/StyledComponents";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";

import { Grid } from "@mui/material";
import { StoreManagerPageProvider } from "../../../context/CreateContext";
import { StorePageProvider } from "../../../context/CreateContext";
import { useContext, useEffect } from "react";

function Modal({ role }) {
  const {
    formValues,
    rowToEdit,
    updateStoreManager,
    setFormValues,
    openModal,
    AddNewStoreManager,
    handleModalClose,
    setRowToEdit,
  } = useContext(StoreManagerPageProvider);
  const { stores, setStores } = useContext(StorePageProvider);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:4040/api/store", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
        Role: user.role,
      },
    })
      .then((response) => response.json())
      .then((data) => setStores(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const storeOption = stores.map((store) => ({
    label: `${store.storeLocation}(${store.storeName})`,
    value: store._id,
  }));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const validateForm = () => {
    if (
      formValues.firstName &&
      formValues.lastName &&
      formValues.gender &&
      formValues.email &&
      formValues.phoneNumber &&
      formValues.address
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    if (rowToEdit !== null) {
      setRowToEdit(null);
      updateStoreManager(formValues);
    } else {
      AddNewStoreManager(
        formValues.firstName,
        formValues.lastName,
        formValues.email,
        formValues.phoneNumber,
        formValues.gender,
        formValues.address,
        role,
        formValues.store
      );
    }
  };

  const handleCancel = () => {
    handleModalClose();
  };

  return (
    <StyledModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleModalClose}
    >
      <StyledBox sx={{ width: "50%" }}>
        <Typography
          variant="h6"
          marginBottom={3}
          color={"gray"}
          textAlign={"center"}
        >
          Manage Store Manager
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Grid my={3} container spacing={4}>
            <Grid item textAlign={"center"} xs={6}>
              <TextField
                id="outlined-basic"
                label="First Name"
                name="firstName"
                variant="outlined"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item textAlign={"center"} xs={6}>
              <TextField
                id="outlined-basic"
                name="lastName"
                label="Last Name"
                variant="outlined"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item textAlign={"center"} xs={6}>
              <TextField
                id="outlined-basic"
                name="email"
                label="Email"
                variant="outlined"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item textAlign={"center"} xs={6}>
              <TextField
                id="outlined-basic"
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item textAlign={"center"} xs={6}>
              <TextField
                id="outlined-basic"
                name="address"
                label="Address"
                type="text"
                variant="outlined"
                value={formValues.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item textAlign={"center"} xs={6}>
              <RadioGroup
                id="gender"
                name="gender"
                value={formValues.gender}
                onChange={handleInputChange}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                </Box>
              </RadioGroup>
            </Grid>

            <Grid
              item
              textAlign="center"
              xs={6}
              sx={{ display: role === "admin" ? "none" : "block" }}
            >
              <FormControl sx={{ width: "230px" }}>
                <InputLabel id="demo-simple-select-label">Store</InputLabel>

                <Select
                  sx={{
                    textAlign: "start",
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formValues.store}
                  name="store"
                  label="Store"
                  onChange={handleInputChange}
                >
                  {storeOption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider />
          <StyledBoxFlex mt={2}>
            <StyledButton
              color="primary"
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              style={{ marginRight: 10 }}
            >
              Submit
            </StyledButton>
            <StyledButton
              onClick={handleCancel}
              variant="contained"
              color="error"
            >
              Cancel
            </StyledButton>
          </StyledBoxFlex>
        </form>
      </StyledBox>
    </StyledModal>
  );
}
export default Modal;
