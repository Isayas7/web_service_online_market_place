import ProductCatagoryCard from "./components/ProductCatagoryCard";
import { useContext } from "react";
import ProductCatagorysContext from "../../context/ProductCatagoryContext";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import ProductCatagoryCreate from "./components/ProductCatagoryCreate";
import { useState } from "react";
import ProductCatagoryTable from "./components/ProductCatagoryTable";

const ProductCatagory = () => {
  const [open, setOpen] = useState(false);
  const path = "http://localhost:3000/productCatagory";
  const user = JSON.parse(localStorage.getItem("user"));
  const [viewMode, setViewMode] = useState("card");

  const currentUrl = window.location.href;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { productCatagories, fetchProductCatagories } = useContext(
    ProductCatagorysContext
  );

  const renderedProductCatagorys = productCatagories.map((productCatagory) => {
    return (
      <Grid key={productCatagory._id} item xs={12} sm={6} md={4} lg={3}>
        <ProductCatagoryCard productCatagory={productCatagory} />
      </Grid>
    );
  });

  useEffect(() => {
    fetchProductCatagories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ m: 1 }}>
        <Typography>ProductCatagory</Typography>
      </Box>
      <Box sx={{ display: "flex" }} className='my-2'>
        {(user.role === "super" || user.role === "admin") &&
          currentUrl === path && (
            <Button onClick={handleOpen} variant="contained">
              <AddIcon />
              New
            </Button>
          )}
        <Button
          onClick={() => {
            if (viewMode === "card") {
             
              setViewMode("table");
            } else {
             
              setViewMode("card");
            }
          }}
          variant="contained"
          sx={{ marginLeft: 2 }}
        >
          Change Display Mode
        </Button>
        <ProductCatagoryCreate open={open} handleClose={handleClose} />
      </Box>
      {viewMode === "card" ? (
        <Grid container spacing={1}>
          {renderedProductCatagorys}
        </Grid>
      ) : (
        <ProductCatagoryTable />
      )}
    </>
  );
};

export default ProductCatagory;
