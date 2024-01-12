import { useState } from "react";
import { StorePageProvider } from "../../../context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";

function StorePageLayout({ children }) {
  const [stores, setStores] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [formValues, setFormValues] = useState({
    storeName: "",
    storeLocation: "",
    productAmount: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(!openModal);
    setRowToEdit(null);
    clearForm();
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
    setRowToDelete(null);
  };

  const clearForm = () => {
    formValues.storeName = "";
    formValues.storeLocation = "";
    formValues.productAmount = "";
  };

  const AddNewStore = async (storeName, storeLocation) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:4040/api/store",
        {
          storeName,
          storeLocation,
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
        clearForm();
        setOpenModal(false);
        fetch("http://localhost:4040/api/store", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
            Role: user.role,
          },
        })
          .then((response) => response.json())
          .then((data) => setStores(data));
        const updatedStores = [...stores, response.data];
        setStores(updatedStores);
        toast.success("Store created successfully");
        return true;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Failed to create store");
        return false;
      }
    }
  };

  const handleUpdateModalOpen = (id) => {
    setRowToEdit(id);
    const obj = stores.find((store) => store._id === id);
    formValues.storeName = obj.storeName;
    formValues.storeLocation = obj.storeLocation;
    // formValues.productAmount = obj.productAmount;
    handleModalOpen();
  };

  const updateStore = async (editedRow) => {
    const response = await axios.patch(
      `http://localhost:4040/api/store/${rowToEdit}`,
      editedRow,
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
      fetch("http://localhost:4040/api/store", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
          Role: user.role,
        },
      })
        .then((response) => response.json())
        .then((data) => setStores(data));
      handleModalClose();
      toast.info("Store updated successfully");
      return true;
    }
  };

  const handleDeleteDialogOpen = (id) => {
    setRowToDelete(id);
    setOpenDialog(true);
  };

  const deleteStore = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4040/api/store/${rowToDelete}`,
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
        const updatedStores = stores.filter((store) => {
          return store._id !== rowToDelete;
        });
        setStores(updatedStores);
        handleDialogClose();
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

  const valueToshare = {
    error,
    isLoading,
    openModal,
    handleModalClose,
    handleModalOpen,
    setFormValues,
    formValues,
    stores,
    setStores,
    openDialog,
    deleteStore,
    AddNewStore,
    handleDialogClose,
    handleUpdateModalOpen,
    handleDeleteDialogOpen,
    updateStore,
    setRowToEdit,
    rowToEdit,
    rowToDelete,
  };

  return (
    <StorePageProvider.Provider value={valueToshare}>
      {children}
    </StorePageProvider.Provider>
  );
}

export default StorePageLayout;
