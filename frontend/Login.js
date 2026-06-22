import React, { useState } from "react";
import { loginUser } from "./services/api";

import {
  Container, TextField, Button, Card, CardContent,
  Typography, Box, CircularProgress
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";

function Login({ setToken, goToRegister }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {

    if (loading) return;

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    setLoading(true);

    loginUser({
      username: username.trim(),
      password: password.trim()
    })
      .then(res => {
        const token = res.data;
        localStorage.setItem("token", token);
        setToken(token);
      })
      .catch(err => {
        alert(err?.response?.data || "Invalid credentials");
      })
      .finally(() => setLoading(false));
  };

  // 🔥 Enter key support
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card sx={{ padding: 4, width: "100%", borderRadius: 3 }}>
          <CardContent>

            <Box textAlign="center" mb={2}>
              <LockIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h5" fontWeight="bold">
                Login
              </Typography>
              <Typography color="text.secondary">
                Welcome back to Auction System
              </Typography>
            </Box>

            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 2, padding: 1 }}
              onClick={handleLogin}
              disabled={loading || !username || !password}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>

            {/* 🔥 Register Button */}
            <Button
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={goToRegister}
            >
              New user? Register
            </Button>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;