import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Autocomplete, Box, TextField } from "@mui/material";
import VariantsContext from "../../../context/VariantContext";
import ProductCatagorysContext from "../../../context/ProductCatagoryContext";

const VariantUpdate = (props) => {
  // props
  const { handleClose, open, variantId } = props;

  // from local storage
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [productCatagory] = useState(user.productCatagory);

  //   context inclusiion
  const { editVariantById, variants } = useContext(VariantsContext);
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
        label: productName,
        value: productName,
      }))
    : [];

  const variant = variants.filter((pro) => {
    return pro._id === variantId;
  });

  // useSate for hte for input
  const [productName, setProductName] = useState(variant[0].productName);
  const [brandName, setBrandName] = useState(variant[0].brandName);
  const [modelName, setModelName] = useState(variant[0].modelName);
  const [sizes, setSizes] = useState(variant[0].sizes);
  const [colors, setColors] = useState(variant[0].colors);
  const [price, setPrice] = useState(variant[0].price);
  const [amount, setAmount] = useState(variant[0].amount);
  const [condition, setCondition] = useState(variant[0].condition);
  const [gender, setGender] = useState(variant[0].gender);
  const [shortDescription, setShortDescription] = useState(
    variant[0].shortDescription
  );

  // eslint-disable-next-line
  const [imageFile, setImageFile] = useState(variant[0].images[0].url);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = editVariantById(
      variantId,
      productName,
      brandName,
      modelName,
      sizes,
      colors,
      price,
      amount,
      condition,
      gender,
      shortDescription
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
      handleClose();
    }
  };

  return (
    <Modal
      title="Edit Variant"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
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

export default VariantUpdate;
