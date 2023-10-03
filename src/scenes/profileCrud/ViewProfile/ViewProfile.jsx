import React, { useEffect, useState } from "react";
import { Box, useTheme, Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import Axios from "axios";
import { API_URLS } from "../../../apiConfig";
import {  useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const Team = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isLoadingDeleteMap, setIsLoadingDeleteMap] = useState({});


  const fetchData = async () => {
    try {
      const response = await Axios.get(`${API_URLS}/all-profiles`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRowId = (row) => row._id;

  const navigateToUserProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };



  const handleDeleteClick = async ({ _id }) => {
    try {
      // Set loading state for the specific profile to true
      setIsLoadingDeleteMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [_id]: true,
      }));

      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${API_URLS}/admin/delete-profile/${_id}`,
        config
      );

      if (response.status === 200) {
        // Show a success toast message
        toast.success("Profile Deleted Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
        });

        // Remove the deleted profile from the data state
        setData((prevData) => prevData.filter((profile) => profile._id !== _id));
      } else {
        // Show an error toast message if the deletion fails
        toast.error("Failed to Delete Profile", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
        });
      }
    } catch (err) {
      console.log(err, "delete");
    } finally {
      // Set loading state for the specific profile to false
      setIsLoadingDeleteMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [_id]: false,
      }));
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => navigateToUserProfile(params.row._id)}
        >
          {params.value}
        </div>
      ),
    },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "Nationality", headerName: "Nationality", flex: 1 },
    { field: "education", headerName: "Education", flex: 1 },
    { field: "specialityDegree", headerName: "Speciality Degree", flex: 1 },

    {
      field: "delete",
      headerName: "Delete Profiles",
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDeleteClick(params.row)}
          startIcon={<DeleteIcon />}
          // Use the loading state for the specific profile
          disabled={isLoadingDeleteMap[params.row._id]}
        >
          {isLoadingDeleteMap[params.row._id] ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            "Delete"
          )}
        </Button>
      ),
    },
  ];

  return (
    <Box m={"20px"}>
      <Header title={"User Profiles"} subtitle={"View & Delete User Profiles."} />
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

export default Team;
