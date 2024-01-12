import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VariantsContext = createContext();

const VariantProvider = ({ children }) => {
  const [variants, setVariants] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const fetchVariants = async () => {
    try {
      const response = await axios.get("http://localhost:4040/api/variant");
      setVariants(response.data);
    } catch (error) {
      console.error("Error fetching transfers:", error);
    }
  };

  const editVariantById = async (
    id,
    newProductName,
    newBrandName,
    newModelName,
    newSizes,
    newColors,
    newPrice,
    newAmount,
    newCondition,
    newGender,
    newShortDescription
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `http://localhost:4040/api/variant/${id}`,
        {
          productName: newProductName,
          brandName: newBrandName,
          modelName: newModelName,
          sizes: newSizes,
          colors: newColors,
          price: newPrice,
          amount: newAmount,
          condition: newCondition,
          gender: newGender,
          shortDescription: newShortDescription,
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
      } else {
        const updatedVariants = variants.map((variant) => {
          if (variant.id === id) {
            return { ...variant, ...response.data };
          }
          return variant;
        });
        fetchVariants();
        setVariants(updatedVariants);
        toast.info("Product updated successfully");
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
  const deleteVariantById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4040/api/variant/${id}`,
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
        fetchVariants();
        toast.warning("Product deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  // create variant
  const createVariant = async (
    productName,
    brandName,
    modelName,
    images,
    sizes,
    colors,
    price,
    amount,
    condition,
    gender,
    shortDescription,
    store,
    productCatagory
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:4040/api/variant",
        {
          productName,
          brandName,
          modelName,
          images,
          sizes,
          colors,
          price,
          amount,
          condition,
          gender,
          shortDescription,
          store,
          productCatagory,
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
        fetchVariants();
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

  useEffect(() => {
    const pollingInterval = 500; // Polling interval in milliseconds (e.g., every 5 seconds)
    const intervalId = setInterval(fetchVariants, pollingInterval);
    return () => clearInterval(intervalId);
  }, []);

  const valueToShare = {
    error,
    isLoading,
    variants,
    deleteVariantById,
    editVariantById,
    createVariant,
    fetchVariants,
  };

  return (
    <VariantsContext.Provider value={valueToShare}>
      {children}
    </VariantsContext.Provider>
  );
};

export { VariantProvider };

export default VariantsContext;
