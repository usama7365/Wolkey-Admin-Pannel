import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, useTheme, Button, Typography, CircularProgress } from "@mui/material";
import { API_URLS } from "../../apiConfig";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ViewOrangeNav = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState({}); // Object to store loading state for each delete button

  // const { id } = useParams();
  // const navigate = useNavigate();


  const showSuccessToast = (message) => {
    toast.success(message);
  };
  
  const showErrorToast = (message) => {
    toast.error(message);
  };
  

  const handleEditClick = (row) => {
    console.log("Edit clicked for row:", row);
  };

  const handleDelClick = async ({ _id }) => {
    try {
      // Set loading state for the clicked delete button
      setDeleteLoading((prevLoading) => ({ ...prevLoading, [_id]: true }));
  
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await Axios.delete(
        `${API_URLS}/admin/orange-menu/${_id}`,
        config
      );
      if (response.status === 200) {
        // Display a success toast when item is deleted
        showSuccessToast(`Deleted item successfully`);
        setData((prevData) => prevData.filter((item) => item._id !== _id));
      } else {
        showErrorToast(`Failed to delete item `);
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
  
  

  const fetchData = async () => {
    try {
      const response = await Axios.get(`${API_URLS}/admin/orange-menu`);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
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
          <Link
            to={`/orange-menu/edit/${params.row._id}?title=${encodeURIComponent(
              params.row.title
            )}`}
          >
            Edit
          </Link>
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

  useEffect(() => {
    fetchData();
  }, []);

  const getRowId = (row) => row._id;

  return (
    <Box m={"20px"}>
      <Header
        title={"Orange Navbar"}
        subtitle={"View Items in Orange Navbar."}
      />
        <Typography variant="body2" color="textSecondary">
        Only 7 items show in User portal
      </Typography>
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

export default ViewOrangeNav;
