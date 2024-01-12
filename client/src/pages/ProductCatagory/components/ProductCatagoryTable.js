import { DataGrid } from "@mui/x-data-grid";
import { CardMedia, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductCatagorysContext from "../../../context/ProductCatagoryContext";
import ProductCatagoryUpdate from "./ProductCatagoryUpdate";
import ProductCatagoryDelete from "./ProductCatagoryDelete";

function ProductCatagoryTable() {
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [productCatagoryId, setProductCatagoryId] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const path = "http://localhost:3000/productCatagory";
  const currentUrl = window.location.href;

  const { productCatagories } = useContext(ProductCatagorysContext);
  const navigate = useNavigate();

  // toggler funcions
  // funtions open delete modal
  const handleDeleteOpen = () => {
    setdDeleteOpen(true);
  };

  // funtion close delete modal
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
    setProductCatagoryId("");
  };

  // delete handler
  const handleDeleteProductCatagory = (id) => {
    handleDeleteOpen();
    setProductCatagoryId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setProductCatagoryId("");
  };

  // edit handler
  const handleEditProductCatagory = (id) => {
    handleEditOpen();
    setProductCatagoryId(id);
  };

  // toggle delete modal and edit modal
  let content = "";
  if (deleteOpen) {
    content = (
      <ProductCatagoryDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        productCatagoryId={productCatagoryId}
      />
    );
  }
  if (editOpen) {
    content = (
      <ProductCatagoryUpdate
        open={editOpen}
        handleClose={handleEditClose}
        productCatagoryId={productCatagoryId}
      />
    );
  }

  const columns = [
    {
      field: "image",
      headerName: "Images",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <>
          <CardMedia
            component="img"
            image={params.row.image.url}
            alt="Paella dish"
            className="h-64 w-64"
            sx={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              objectFit: "cover",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </>
      ),
    },
    {
      field: "productCatagoryName",
      headerName: "Catagory",
      width: 150,
    },
    { field: "product", headerName: "Product Names", width: 200 },
    {
      field: "",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => handleEditProductCatagory(params.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => handleDeleteProductCatagory(params.id)}
          >
            <Delete />
          </IconButton>

          {(((user.role === "admin" || user.role === "super") &&
            currentUrl !== path) ||
            user.role === "sm") && (
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() =>
                handleViewOpen(params.id, params.row.productCatagoryName)
              }
            >
              <VisibilityIcon />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  const handleViewOpen = (id, productCatagoryName) => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.productCatagory = id;
    localStorage.setItem("user", JSON.stringify(user));
    navigate(`:${productCatagoryName}`);
  };

  const tableRows = Array.isArray(productCatagories)
    ? productCatagories
    : [productCatagories];
  return (
    <>
      <DataGrid
        sx={{ width: "fit-content" }}
        rows={tableRows}
        key={productCatagories._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        getRowId={(row) => row._id || productCatagories.indexOf(row)}
        pageSizeOptions={[5, 10]}
      />
      {content}
    </>
  );
}

export default ProductCatagoryTable;
