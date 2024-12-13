import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Pagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Box,
  Typography,
} from "@mui/material";

const DynamicTable = ({
  columns,
  fetchUrl,
  rowsPerPageOptions = [5, 10, 20],
  setLoading,
}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(rowsPerPageOptions[0]);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [meta, setMeta] = useState({});

  // Fetch data dynamically
  const fetchData = async (searchQuery = "") => {
    setLoading(true);
    try {
      const response = await fetchUrl({ page, perPage, search: searchQuery });
      setData(response.data);
      setMeta(response.meta);
      setTotalPages(response.meta.last_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger data fetching on dependency change
  useEffect(() => {
    fetchData(search);
  }, [page, perPage, search]);

  const handlePageChange = (event, value) => setPage(value);

  const handlePerPageChange = (event) => {
    setPerPage(event.target.value);
    setPage(1);
  };

  const handleSearchChange = (event) => setTempSearch(event.target.value);

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(tempSearch.trim());
      setPage(1);
    }
    if (tempSearch.trim() === "") {
      setSearch("");
      setPage(1);
    }
  };

  return (
    <>
      <Box p={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={tempSearch}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            fullWidth
            style={{ marginRight: "1rem" }}
          />
          <FormControl variant="outlined" style={{ minWidth: "150px" }}>
            <InputLabel>Rows per Page</InputLabel>
            <Select
              value={perPage}
              onChange={handlePerPageChange}
              label="Rows per Page"
            >
              {rowsPerPageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                {columns.map((col) => (
                  <TableCell key={col.field}>{col.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row) => (
                  <TableRow key={row.id} hover>
                    {columns.map((col) => (
                      <TableCell key={col.field}>
                        {typeof col.renderCell === "function"
                          ? col.renderCell(row[col.field], row)
                          : row[col.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    py={2}
                  >
                    <Pagination
                      count={totalPages}
                      page={meta.current_page || 1}
                      onChange={handlePageChange}
                      variant="outlined"
                      color="primary"
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <Box mt={2} textAlign="right">
          <Typography variant="body2" color="textSecondary">
            Showing {meta.from || 0} to {meta.to || 0} of {meta.total || 0}{" "}
            results
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DynamicTable;
