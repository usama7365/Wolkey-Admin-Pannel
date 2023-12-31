import React, {useEffect, useState} from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Axios from "axios";
import { API_URLS } from "../../apiConfig";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

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
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    // { field: "aboutUs", headerName: "About Us", flex: 1 },
    { field: "Nationality", headerName: "Nationality", flex: 1 },
    { field: "education", headerName: "Education", flex: 1 },
    { field: "specialityDegree", headerName: "Speciality Degree", flex: 1 },
    // { field: "Experience", headerName: "Experience", flex: 1 },
    // { field: "createdAt", headerName: "Created At", flex: 1 },
    // { field: "updatedAt", headerName: "Updated At", flex: 1 },
  ];

  return (
    <Box m={"20px"}>
      <Header title={"TEAM"} subtitle={"Managing the Team Members."} />
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
          <DataGrid
          // checkboxSelection
          rows={data}
          columns={columns}
          getRowId={getRowId} // Provide the custom getRowId function
        />
      </Box>
    </Box>
  );
};

export default Team;
