import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { StoreManagerPageProvider } from "../../../context/CreateContext";
import { useContext } from "react";

function Table(role) {
  const { handleUpdateModalOpen, handleDeleteDialogOpen, storeManagers } =
    useContext(StoreManagerPageProvider);
    const columns = [
      { field: "firstName", headerName: "First name", width: 130 },
      { field: "lastName", headerName: "Last name", width: 130 },
      { field: "gender", headerName: "Gender", width: 70 },
      { field: "email", headerName: "Email", width: 190 },
      { field: "phoneNumber", headerName: "Phone Number", width: 130 },
      { field: "address", headerName: "Address", width: 130 },
      ...(role.role === "sm"
        ? [
            {
              field: "storeName",
              headerName: "Store",
              width: 190,
              key: "storeNameColumn",
            },
          ]
        : []),
      {
        field: "",
        headerName: "Actions",
        width: 150,
        sortable: false,
        renderCell: (params) => (
          <>
            <IconButton
              color="gray"
              aria-label="edit"
              onClick={() => handleUpdateModalOpen(params.id)}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleDeleteDialogOpen(params.id)}
            >
              <Delete />
            </IconButton>
          </>
        ),
        key: "actionsColumn",
      },
    ];
    

  // convert academicCurriculum object to array if necessary

  const SManagers = storeManagers.filter((storeManager) => {
    return storeManager.role === role.role;
  });

  const tableRows = Array.isArray(SManagers) ? SManagers : [SManagers];
  return (
    <DataGrid
      sx={{ width: "fit-content" }}
      rows={tableRows}
      columns={columns}
      key={SManagers._id}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      getRowId={(row) => row._id || SManagers.indexOf(row)}
      pageSizeOptions={[5, 10]}
    />
  );
}

export default Table;
