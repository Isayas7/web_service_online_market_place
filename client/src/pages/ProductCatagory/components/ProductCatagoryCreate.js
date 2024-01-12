import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Box, TextField } from "@mui/material";
import ProductCatagorysContext from "../../../context/ProductCatagoryContext";

const ProductCatagoryCreate = ({ handleClose, open }) => {
  // useSate for hte for input
  const [productCatagoryName, setProductCatagoryName] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const [productNames, setProductNames] = useState([]);
  // context creation
  const { createProductCatagory, error, isLoading } = useContext(
    ProductCatagorysContext
  );

  // Change handler funtions
  const handleproductCatagoryNameChange = (e) => {
    setProductCatagoryName(e.target.value);
  };

  const handleProductNamesChange = (e) => {
    setProductNames(e.target.value.split(",").map((size) => size.trim()));
  };

  //handle and convert it in base 64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
  };

  // submit functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productCatagoryName, productNames);
    const success = await createProductCatagory(
      productCatagoryName,
      imageFile,
      productNames
    );
    if (success) {
      setProductCatagoryName("");
      setProductNames([]);
      setImageFile([]);
      handleClose();
    }
  };

  return (
    <Modal
      title="New ProductCatagory"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      error={error}
      isLoading={isLoading}
      width="550px"
    >
      <form
        encType="multipart/form-data"
        style={{ display: "inline-grid", padding: "10px" }}
      >
        <Box className="flex flex-col">
          <TextField
            margin="dense"
            label="Category"
            type="text"
            sx={{ minWidth: 300 }}
            variant="standard"
            value={productCatagoryName}
            onChange={handleproductCatagoryNameChange}
          />

          <TextField
            margin="dense"
            label="Product Names"
            type="text"
            placeholder="split the names by comma"
            sx={{ minWidth: 300 }}
            variant="standard"
            value={productNames}
            onChange={handleProductNamesChange}
          />
          <TextField
            margin="dense"
            label="Image"
            type="file"
            sx={{ minWidth: 300 }}
            variant="standard"
            onChange={handleImageChange}
          />
        </Box>
        {/* <img src={imageFile} alt="" width="100px" height="150px" /> */}
      </form>
    </Modal>
  );
};

export default ProductCatagoryCreate;
