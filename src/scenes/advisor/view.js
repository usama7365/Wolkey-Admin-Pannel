import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Box, useTheme, Button,CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URLS } from "../../apiConfig";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAdvisor = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState({}); // Object to store loading state for each delete button


    const showSuccessToast = (message) => {
      toast.success(message);
    };
    
    const showErrorToast = (message) => {
      toast.error(message);
    };

    const handleDelClick = async ({ _id }) => {
        try {
          setDeleteLoading((prevLoading) => ({ ...prevLoading, [_id]: true }));

          const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
          const config = {
            headers: {
              "x-auth-token": `Bearer ${token}`,
            },
          };
          const response = await axios.delete(
            `${API_URLS}/admin/advisory-menu/${_id}`,
            config
          );
          if (response.status === 200) {
            // Display a success toast when item is deleted
            showSuccessToast(`Deleted item successfully`);
            setData((prevData) => prevData.filter((item) => item._id !== _id));
          } else {
            showErrorToast(`Failed to delete item with ID ${_id}`);
          }
        } catch (error) {
          console.error("Error deleting item with ID", error);
          // Display an error toast when there's an error
          showErrorToast(`Error deleting item `);
        } finally {
          // Reset loading state for the clicked delete button
          setDeleteLoading((prevLoading) => ({ ...prevLoading, [_id]: false }));
        }
      };


    const handleEditClick=()=>[
        console.log("Edit")
    ]
    const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URLS}/admin/advisory-menu`);
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
        { field: "title", headerName: "Title", flex: 1 },
        { field: "features", headerName: "Features", flex: 1 },
        { field: "buttons", headerName: "Buttons", flex: 1 },
        {
          field: "edit",
          headerName: "Edit",
          flex: 1,
          renderCell: (params) => (
            <Button
              variant="outlined"
              color="warning"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick(params.row)}
            >
              {/* <Link
                to={`/green-menu/edit/${params.row._id}?title=${encodeURIComponent(
                  params.row.title
                )}`}
              >
                Edit
              </Link> */}
            </Button>
          ),
        },
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
        disabled={deleteLoading[params.row._id]} // Disable the button when loading
      >
        {deleteLoading[params.row._id] ? <CircularProgress size={24} color="secondary" /> : "Delete"}
      </Button>
          ),
        },
      ];
      const getRowId = (row) => row._id;
    

  return (
    <Box m={"20px"}>
      <Header title={"View Advisor Items"} subtitle={"View Advisor Items."} />
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
  )
}

export default ViewAdvisor
