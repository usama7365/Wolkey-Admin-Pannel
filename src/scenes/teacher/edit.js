import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { API_URLS } from "../../apiConfig";
import { useParams } from "react-router-dom";

const EditTeacher = () => {
  const { id } = useParams();
  console.log(id, "id");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Initialize state to store the teacher data
  const [teacherData, setTeacherData] = useState({
    title: "",
    features: [],
    buttons: "",
  });

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
        const config = {
          headers: {
            "x-auth-token": `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${API_URLS}/admin/teacher-menu/${id}`,
          config
        );
        console.log("Response from API:", response);

        // Set the teacher data from the API response
        setTeacherData(response.data);

      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    fetchTeacherData();
  }, [id]);

  const handleFormSubmit = async (values) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${API_URLS}/admin/teacher-menu/${id}`,
        values,
        config
      );

      console.log("Response from PUT request:", response);
      console.log("Updated title:", values.title);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m={"20px"}>
      <Header title={"Teacher"} subtitle={"Edit Teacher."} />
   

<Formik initialValues={teacherData} onSubmit={handleFormSubmit}>
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
          label="Title"
          name="title"
          sx={{ gridColumn: "span 4" }}
          onChange={handleChange}
          value={values.title}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Buttons"
          name="buttons"
          sx={{ gridColumn: "span 4" }}
          onChange={handleChange}
          value={values.buttons}
        />
        {values.features.map((feature, index) => (
          <TextField
            key={index}
            fullWidth
            variant="filled"
            type="text"
            label={`Feature ${index + 1}`}
            name={`features[${index}]`}
            sx={{ gridColumn: "span 4" }}
            onChange={handleChange}
            value={feature}
          />
        ))}
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          Save Changes
        </Button>
      </Box>
    </form>
  )}
</Formik>



    
    </Box>
  );
};

export default EditTeacher;
