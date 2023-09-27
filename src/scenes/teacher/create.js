import React, { useState } from "react";
import { Box, TextField, Button, IconButton, List, ListItem, ListItemText } from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { API_URLS } from "../../apiConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Create = () => {
  const [title, setTitle] = useState("");
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [buttons , setButtons] = useState('')
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!title || features.length === 0 || !buttons) {
      setError("Please fill in all fields.");
      return;
    }
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

  const addFeature = () => {
    if (featureInput.trim() !== "") {
      setFeatures([...features, featureInput]);
      setFeatureInput(""); // Clear the input field
    }
  };

  const removeFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
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
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Features"
        sx={{ mt: 2 }}
        value={featureInput} // Use featureInput for the input field value
        onChange={(e) => setFeatureInput(e.target.value)} // Update featureInput state when input changes
        InputProps={{
          endAdornment: (
            <IconButton onClick={addFeature} >
              <AddIcon />
            </IconButton>
          ),
        }}
      />
      <List>
        {features.map((feature, index) => (
          <ListItem key={index}>
            <ListItemText primary={feature} />
            <IconButton onClick={() => removeFeature(index)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Buttons"
        sx={{ mt: 2 }}
        value={buttons}
        onChange={(e) => setButtons(e.target.value)}
      />
         {error && <div style={{ color: "red" }}>{error}</div>}
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
