import React, { useEffect, useState } from "react";
import { Box, Button, TextField,CircularProgress } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { API_URLS } from "../../apiConfig";
import { useParams, useLocation } from "react-router-dom";
// import {Link} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const EditGreenNav = () => {
  const { id } = useParams(); 
  console.log(id, "params");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTitle = queryParams.get("title");

  const [title, setTitle] = useState(initialTitle);
  const [loading, setLoading] = useState(false);


  const handleFormSubmit = async (values) => {
    try {
      setLoading(true); // Set loading state to true
  
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${API_URLS}/admin/green-menu/${id}`,
        {
          title: values.items,
        },
        config
      );
  
      if (response.status === 200) {
        toast.success("Item updated successfully");
        console.log("Response from PUT request:", response);
        console.log("Updated title:", values.items);
      } else {
        toast.error("Failed to update item");
        console.error("Failed to update item:", response);
      }
    } catch (error) {
        } finally {
      setLoading(false); // Set loading state to false after API request is completed
    }
  };
  
  

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  return (
    <Box m={"20px"}>
      <Header
        title={"Green Navbar"}
        subtitle={"Edit an item in Green Navbar."}
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ items: title || "" }} 
      >
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Edit Item"
                name="items"
                sx={{ gridColumn: "span 4" }}
                onChange={handleChange}
                value={values.items}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" disabled={loading}>
  {loading ? <CircularProgress size={24} color="primary" /> : "Save Changes"}
</Button>

            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} />

    </Box>
  );
};
export default EditGreenNav;
