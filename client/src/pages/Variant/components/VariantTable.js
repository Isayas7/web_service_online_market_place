import { DataGrid } from "@mui/x-data-grid";
import { CardMedia, IconButton } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Delete, Edit } from "@mui/icons-material";
// import VariantsContext from "../../../context/VariantContext";
import VariantUpdate from "./VariantUpdate";
import VariantDelete from "./VariantDelete";

function VariantTable({ variants, setIsDetail, setSelectedId }) {
  // component states
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [variantId, setVariantId] = useState("");

  // toggler funcions
  // funtions open delete modal
  const handleDeleteOpen = () => {
    setdDeleteOpen(true);
  };

  // funtion close delete modal
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
    setVariantId("");
  };

  // delete handler
  const handleDeleteVariant = (id) => {
    handleDeleteOpen();
    setVariantId(id);
  };

  // funtions open edit modal
  const handleEditOpen = () => {
    setdEditOpen(true);
  };

  // funtion close Edit modal
  const handleEditClose = () => {
    setdEditOpen(false);
    setVariantId("");
  };

  // edit handler
  const handleEditVariant = (id) => {
    handleEditOpen();
    setVariantId(id);
  };

  const handleDetailClick = (id) => {
    setIsDetail(true);
    setSelectedId(id);
  };

  //   toggle delete modal and edit modal
  let content = "";
  if (deleteOpen) {
    content = (
      <VariantDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        variantId={variantId}
      />
    );
  }
  if (editOpen) {
    content = (
      <VariantUpdate
        open={editOpen}
        handleClose={handleEditClose}
        variantId={variantId}
      />
    );
  }

  const columns = [
    {
      field: "images",
      headerName: "Image",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <>
          <CardMedia
            component="img"
            image={params.row.images[0].url}
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
      field: "productName",
      headerName: "Product Name",
      width: 150,
    },
    { field: "brandName", headerName: "Brand Name", width: 150 },
    { field: "modelName", headerName: "Model Name", width: 150 },
    { field: "sizes", headerName: "Size", width: 150 },
    { field: "colors", headerName: "Color", width: 150 },
    { field: "price", headerName: "Unit Price", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
    },
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
            onClick={() => handleEditVariant(params.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => handleDeleteVariant(params.id)}
          >
            <Delete />
          </IconButton>

          <IconButton
            aria-label="view"
            color="primary"
            onClick={() => {
              handleDetailClick(params.id);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const tableRows = Array.isArray(variants) ? variants : [variants];
  return (
    <>
      <DataGrid
        sx={{ width: "fit-content" }}
        rows={tableRows}
        key={tableRows._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        getRowId={(row) => row._id || variants.indexOf(row)}
        pageSizeOptions={[5, 10]}
      />
      {content}
    </>
  );
}

export default VariantTable;
