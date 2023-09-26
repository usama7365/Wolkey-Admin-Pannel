import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { API_URLS } from "../../apiConfig";

const Create = () => {
  const [title, setTitle] = useState(""); // State to store the input values
  const [features, setFeatures] = useState("");
  const [buttons, setButtons] = useState("");

  const handleCreate = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${API_URLS}/admin/teacher-menu`,
        {
          title: title,
          features: features,
          buttons: buttons,
        },
        config
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box m={"20px"}>
      <Header title={"Teacher"} subtitle={"Create a new item Orange Navbar."} />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update state when input changes
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Features"
        sx={{ mt: 2 }}
        value={features}
        onChange={(e) => setFeatures(e.target.value)} // Update state when input changes
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Buttons"
        sx={{ mt: 2 }}
        value={buttons}
        onChange={(e) => setButtons(e.target.value)} // Update state when input changes
      />
      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          type="button"
          onClick={handleCreate}
          color="secondary"
          variant="contained"
        >
          Create New Items
        </Button>
      </Box>
    </Box>
  );
};

export default Create;
