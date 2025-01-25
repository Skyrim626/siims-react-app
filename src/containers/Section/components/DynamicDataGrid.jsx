import React, { useState, useEffect, useCallback } from "react";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { Input } from "@headlessui/react";
import { Search } from "lucide-react";
import { Pagination, TablePagination } from "@mui/material";
import { getRequest } from "../../../api/apiHelpers";
import useDebouncedSearch from "../../../hooks/useDebouncedSearch";
import Text from "../../../components/common/Text";

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

const DynamicDataGrid = React.memo(
  ({
    rows,
    setRows,
    columns,
    url,
    pageSizeOptions = [5, 10, 15],
    // Search Props
    searchPlaceholder = "Search Something",
    allowSearch = true,

    // Checkbox Selection
    checkboxSelection = true,

    // Selection Change
    onSelectionModelChange,

    // Row ID Definition
    getRowId,

    // Requested by
    requestedBy = "",
    selectedSection,
  }) => {
    const [totalCount, setTotalCount] = useState(0); // Total count of records
    const [loading, setLoading] = useState(true); // Loading state
    const [searchInput, setSearchInput] = useState(""); // Current value in the input field
    const [searchTerm, setSearchTerm] = useState(""); // Search term
    const [paginationModel, setPaginationModel] = useState({
      page: 0, // Current page
      pageSize: 5, // Items per page
    });

    // Use debounced search term to avoid sending request on every keystroke
    const debouncedSearchTerm = useDebouncedSearch(searchInput, 500); // 500ms debounce delay

    useEffect(() => {
      // Fetch data whenever page, pageSize, or searchTerm changes
      const fetchData = async () => {
        setLoading(true);

        // console.log(`/api/v1${url}`);

        const response = await getRequest({
          url: `/api/v1${url}`,
          params: {
            page: paginationModel.page + 1, // Correct API expects page to start at 1
            perPage: paginationModel.pageSize, // Items per page
            search: searchTerm, // Search term
            requestedBy: requestedBy,
            section: selectedSection.id,
          },
        });

        // Assuming the response structure contains 'data' and 'meta'
        if (response && response.data) {
          // console.log(response.data);

          setRows(response.data);
          setTotalCount(response.meta.total); // Update the total count for pagination
        }
        setLoading(false);
      };

      fetchData();
    }, [paginationModel, searchTerm, url, selectedSection]); // Trigger on changes to paginationModel or searchTerm

    // Handle pagination model change
    const handlePaginationModelChange = (newPaginationModel) => {
      setPaginationModel(newPaginationModel); // Update pagination model (page and pageSize)
    };

    // Handle input field change
    const handleSearchInputChange = useCallback((event) => {
      const value = event.target.value;
      setSearchInput(value);

      if (value === "") {
        // Reload data if input is cleared
        setSearchTerm("");
        setPaginationModel({ ...paginationModel, page: 0 });
      }
    });

    // Trigger search only on Enter key press
    const handleSearchKeyDown = (event) => {
      if (event.key === "Enter") {
        setSearchTerm(debouncedSearchTerm); // Use the input value for fetching data
        setPaginationModel({ ...paginationModel, page: 0 }); // Reset to first page
      }
    };

    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          {/* Pagination */}
          <div className="flex items-center space-x-3">
            <Text className="font-semibold">Page</Text>

            <Pagination
              count={Math.ceil(totalCount / paginationModel.pageSize)} // Calculate number of pages
              page={paginationModel.page + 1} // Pagination uses 1-based index
              onChange={(event, page) =>
                handlePaginationModelChange({
                  ...paginationModel,
                  page: page - 1,
                })
              } // Handle page change
              shape="rounded"
              variant="outlined"
            />
          </div>

          {/* If allowSearch is true then display the Search Input */}
          {allowSearch && (
            <div className="p-2 w-[300px] rounded-full border border-blue-950 flex items-center space-x-3 bg-white">
              <Search size={20} />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchInput}
                onChange={handleSearchInputChange} // Update input field only
                className={"bg-transparent w-full outline-none"}
                onKeyDown={handleSearchKeyDown} // Trigger search on Enter key press
              />
            </div>
          )}
        </div>

        {/* DataGrid component */}
        <div style={{ height: "100%", width: "100%" }}>
          <StripedDataGrid
            disableRowSelectionOnClick={true}
            rows={rows}
            columns={columns}
            paginationMode="server" // Enable server-side pagination
            loading={loading}
            rowCount={totalCount} // Total number of rows (from response.meta.total)
            paginationModel={paginationModel} // Current pagination model
            onPaginationModelChange={handlePaginationModelChange} // Pagination change handler
            pageSizeOptions={pageSizeOptions} // Options for per page
            checkboxSelection={checkboxSelection}
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

export default DynamicDataGrid;
