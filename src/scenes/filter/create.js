import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { API_URLS } from "../../apiConfig";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


const CreateFilter = () => {
  const [title, setTitle] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState(""); // Track selected checkbox
  const [conditionalInputValue, setConditionalInputValue] = useState("");
  const [preview, setPreview] = useState([]);
  const [dropdownValues, setDropdownValues] = useState([]);
  const [showCheckboxError, setShowCheckboxError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [firstInputError, setFirstInputError] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setSelectedCheckbox(event.target.name);
    setShowCheckboxError(false);
    setInputError(false); // Clear input error
  };

  const handleCreate = async () => {
    if (title.trim() === "") {
      setFirstInputError(true);
      setShowCheckboxError(false); // Clear checkbox error
      setInputError(false); // Clear input error
      return;
    }

    if (selectedCheckbox === "") {
      // No checkbox selected, show an error message
      setShowCheckboxError(true);
      setInputError(false); // Clear input error
      return;
    }

    if (selectedCheckbox === "Dropdown" && dropdownValues.length === 0) {
      setInputError(true);
      setFirstInputError(false);
      setShowCheckboxError(false);
      return;
    }

    try {
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };

      let requestData = {
        title,
        inputType: selectedCheckbox === "Dropdown" ? "dropdown" : "text",
      };
      if (selectedCheckbox === "Dropdown") {
        requestData.dropdownValues = dropdownValues;
      }

      // Send POST request to the API
      const response = await axios.post(
        `${API_URLS}/admin/filter`,
        requestData,
        config
      );

      console.log(response);
      setTitle(""); // Clear title input
      setConditionalInputValue(""); // Clear conditional input
      setDropdownValues([]);
      setPreview([...preview, title]);
      setInputError(false);
      setFirstInputError(false);
    } catch (err) {
      console.error("Error creating filter:", err);
    }
  };

  const handleAddConditionalInputToPreview = () => {
    if (conditionalInputValue.trim() !== "") {
      // Append the new value to dropdownValues
      const updatedDropdownValues = [...dropdownValues, conditionalInputValue];
      setDropdownValues(updatedDropdownValues);
      setPreview([...preview, conditionalInputValue]);
      setConditionalInputValue(""); // Clear conditional input
      setInputError(false);
      setFirstInputError(false);
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedPreview = preview.filter(
      (_, index) => index !== indexToRemove
    );
    setPreview(updatedPreview);
  };

  return (
    <Box m={"20px"}>
      <Header title={"Filters"} subtitle={"Create filters for profile."} />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Filter Title"
      />
      {firstInputError && (
        <div style={{ color: "red", margin: "10px 0" }}>
          Please enter a value for the first input.
        </div>
      )}
      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          type="button"
          onClick={handleCreate}
          color="secondary"
          variant="contained"
        >
          Create
        </Button>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedCheckbox === "Dropdown"}
            onChange={handleCheckboxChange}
            name="Dropdown"
            // color="primary"
          />
        }
        label="Dropdown"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedCheckbox === "Input"}
            onChange={handleCheckboxChange}
            name="Input"
            // color="primary"
          />
        }
        label="Input"
      />
      {showCheckboxError && (
        <div style={{ color: "red", margin: "10px 0" }}>
          Please select one of the checkboxes.
        </div>
      )}
      {selectedCheckbox === "Dropdown" && (
        <>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Dropdown Value"
            value={conditionalInputValue}
            onChange={(e) => setConditionalInputValue(e.target.value)}
            placeholder="Enter a dropdown value"
          />
          {selectedCheckbox === "Dropdown" && inputError && (
            <div style={{ color: "red", margin: "10px 0" }}>
              Please enter a dropdown value.
            </div>
          )}

          <IconButton onClick={handleAddConditionalInputToPreview}>
            <AddIcon />
          </IconButton>
          <List>
            {preview.map((item, index) => (
              <ListItem key={index}>
                {item}
                <IconButton
                  onClick={() => handleRemoveItem(index)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default CreateFilter;
