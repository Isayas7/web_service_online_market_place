import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LineChart from "../../components/UI/LineChart";
import BarChart from "../../components/UI/BarChart";
import StatBox from "../../components/UI/StatBox";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useContext, useEffect } from "react";
import VariantsContext from "../../context/VariantContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { variants, fetchVariants } = useContext(VariantsContext);

  const user = JSON.parse(localStorage.getItem("user"));

  // varinats/products
  useEffect(() => {
    fetchVariants();
    // eslint-disable-next-line
  }, []);

  const filterProduct = variants.filter((variant) => {
    return variant.store === user.store;
  });

  const pro = user.role === "sm" ? filterProduct : variants;

  return (
    <Box m="40px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontWeight="800"
        variant="h1"
      >
        Dashboard
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundcolor=" #fff"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border-radius=" 8px"
        >
          <StatBox
            title={user.role === "sm" ? filterProduct.length : variants.length}
            subtitle="All Products"
            progress="0.75"
            increase="+14%"
            icon={
              <AddShoppingCartIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="11"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="10"
            subtitle="Request"
            progress="0.30"
            icon={
              <ReportProblemIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                100000 ETB
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Product Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          className="w-full"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`2px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Products
            </Typography>
          </Box>
          {pro.map((variant) => (
            <Box
              key={variant._id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box className="w-1/3">
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {variant.modelName}
                </Typography>
              </Box>
              <Box className="w-1/4 flex justify-start">
                <Box>
                  {formatDistanceToNow(new Date(variant.createdAt), {
                    addSuffiX: true,
                  })}
                </Box>
              </Box>
              <Box className="w-1/4 flex justify-end">
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                  className="w-32 flex justify-center"
                >
                  {variant.price}ETB
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
