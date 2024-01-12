import {
  StyledModal,
  StyledBox,
  StyledBoxFlex,
  StyledButton,
  ErrorLabel,
} from "../../../components/StyledComponents";
import { useContext } from "react";
import { StorePageProvider } from "../../../context/CreateContext";
import { Divider, Stack, TextField, Typography } from "@mui/material";
function Modal() {
  const {
    openModal,
    handleModalClose,
    formValues,
    setFormValues,
    AddNewStore,
    updateStore,
    rowToEdit,
    setRowToEdit,
    error,
    isLoading,
  } = useContext(StorePageProvider);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    if (formValues.storeName && formValues.storeLocation) {
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
      updateStore(formValues);
    } else {
       AddNewStore(formValues);
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
      <StyledBox sx={{ width: "30%" }}>
        <Typography
          variant="h6"
          marginBottom={3}
          color={"gray"}
          textAlign={"center"}
        >
          Manage Store
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Stack my={3} spacing={4}>
            <TextField
              id="outlined-basic"
              label="Store Name"
              name="storeName"
              variant="outlined"
              value={formValues.storeName}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-basic"
              name="storeLocation"
              label="Location"
              variant="outlined"
              value={formValues.storeLocation}
              onChange={handleInputChange}
            />
          </Stack>
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
              disabled={isLoading}
            >
              Cancel
            </StyledButton>
          </StyledBoxFlex>
        </form>
        {error && <ErrorLabel>{error}</ErrorLabel>}
      </StyledBox>
    </StyledModal>
  );
}
export default Modal;
