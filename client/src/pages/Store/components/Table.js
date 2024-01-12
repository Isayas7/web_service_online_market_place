import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { StorePageProvider } from "../../../context/CreateContext";
import { useContext } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Table() {
  const { stores, handleUpdateModalOpen, handleDeleteDialogOpen } =
    useContext(StorePageProvider);
  const navigate = useNavigate();

  const columns = [
    { field: "storeName", headerName: "Store name", width: 150 },
    { field: "storeLocation", headerName: "Location", width: 150 },
    { field: "product", headerName: "Amount", width: 100 },
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
            onClick={() => handleUpdateModalOpen(params.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => handleDeleteDialogOpen(params.id)}
          >
            <Delete />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => handleViewOpen(params.id)}
          >
            <VisibilityIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const handleViewOpen = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.store = id;
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/store/:productCatagory");
  };

  const tableRows = Array.isArray(stores) ? stores : [stores];
  return (
    <DataGrid
      sx={{ width: "fit-content" }}
      rows={tableRows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      getRowId={(row) => row._id || stores.indexOf(row)}
      pageSizeOptions={[5, 10]}
    />
  );
}

export default Table;
