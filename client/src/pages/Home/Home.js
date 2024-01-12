import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/UI/Header";
import { Box, Button, Grid, Typography } from "@mui/material";
import ProductCatagorysContext from "../../context/ProductCatagoryContext";
import VariantsContext from "../../context/VariantContext";
import Footer from "../../components/UI/footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [hoveredCatagory, setHoveredCatagory] = useState("");

  const { productCatagories, fetchProductCatagories } = useContext(
    ProductCatagorysContext
  );
  const { variants, fetchVariants } = useContext(VariantsContext);

  const navigate = useNavigate();

  // making varinat unique
  const uniqueVariants = Object.values(
    variants.reduce((uniqueMap, variant) => {
      if (!uniqueMap[variant.modelName]) {
        uniqueMap[variant.modelName] = variant;
      }
      return uniqueMap;
    }, {})
  );

  // use effect
  useEffect(() => {
    fetchProductCatagories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // use effect
  useEffect(() => {
    fetchVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedCatagory =
    hoveredCatagory === ""
      ? []
      : productCatagories.filter((productCatagory) => {
          return productCatagory._id === hoveredCatagory;
        });
  const handleMouseEnter = (id) => {
    setHoveredCatagory(id);
  };
  const handleMouseLeave = () => {
    setHoveredCatagory("");
  };
  const handleProductClick = (name) => {
    navigate("/:product/:detail");
    localStorage.setItem("selectedName", name);
  };

  const handleCatagoryClick = (product) => {
    localStorage.setItem("selectedProduct", product);
    navigate("/:product");
  };

  return (
    <Box sx={{ backgroundColor: "#EDF0FE", height: "100%" }}>
      <Header isLogin={true} />
      <Box
        className="flex w-full items-center justify-center gap-7 pt-4 mt-16"
        sx={{ display: "flex", backgroundColor: "#5e35b1" }}
      >
        <img
          src={require("../../assets/person.png")}
          alt=""
          className="w-1/6 object-cover"
        />
        <input
          type="text"
          placeholder="Search for what you want"
          className="h-12 pl-2 rounded-sm w-1/4 focus:outline-none text-gray-400"
        />
        <img
          src={require("../../assets/imsTopImage.png")}
          className="w-1/6 object-cover"
          alt=""
        />
      </Box>
      <Box className="flex justify-center gap-2 mt-2">
        <Box
          position="relative"
          className="flex w-1/6"
          sx={{ height: "800px" }}
          onMouseLeave={() => {
            handleMouseLeave();
          }}
        >
          <Box className="flex flex-col  bg-white w-full h-sceen">
            {productCatagories.map((productCatagory) => {
              return (
                <Box
                  className="flex justify-between  items-center hover:bg-slate-300 cursor-pointer mr-2"
                  key={productCatagory._id}
                  onMouseEnter={() => {
                    handleMouseEnter(productCatagory._id);
                  }}
                >
                  <Box className="flex items-center">
                    <img
                      key={productCatagory._id}
                      src={productCatagory.image.url}
                      alt=""
                      className=" rounded-full w-9 h-9 object-cover m-1"
                    />
                    <Box className="flex-col">
                      <Typography variant="p">
                        {productCatagory.productCatagoryName}
                      </Typography>
                      <Box>14</Box>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6">{`>`}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box
            position="absolute"
            sx={{
              display: hoveredCatagory === "" ? "none" : "flex",
              height: "800px",
            }}
            className="flex flex-col  bg-white w-full shadow-md inset-x-full border-l-4 border-indigo-500"
          >
            {hoveredCatagory !== "" &&
              selectedCatagory[0].productNames.map((product) => {
                return (
                  product.image && (
                    <Box
                      key={product._id}
                      className="flex justify-between  items-center hover:bg-slate-300 cursor-pointer mr-2"
                    >
                      <Box
                        className="flex items-center"
                        onClick={() => handleCatagoryClick(product.name)}
                      >
                        <img
                          src={product.image.url}
                          alt=""
                          className=" rounded-full w-9 h-9  object-contain m-1"
                        />
                        <Box className="flex-col">
                          <Typography variant="p">{product.name}</Typography>
                          <Box>14 items</Box>
                        </Box>
                      </Box>
                    </Box>
                  )
                );
              })}
          </Box>
        </Box>
        <Box className=" w-7/12">
          <Box className="w-full flex gap-1">
            <Box className="w-3/4 h-fit bg-white flex">
              <img
                src={require("../../assets/file.jpg")}
                alt=""
                className=" h-64 ml-auto"
              />
            </Box>

            <Box className="w-1/4 bg-white flex flex-col justify-center items-center h-64">
              <Typography>Got something</Typography>
              <Button variant="contained" className=" rounded-full w-12 h-12">
                +
              </Button>
              <Typography>Put your request?</Typography>
            </Box>
          </Box>
          <Box className="mt-1 h-fit w-full ">
            <Grid container spacing={1}>
              {uniqueVariants.map((variant) => {
                return (
                  <Grid key={variant._id} item xs={12} sm={6} md={4} lg={3}>
                    <Box
                      className=" w-full h-full flex flex-col bg-white"
                      onClick={() => handleProductClick(variant.modelName)}
                    >
                      <img
                        src={variant.images[0].url}
                        alt=""
                        className="h-64 w-full object-contain"
                      />
                      {variant.modelName}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
export default Home;
