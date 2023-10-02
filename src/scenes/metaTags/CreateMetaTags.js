import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { API_URLS } from "../../apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateMetaTags = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title || !description || !keywords) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const { token } = JSON.parse(localStorage.getItem("admin") || "{}");
      const config = {
        headers: {
          "x-auth-token": `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${API_URLS}/admin/create-meta-tags`,
        {
          title: title,
          description: description,
          keywords: keywords,
        },
        config
      );

      if (response.status === 200) {
        toast.success("Meta Tags created successfully");
        // Handle success or navigate to a different page.
      } else {
        const errorMessage =
          response.data && response.data.error
            ? response.data.error
            : "Failed to create Meta Tags";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : "An error occurred while creating Meta Tags";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box m={"20px"}>
      <Header title={"Create Meta Tags"} subtitle={"Create Meta Tags for SEO"} />
      <Paper elevation={3} sx={{ padding: 2 }}>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Title:</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Enter Title for Meta Tags"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Description:</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Enter Description for Meta Tags"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Keywords:</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    placeholder="Enter Keywords for Meta Tags"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} align="right">
                  {error && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}
                  <Button
                    type="button"
                    onClick={handleCreate}
                    variant="contained"
                    color="secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Create Meta Tags"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} />
    </Box>
  );
};

export default CreateMetaTags;
