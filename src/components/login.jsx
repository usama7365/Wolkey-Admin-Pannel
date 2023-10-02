import React, { useState } from "react";
import { Box, Button, Grid, TextField, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URLS } from "../apiConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Start loading

      const response = await axios.post(`${API_URLS}/admin/login`, {
        email,
        password,
      });
      localStorage.setItem("admin", JSON.stringify(response.data));
      if (response.data.token) {
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
        });

        setTimeout(() => {
          navigate("/Dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log(error, "Apierror");
      toast.error("Login Failed", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
      });
    } finally {
      setIsLoading(false); // Stop loading (whether successful or failed)
    }
  };

  const theme = {
    btn: {
      border: "1px solid green",
      margin: "auto",
      marginTop: "20px",
      padding: "5px 15px",
      color: "white",
    },
    center: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <>
      <Navbar />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
        width="100%"
      >
        <Grid width="400px" container spacing={2}>
          <h1 style={theme.center}>Admin Login</h1>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              onChange={handleEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              type={showPassword ? "text" : "password"}
              label="Password"
              onChange={handlePassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Button onClick={handleLogin} style={theme.btn} disabled={isLoading}>
            {isLoading ?  <CircularProgress style={{color:"#4CCEAC"}} size={24} />  : "Login"}
          </Button>
        </Grid>
      </Box>

      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} />
    </>
  );
};

export default Login;
