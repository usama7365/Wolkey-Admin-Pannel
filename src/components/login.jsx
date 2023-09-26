import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { API_URLS } from "../apiConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URLS}/admin/login`, {
        email,
        password,
      });
      localStorage.setItem("admin", JSON.stringify(response.data));
      if (response.data.token) {
        navigate("/Dashboard");
      }
    } catch (error) {
      console.log(error, "Apierror");
    }
  };

  const theme = {
    btn: {
      border: "1px solid green",
      margin: "auto",
      marginTop: "20px",
      padding:"5px 15px",
      color:"white"
    },
    center: {
      width:"100%",
      display:"flex",
      justifyContent:"center"
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
              type="text"
              label="Password"
              onChange={handlePassword}
            />
          </Grid>
          <Button onClick={handleLogin} style={theme.btn}>
            Login
          </Button>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
