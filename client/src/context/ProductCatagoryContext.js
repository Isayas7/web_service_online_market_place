import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductCatagorysContext = createContext();

const ProductCatagoryProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [productCatagories, setProductCatagories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const fetchProductCatagories = async () => {
    const response = await axios.get(
      "http://localhost:4040/api/productCatagory"
    );

    setProductCatagories(response.data);
  };

  const editProductCatagoryById = async (
    id,
    newproductCatagoryName,
    newProductNames
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.patch(
        `http://localhost:4040/api/productCatagory/${id}`,
        {
          productCatagoryName: newproductCatagoryName,
          productNames: newProductNames,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
            Role: user.role,
          },
        }
      );
      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchProductCatagories();
        toast.info("Product Catagory updated successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to update product catagory");
        return false;
      }
    }
  };

  const deleteProductCatagoryById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4040/api/productCatagory/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
            Role: user.role,
          },
        }
      );

      if (response.status !== 200) {
        toast.error(response.data.error);
      } else {
        const updateProductCatagories = productCatagories.filter(
          (productCatagory) => productCatagory._id !== id
        );
        setProductCatagories(updateProductCatagories);
        toast.warning("Product Catagory deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete product catagory");
      }
    }
  };

  const createProductCatagory = async (
    productCatagoryName,
    image,
    productNames
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:4040/api/productCatagory",
        {
          productCatagoryName,
          image,
          productNames,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
            Role: user.role,
          },
        }
      );

      if (response.status !== 200) {
        setError(response.data.error);
        setIsLoading(false);
        return false;
      } else {
        setError(null);
        setIsLoading(false);
        fetchProductCatagories();
        toast.success("Product Catagory created successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create product catagory");
        return false;
      }
    }
  };

  // useEffect(() => {
  //   const pollingInterval = 500; // Polling interval in milliseconds (e.g., every 5 seconds)
  //   const intervalId = setInterval(fetchProductCatagories, pollingInterval);
  //   return () => clearInterval(intervalId);
  // }, []);

  const valueToShare = {
    error,
    isLoading,
    productCatagories,
    deleteProductCatagoryById,
    editProductCatagoryById,
    createProductCatagory,
    fetchProductCatagories,
  };

  return (
    <ProductCatagorysContext.Provider value={valueToShare}>
      {children}
    </ProductCatagorysContext.Provider>
  );
};

export { ProductCatagoryProvider };

export default ProductCatagorysContext;
