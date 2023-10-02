import React, { useEffect, useState } from "react";
import { Box, useTheme, Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Axios from "axios";
import { API_URLS } from "../../apiConfig";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';

const DelUser = () => {
  const { id } = useParams();
  console.log(id, "id");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isLoadingMap, setIsLoadingMap] = useState({});



  const fetchData = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await Axios.get(`${API_URLS}/admin/user`, config);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRowId = (row) => row._id;

  const handleDeleteClick = async (userId, isActive) => {
    console.log("Delete clicked for row:", userId);
    try {
      setIsLoadingMap((prev) => ({ ...prev, [userId]: true })); // Start loading for this user

      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${API_URLS}/admin/user/${userId}`,
        { isActive: !isActive },
        config
      );
      console.log(response, "toggle");
      
      // Show a success toast message
      toast.success("User status updated successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
      });
  
      // Assuming you want to refresh the data after toggling
      fetchData();
    } catch (err) {
      console.log(err, "toggle");
  
      // Show an error toast message
      toast.error("Failed to update user status", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
      });
    } finally {
      setIsLoadingMap((prev) => ({ ...prev, [userId]: false })); // Stop loading for this user (whether successful or failed)
    }
  };
  

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "profileId", headerName: "Profile ID", flex: 1 },
    { field: "displayName", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const isActive = params.value;
        return isActive ? "Active" : "Inactive";
      },
    },
    {
      field: "toggleStatus",
      headerName: "Toggle Status",
      renderCell: (params) => {
        const isActive = params.row.isActive;
        return (
          <Button
          variant="outlined"
          color={isActive ? "error" : "warning"}
          startIcon={isActive ? <PersonOffIcon /> : <PersonIcon />}
          onClick={() => handleDeleteClick(params.row._id, isActive)}
          disabled={isLoadingMap[params.row._id]} // Disable the button when loading for this user
        >
          {isLoadingMap[params.row._id] ? (
            <CircularProgress size={24} color="secondary" />
          ) : isActive ? (
            "Disable"
          ) : (
            "Enable"
          )}
        </Button>
        
        
        );
      },
    },
  ];

  return (
    <Box m={"20px"}>
      <Header title={"Users"} subtitle={"Activate-DeActivate User."} />
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

export default DelUser;
