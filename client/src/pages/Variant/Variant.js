import VariantCard from "./components/VariantCard";
import { useContext } from "react";
import VariantsContext from "../../context/VariantContext";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Typography } from "@mui/material";
import VariantCreate from "./components/VariantCreate";
import { useState } from "react";
import ProductCatagoryContext from "../../context/ProductCatagoryContext";
import VariantTable from "./components/VariantTable";
import { Cancel } from "@mui/icons-material";

const Variant = () => {
  // from local storage
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [productCatagory] = useState(user.productCatagory);
  // usestate

  const [open, setOpen] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [params, setParams] = useState("all");
  const [viewMode, setViewMode] = useState("card");

  // context
  const { productCatagories, fetchProductCatagories } = useContext(
    ProductCatagoryContext
  );

  useEffect(() => {
    fetchProductCatagories();
    // eslint-disable-next-line
  }, []);

  const filteredPCatagory = productCatagories.filter((pCatagory) => {
    return pCatagory._id === productCatagory;
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTypeClick = (param) => {
    setParams(param);
  };

  const { variants, fetchVariants } = useContext(VariantsContext);
  const variantByStores =
    params === "all"
      ? variants.filter((variant) => {
          return (
            (variant.store === user.store) &
            (variant._id !== selectedId) &
            (variant.productCatagoryId === productCatagory)
          );
        })
      : variants.filter((variant) => {
          return (
            (variant.store === user.store) &
            (variant._id !== selectedId) &
            (variant.productName === params) &
            (variant.productCatagoryId === productCatagory)
          );
        });

  const renderedVariants = variantByStores.map((variantByStore) => {
    return (
      <Grid key={variantByStore._id} item xs={12} sm={6} md={4} lg={3}>
        <VariantCard
          variant={variantByStore}
          setIsDetail={setIsDetail}
          setSelectedId={setSelectedId}
        />
      </Grid>
    );
  });
  useEffect(() => {
    fetchVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const selectedVariant = variants.filter((variant) => {
    return variant._id === selectedId;
  });

  // some style
  const styledTopBar = {
    border: "1px solid #c0c5cc",
    m: 1,
    p: 1,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
  };

  return (
    <Box>
      <Box sx={{ m: 1 }}>
        <Typography>Products</Typography>
      </Box>
      <Box sx={styledTopBar}>
        {user.store && (
          <Button onClick={handleOpen} variant="contained">
            <AddIcon />
            New
          </Button>
        )}

        <input
          placeholder="Search"
          type="text"
          className="mx-2 p-2 rounded-2xl focus:outline-none border-2"
        />

        {/* Mode Changer */}
        <Button
          onClick={() => {
            if (viewMode === "card") {
              setViewMode("table");
            } else {
              setViewMode("card");
            }
          }}
          variant="contained"
          sx={{ marginRight: 2 }}
        >
          Change Display Mode
        </Button>
        <Button
          variant="contained"
          sx={{ display: viewMode === "card" ? "block" : "none" }}
          onClick={() => {
            handleTypeClick("all");
          }}
        >
          All
        </Button>
        {filteredPCatagory[0] &&
          filteredPCatagory[0].productNames.map((productName) => {
            return (
              <Button
                key={productName._id}
                variant="contained"
                sx={{
                  ml: 1,
                  display: viewMode === "card" ? "block" : "none",
                }}
                onClick={() => {
                  handleTypeClick(productName.name);
                }}
              >
                {productName.name}
              </Button>
            );
          })}
      </Box>
      <VariantCreate open={open} handleClose={handleClose} />
      <Box
        position="fixed"
        sx={{
          display: isDetail ? "flex" : "none",
          zIndex: "999",
        }}
        className="dialog-box bg-white shadow-xl  items-center  w-3/5 mx-56 mt-12 p-3"
      >
        <Box sx={{ m: 1, width: "100px", height: "150px" }}>
          {isDetail &&
            selectedVariant[0].images &&
            selectedVariant[0].images.map((image, index) => (
              <img
                key={`${selectedVariant}${index}`}
                src={image.url}
                alt=""
                style={{ padding: 2, objectFit: "contain" }}
                width="100%"
                height="100%"
              />
            ))}
        </Box>
        <Box className="m-1 w-1/2 border-slate-500">
          {isDetail && (
            <img
              src={selectedVariant[0].images[0].url}
              width="500px"
              style={{
                height: "450px",
              }}
              alt=""
              className=" object-contain"
            />
          )}
        </Box>
        {isDetail && (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ m: 3, display: "flex" }}>
              <Box className="w-3/5">
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
              <Box sx={{}}>
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
            </Box>
          </Box>
        )}
        {isDetail && (
          <IconButton
            variant="contained"
            onClick={() => {
              setIsDetail(false);
              setSelectedId("");
            }}
            className="mt-0"
          >
            <Cancel />
          </IconButton>
        )}
      </Box>

      {viewMode === "card" ? (
        <Grid container spacing={1}>
          {renderedVariants}
        </Grid>
      ) : (
        <VariantTable
          variants={variantByStores}
          setIsDetail={setIsDetail}
          setSelectedId={setSelectedId}
        />
      )}
    </Box>
  );
};

export default Variant;
