import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Header from "../../../components/UI/Header";
import Footer from "../../../components/UI/footer";
import VariantsContext from "../../../context/VariantContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner";

const Product = () => {
  const { variants, fetchVariants } = useContext(VariantsContext);
  const navigate = useNavigate();

  const filtered = variants.filter((variant) => {
    return variant.productName === localStorage.getItem("selectedProduct");
  });

  // making varinat unique
  const uniqueVariants = Object.values(
    filtered.reduce((uniqueMap, variant) => {
      if (!uniqueMap[variant.modelName]) {
        uniqueMap[variant.modelName] = variant;
      }
      return uniqueMap;
    }, {})
  );

  useEffect(() => {
    fetchVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProductClick = (name) => {
    navigate(":detail");
    localStorage.setItem("selectedName", name);
  };
  return (
    <Box>
      <Header isLogin={true} />
      {variants.length === 0 ? (
        <Box className=" mt-64 flex justify-center items-start ">
          <Spinner className="" />
        </Box>
      ) : (
        <Box>
          <Box>
            <Box className="mt-32 mx-64">
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
      )}
      <Footer />
    </Box>
  );
};

export default Product;
