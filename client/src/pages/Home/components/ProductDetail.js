import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../../components/UI/Header";
import Footer from "../../../components/UI/footer";
import VariantsContext from "../../../context/VariantContext";
import Spinner from "../../../components/UI/Spinner";

const ProductDetail = () => {
  // useState
  const [selected, setSelected] = useState(
    localStorage.getItem("selectedName")
  );
  const [imgIndex, setImgIndex] = useState("0");

  const { variants, fetchVariants } = useContext(VariantsContext);

  useEffect(() => {
    fetchVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // making varinat unique
  const uniqueVariants = Object.values(
    variants.reduce((uniqueMap, variant) => {
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
    setSelected(name);
    setImgIndex(0);
    localStorage.setItem("selectedName", name);
  };

  const selectedVariant = variants.filter((variant) => {
    return variant.modelName === selected;
  });

  const handleImageClick = (index) => {
    setImgIndex(index);
  };

  return (
    <Box className="flex flex-col justify-between">
      <Header isLogin={true} />
      {variants.length === 0 ? (
        <Box className=" mt-64 flex justify-center items-start ">
          <Spinner className="" />
        </Box>
      ) : (
        <Box className="min-h-full">
          <Box className="dialog-box bg-white flex shadow-xl  items-center mx-64  p-3 h-96 mt-32">
            <Box sx={{ m: 1, width: "100px", height: "150px" }}>
              {selectedVariant[0].images &&
                selectedVariant[0].images.map((image, index) => (
                  <img
                    key={`${selectedVariant[0].modelName}${index}`}
                    src={image.url}
                    alt=""
                    style={{ padding: 2, objectFit: "contain" }}
                    className=" border-black-600 border-2 mb-1"
                    onClick={() => handleImageClick(index)}
                  />
                ))}
            </Box>
            <Box className="m-1 w-1/2">
              {
                <img
                  src={selectedVariant[0].images[imgIndex].url}
                  width="500px"
                  alt=""
                  className=" object-contain h-80 border-black-600 border-2"
                />
              }
              <Typography
                variant="p"
                className="text-lg text-black-500 font-bold "
              >
                {selectedVariant[0].modelName}
              </Typography>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Box sx={{ m: 3, display: "flex" }}>
                <Box className="w-1/3">
                  <Box className="m-2">
                    <Typography
                      variant="p"
                      className="text-lg text-violet-500 font-bold mx-2"
                    >
                      Name:
                    </Typography>
                    {selectedVariant[0].productName}
                  </Box>

                  <Box className="m-2">
                    <Typography
                      variant="p"
                      className="text-lg text-violet-500 font-bold mx-2"
                    >
                      Model:
                    </Typography>
                    {selectedVariant[0].modelName}
                  </Box>

                  <Box className="m-2">
                    <Typography
                      variant="p"
                      className="text-lg text-violet-500 font-bold mx-2"
                    >
                      Size:
                    </Typography>
                    {selectedVariant[0].sizes.join(", ")}
                  </Box>
                  <Box className="m-2">
                    <Typography
                      variant="p"
                      className="text-lg text-violet-500 font-bold mx-2"
                    >
                      Colors:
                    </Typography>
                    {selectedVariant[0].colors.join(", ")}
                  </Box>

                  <Box className="m-2">
                    <Typography
                      variant="p"
                      className="text-lg text-violet-500 font-bold mx-2"
                    >
                      <Typography
                        variant="p"
                        className="text-lg text-violet-500 font-bold mx-2"
                      >
                        Description:
                      </Typography>
                    </Typography>
                    {selectedVariant[0].shortDescription}
                  </Box>
                </Box>
                <Box className="w-1/3">
                  <Box className="m-2">
                    <Typography
                      variant="p"
                      className="text-lg text-violet-500 font-bold mx-2"
                    >
                      Brand:
                    </Typography>
                    {selectedVariant[0].brandName}
                  </Box>
                  <Box className="m-2">
                    <Typography
                      variant="p"
                      className="text-lg text-violet-500 font-bold mx-2"
                    >
                      Condition:
                    </Typography>
                    {selectedVariant[0].condition}
                  </Box>

                  <Box className="m-2">
                    <Typography
                      variant="p"
                      className="text-lg text-violet-500 font-bold mx-2"
                    >
                      Price:
                    </Typography>
                    {selectedVariant[0].price}ETB
                  </Box>
                  <Box className="m-2">
                    <Typography
                      variant="p"
                      className="text-lg text-violet-500 font-bold mx-2"
                    >
                      Amount:
                    </Typography>
                    {selectedVariant[0].amount}
                  </Box>
                  <Box className="m-2">
                    <Typography
                      variant="p"
                      className="text-lg text-violet-500 font-bold mx-2"
                    >
                      Gender:
                    </Typography>
                    {selectedVariant[0].gender}
                  </Box>
                </Box>
                <Box>
                  You can get at
                  <Box className="flex flex-col">
                    {selectedVariant.map((variant) => (
                      <Typography
                        key={variant._id}
                        variant="p"
                        className="text-lg text-violet-500 font-bold mx-2"
                      >
                        {variant.storeName}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="mx-64 mt-10">
            <Grid container spacing={1}>
              {uniqueVariants.map((variant) => {
                return (
                  <Grid key={variant._id} item xs={12} sm={6} md={4} lg={3}>
                    <Box
                      className=" w-full h-full flex flex-col justify-between bg-white border-1 border-violet-600"
                      onClick={() => {
                        handleProductClick(variant.modelName);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <img
                        src={variant.images[0].url}
                        alt=""
                        className="h-64 w-full object-contain "
                      />
                      <Box className="flex justify-between mx-4">
                        <Box>
                          <Typography
                            variant="p"
                            className="text-md text-black-500 font-bold "
                          >
                            Price: {variant.modelName}
                          </Typography>
                        </Box>
                        <Typography
                          variant="p"
                          className="text-lg text-green-500 font-bold "
                        >
                          Price: {variant.price}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default ProductDetail;
