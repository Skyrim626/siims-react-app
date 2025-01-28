import React from "react";
import Text from "../../../components/common/Text";
import { Pagination } from "@mui/material";
import { Search } from "lucide-react";
import { Input } from "@headlessui/react";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[300],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },

    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  "& .super-app-theme--header": {
    backgroundColor: "hsl(215, 28%, 17%)",
    color: "white",
    fontWeight: 800,
    "&:focus": {
      outline: "none", // Remove focus outline on header
    },
  },
}));

const CustomDataGrid = React.memo(
  ({
    paginationModel,

    totalCount,
    handlePaginationModelChange,
    rows,
    columns,
    loading,
    onSelectionModelChange,
    getRowId,
    pageSizeOptions = [5, 10, 15, 20, 25],
  }) => {
    return (
      <div>
        {/* DataGrid component */}
        <div style={{ height: "100%", width: "100%" }}>
          <StripedDataGrid
            disableRowSelectionOnClick={true}
            rows={rows}
            columns={columns}
            paginationMode="server" // Enable server-side pagination
            loading={loading}
            rowCount={totalCount}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={pageSizeOptions}
            checkboxSelection={false}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            slots={{ toolbar: GridToolbar }}
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: "hsl(215, 28%, 17%)", // Custom dark blue shade for bg-900
                color: "white", // White text color for the header
                fontWeight: 800, // Make header text bold
              },
              "& .MuiDataGrid-columnHeaderCheckbox": {
                backgroundColor: "hsl(215, 28%, 17%)", // Set checkbox cell background color to bg-blue-900 (tailwind class)
                color: "white", // White checkbox color

                ".MuiSvgIcon-root": {
                  color: "white",
                },
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2", // Set your desired background color
                color: "#fff", // Optional: Set the text color
              },
              // Custom styles for sorting icon and sorting menu
              "& .MuiDataGrid-sortIcon": {
                color: "white", // Change sort icon color to white
              },
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                color: "white", // Title container color (e.g., for sorting menu)
              },

              ".MuiDataGrid-iconButtonContainer": {
                visibility: "visible", // Ensure icon container is visible
              },

              ".MuiDataGrid-sortIcon": {
                opacity: "inherit !important", // Ensure the sort icon remains visible
              },

              ".MuiDataGrid-menu .MuiDataGrid-menuList": {
                visibility: "visible", // Ensure icon container is visible
                opacity: "inherit !important", // Ensure the sort icon remains visible
              },

              ".MuiDataGrid-menuIconButton": {
                opacity: "inherit !important", // Ensure the sort icon remains visible
                color: "white",
                visibility: "visible", // Ensure icon container is visible
              },
            }}
            onRowSelectionModelChange={onSelectionModelChange}
            getRowId={getRowId}
          />
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if the `url` prop changes
    // console.log("Prev: ", prevProps);
    // console.log("Next: ", nextProps);

    return (
      prevProps.url === nextProps.url && // Compare `url`
      prevProps.rows === nextProps.rows &&
      prevProps.setRows === nextProps.setRows &&
      // Add other props to compare as needed
      JSON.stringify(prevProps) === JSON.stringify(nextProps)
    );
  }
);

export default CustomDataGrid;
