import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme, Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URLS } from "../../apiConfig";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewFilter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  const handleDelClick = async ({ _id }) => {
    try {
      // Start loading for this specific row
      setLoadingStates((prevState) => ({
        ...prevState,
        [_id]: true,
      }));

      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${API_URLS}/admin/filter/${_id}`,
        config
      );
      if (response.status === 200) {
        setData((prevData) => prevData.filter((item) => item._id !== _id));
        toast.success("Item deleted successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
        });
      } else {
        console.error(`Failed to delete item with ID ${_id}`);
        toast.error("Failed to delete item", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error("Error deleting item with ID", error);
      toast.error("Error deleting item", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
      });
    } finally {
      // Stop loading for this specific row
      setLoadingStates((prevState) => ({
        ...prevState,
        [_id]: false,
      }));
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URLS}/admin/filters`);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "title", headerName: "Filters", flex: 7 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelClick(params.row)}
          disabled={loadingStates[params.row._id] || false} // Disable the button when loading
        >
          {loadingStates[params.row._id] ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            "Delete"
          )}
        </Button>
      ),
    },
  ];

  const getRowId = (row) => row._id;

  return (
    <Box m={"20px"}>
      <Header title={"View Filters"} subtitle={"View and delete Filter Items."} />
      <Box
        m={"10px 0 0 0"}
        height={"70vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={data} columns={columns} getRowId={getRowId} />
      </Box>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} />
    </Box>
  );
};

export default ViewFilter;
