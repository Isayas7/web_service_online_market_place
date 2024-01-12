import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Store from "./pages/Store/StorePage";
import StoreManagerPageLayout from "./pages//User/components/StoreManagerPageLayout";
import StorePageLayout from "./pages//Store/components/StorePageLayout";
import UserManagment from "./pages/User/StoreManagerPage";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import ProductCatagory from "./pages/ProductCatagory/ProductCatagory";
import { ProductCatagoryProvider } from "./context/ProductCatagoryContext";
import { VariantProvider } from "./context/VariantContext";
import Variant from "./pages/Variant/Variant";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Box, IconButton } from "@mui/material";
import Product from "./pages/Home/components/Product";
import ProductDetail from "./pages/Home/components/ProductDetail";

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRouteAdmin = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (user.role === "super" || user.role === "admin") {
      return children;
    }
    return <Navigate to="/login" />;
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Box>
      {
        <IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            background: "#4CCEAC",
            color: "#fff",
            width: "50px",
            "&:hover": {
              bottom: "28px",
              marginBottom: "28px",
              background: "#4CCEAC",
              transition: "ease-in-out 0.7s",
            },
          }}
        >
          ↑
        </IconButton>
      }
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProductCatagoryProvider>
                  <VariantProvider>
                    <Home />
                  </VariantProvider>
                </ProductCatagoryProvider>
              }
            />
            <Route path=":product">
              <Route
                index
                element={
                  <VariantProvider>
                    <Product />
                  </VariantProvider>
                }
              />
              <Route
                path=":detail"
                element={
                  <VariantProvider>
                    <ProductDetail />
                  </VariantProvider>
                }
              />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StorePageLayout>
                  <Layout />
                </StorePageLayout>
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={
                <VariantProvider>
                  <Dashboard />
                </VariantProvider>
              }
            />

            <Route path="productCatagory">
              <Route
                index
                element={
                  <ProductCatagoryProvider>
                    <ProductCatagory />
                  </ProductCatagoryProvider>
                }
              />
              <Route
                path=":variant"
                element={
                  <ProductCatagoryProvider>
                    <VariantProvider>
                      <Variant />
                    </VariantProvider>
                  </ProductCatagoryProvider>
                }
              />
            </Route>
            <Route
              path="user"
              element={
                <ProtectedRouteAdmin>
                  <StoreManagerPageLayout>
                    <StorePageLayout>
                      <UserManagment />
                    </StorePageLayout>
                  </StoreManagerPageLayout>
                </ProtectedRouteAdmin>
              }
            />
            <Route path="store">
              <Route
                index
                element={
                  <StorePageLayout>
                    <ProtectedRouteAdmin>
                      <Store />
                    </ProtectedRouteAdmin>
                  </StorePageLayout>
                }
              />
              <Route path=":productCatagory">
                <Route
                  index
                  element={
                    <ProductCatagoryProvider>
                      <ProductCatagory />
                    </ProductCatagoryProvider>
                  }
                />
                <Route
                  path=":variant"
                  element={
                    <ProductCatagoryProvider>
                      <VariantProvider>
                        <Variant />
                      </VariantProvider>
                    </ProductCatagoryProvider>
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        toastStyle={{ width: "450px", right: "120px" }}
      />
    </Box>
  );
}

export default App;
