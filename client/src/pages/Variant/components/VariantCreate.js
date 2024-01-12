import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Autocomplete, Box, TextField } from "@mui/material";
import VariantsContext from "../../../context/VariantContext";
import ProductCatagorysContext from "../../../context/ProductCatagoryContext";

const VariantCreate = ({ handleClose, open }) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [store] = useState(user.store);
  const [productCatagory] = useState(user.productCatagory);

  // useState for the form inputs
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [condition, setCondition] = useState("");
  const [gender, setGender] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  // Context creation
  const { createVariant, error, isLoading } = useContext(VariantsContext);
  const { productCatagories, fetchProductCatagories } = useContext(
    ProductCatagorysContext
  );

  useEffect(() => {
    productCatagory && fetchProductCatagories();
    // eslint-disable-next-line
  }, [productCatagory]);

  const filteredPCatagory = productCatagories.filter((pCatagory) => {
    return pCatagory._id === productCatagory;
  });

  const productOption = filteredPCatagory[0]
    ? filteredPCatagory[0].productNames.map((productName) => ({
        label: `${productName.name}`,
        value: `${productName.name}`,
      }))
    : [];

  // Change handler functions
  const handleProductNameChange = (event, newValue) => {
    const selectedProductName = newValue ? newValue.value : "";
    setProductName(selectedProductName);
  };

  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };
  const handleModelNameChange = (e) => {
    setModelName(e.target.value);
  };
  const handleSizesChange = (e) => {
    setSizes(e.target.value.split(",").map((size) => size.trim()));
  };
  const handleColorsChange = (e) => {
    setColors(e.target.value.split(",").map((color) => color.trim()));
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleShortDescriptionChange = (e) => {
    setShortDescription(e.target.value);
  };

  // Handle image changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => setFileToBase(file));
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFiles((prevImageFiles) => [...prevImageFiles, reader.result]);
    };
  };

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createVariant(
      productName,
      brandName,
      modelName,
      imageFiles,
      sizes,
      colors,
      price,
      amount,
      condition,
      gender,
      shortDescription,
      store,
      productCatagory
    );
    if (success) {
      setProductName("");
      setBrandName("");
      setModelName("");
      setCondition("");
      setGender("");
      setPrice("");
      setColors([]);
      setSizes([]);
      setAmount("");
      setShortDescription("");
      setImageFiles([]);
      handleClose();
    }
  };

  return (
    <Modal
      title="New Variant"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
      error={error}
      isLoading={isLoading}
    >
      <form encType="multipart/form-data">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ m: 1, textAlign: "center" }}>
            <Autocomplete
              options={productOption}
              value={productName}
              onChange={(event, newValue) =>
                handleProductNameChange(event, newValue)
              }
              freeSolo
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  label="Product Name"
                  type="text"
                  variant="standard"
                  style={{ width: "300px" }}
                />
              )}
            />
            <TextField
              margin="dense"
              label="Model Name"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={modelName}
              onChange={handleModelNameChange}
            />
            <TextField
              margin="dense"
              label="Sizes"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={sizes}
              onChange={handleSizesChange}
            />{" "}
            <TextField
              margin="dense"
              label="Price"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={price}
              onChange={handlePriceChange}
            />
            <TextField
              margin="dense"
              label="Condition"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={condition}
              onChange={handleConditionChange}
            />{" "}
            <TextField
              margin="dense"
              label="Description"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={shortDescription}
              onChange={handleShortDescriptionChange}
            />
          </Box>
          <Box sx={{ m: 1, textAlign: "center" }}>
            <TextField
              margin="dense"
              label="Brand Name"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={brandName}
              onChange={handleBrandNameChange}
            />
            <TextField
              margin="dense"
              label="Colors"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={colors}
              onChange={handleColorsChange}
            />
            <TextField
              margin="dense"
              label="Amount"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={amount}
              onChange={handleAmountChange}
            />{" "}
            <TextField
              margin="dense"
              label="Gender"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={gender}
              onChange={handleGenderChange}
            />{" "}
            <TextField
              margin="dense"
              label="Images"
              type="file"
              sx={{ minWidth: 300 }}
              variant="standard"
              inputProps={{ multiple: true }}
              onChange={handleImageChange}
            />
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default VariantCreate;
