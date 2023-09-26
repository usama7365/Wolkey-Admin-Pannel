import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { API_URLS } from "../../apiConfig";
import { useParams, useLocation } from "react-router-dom";

const initialValues = {
  items: "",
};

const EditGreenNav = () => {
  const { id } = useParams(); // Correctly extracts the 'id' from the URL
  console.log(id, "params");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTitle = queryParams.get("title");

  const [title, setTitle] = useState(initialTitle);

  const handleFormSubmit = async (values) => { // Remove the 'id' parameter here
    try {
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${API_URLS}/admin/green-menu/${id}`, // Use 'id' directly in the URL
        {
          title: values.items,
        },
        config
      );

      console.log("Response from PUT request:", response);
      console.log("Updated title:", values.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  return (
    <Box m={"20px"}>
      <Header
        title={"Orange Navbar"}
        subtitle={"Edit an item in Orange Navbar."}
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
              <Button type="submit" color="secondary" variant="contained">
                {/* <Link to='/Orange-menu/view'>
               Save Changes
               </Link> */}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default EditGreenNav;
