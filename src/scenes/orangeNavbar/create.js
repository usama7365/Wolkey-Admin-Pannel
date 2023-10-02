import React, {useState} from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { API_URLS } from "../../apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const initialValues = {
  items: "",
};

const CreateOrangeForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [loading, setLoading] = useState(false);

  const showSuccessToast = (message) => {
    toast.success(message);
  };
  
  const showErrorToast = (message) => {
    toast.error(message);
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
  
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${API_URLS}/admin/orange-menu`,
        {
          title: values.items,
        },
        config
      );
  
      if (response.status === 201) {
        showSuccessToast("Item created successfully");
        console.log(response);
      } else {
        showErrorToast("Failed to create item");
        console.error("Failed to create item:", response);
      }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
        showErrorToast(error.response.data.error);
      }
    } finally {
      setLoading(false); 
    }
  };
  
  
  

  return (
    <Box m={"20px"}>
      <Header title={"Orange Navbar"} subtitle={"Create a new item in Orange Navbar."} />
      <Typography variant="body2" color="textSecondary">
        Only 7 items show in User portal
      </Typography>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Create Items"
                name="items"
                sx={{ gridColumn: "span 4" }}
                onChange={handleChange}
                value={values.items}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
  <Button
    type="submit"
    color="secondary"
    variant="contained"
    disabled={loading} 
  >
    {loading ? <CircularProgress size={24} color="primary" /> : "Create New Items"}
  </Button>
</Box>

          </form>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} />

    </Box>
  );
};

export default CreateOrangeForm;
