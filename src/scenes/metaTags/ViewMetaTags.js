import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, useTheme, Button, Typography, CircularProgress} from "@mui/material";
import { API_URLS } from "../../apiConfig";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ViewMetaTags = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  // const { id } = useParams();
  // const navigate = useNavigate();

  // const handleEditClick = (row) => {
  //   console.log("Edit clicked for row:", row);
  // };
  const [loading, setLoading] = useState({});

  const showSuccessToast = (message) => {
    toast.success(message);
  };

  const showErrorToast = (message) => {
    toast.error(message);
  };
  

  const handleDelClick = async ({ _id }) => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, [_id]: true }));
  
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await Axios.delete(
        `${API_URLS}/admin/delete-meta-tags/${_id}`,
        config
      );
  
      if (response.status === 200) {
        setData((prevData) => prevData.filter((item) => item._id !== _id));
        console.log(`Deleted Meta Tag with ID ${_id}`);
        showSuccessToast("Meta Tag deleted successfully"); // Show success toast
      } else {
        console.error(`Failed to delete Meta Tag with ID ${_id}`);
        showErrorToast("Failed to delete Meta Tag"); // Show error toast
      }
    } catch (error) {
      console.error("Error deleting Meta Tag with ID", error);
      showErrorToast("An error occurred while deleting the Meta Tag"); // Show error toast
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [_id]: false }));
    }
  };
  
  
  

  const fetchData = async () => {
    try {
      const response = await Axios.get(`${API_URLS}/admin/view-meta-tags`);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "description", flex: 1 },
    { field: "keywords", headerName: "keywords", flex: 1 },

    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Button
    //       variant="outlined"
    //       color="warning"
    //       startIcon={<EditIcon />}
    //       onClick={() => handleEditClick(params.row)}
    //     >
    //       <Link
    //         to={`/green-menu/edit/${params.row._id}?title=${encodeURIComponent(
    //           params.row.title
    //         )}`}
    //       >
    //         Edit
    //       </Link>
    //     </Button>
    //   ),
    // },
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
        disabled={loading[params.row._id]}
      >
        {loading[params.row._id] ? (
          <CircularProgress size={24} color="primary" />
        ) : (
          "Delete"
        )}
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
      <Header title={"View Meta Tags"} subtitle={"View Meta Tags"} />
      <Typography variant="body2" color="textSecondary">
        Only 2 items will show in User portal
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

export default ViewMetaTags;
