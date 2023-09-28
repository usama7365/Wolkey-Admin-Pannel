import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Box, useTheme, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URLS } from "../../apiConfig";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

const ViewAgency = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);

    const handleDelClick = async ({ _id }) => {
        try {
          const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
          const config = {
            headers: {
              "x-auth-token": `Bearer ${token}`,
            },
          };
          const response = await axios.delete(
            `${API_URLS}/admin/agency-menu/${_id}`,
            config
          );
          if (response.status === 200) {
            setData((prevData) => prevData.filter((item) => item._id !== _id));
            console.log(`Deleted item with ID ${_id}`);
          } else {
            console.error(`Failed to delete item with ID ${_id}`);
          }
        } catch (error) {
          console.error("Error deleting item with ID", error);
        }
      };
    const handleEditClick=()=>[
        console.log("Edit")
    ]
    const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URLS}/admin/agency-menu`);
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
              startIcon={<DeleteIcon />} // Use the EditIcon as the start icon
              onClick={() => handleDelClick(params.row)} // Handle the edit action here
            >
              Delete
            </Button>
          ),
        },
      ];
      const getRowId = (row) => row._id;
    

  return (
    <Box m={"20px"}>
      <Header title={"View Agency Items"} subtitle={"View Agency Items."} />
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
    </Box>
  )
}

export default ViewAgency
