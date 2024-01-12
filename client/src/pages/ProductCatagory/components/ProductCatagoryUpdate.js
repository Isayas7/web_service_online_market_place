import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Box, TextField } from "@mui/material";
import ProductCatagorysContext from "../../../context/ProductCatagoryContext";

const ProductCatagoryUpdate = (props) => {
  const { handleClose, open, productCatagoryId } = props;

  //   context inclusiion
  const { editProductCatagoryById, productCatagories } = useContext(
    ProductCatagorysContext
  );

  const productCatagory = productCatagories.filter((pro) => {
    return pro._id === productCatagoryId;
  });

  // useSate for hte for input
  const [productCatagoryName, setProductCatagoryName] = useState(
    productCatagory[0].productCatagoryName
  );
  const [productNames, setProductNames] = useState(productCatagory[0].product);

  const [imageFile, setImageFile] = useState(productCatagory[0].image.url);

  // Change handler funtions
  const handleProductCatagoryNameChange = (e) => {
    setProductCatagoryName(e.target.value);
  };
  const handleProductNamesChange = (e) => {
    setProductNames(e.target.value.split(",").map((size) => size.trim()));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
  };

  // submit functions
  const handleSubmit = () => {
    const success = editProductCatagoryById(
      productCatagoryId,
      productCatagoryName,
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
      title="Edit ProductCatagory"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      width="550px"
    >
      <form>
        <Box className="flex flex-col">
          <TextField
            margin="dense"
            label="Category"
            type="text"
            sx={{ minWidth: 300 }}
            variant="standard"
            value={productCatagoryName}
            onChange={handleProductCatagoryNameChange}
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
      </form>
    </Modal>
  );
};

export default ProductCatagoryUpdate;
