import React, { useState } from "react";
import { registerUser } from "./services/api";

import {
  Container, TextField, Button, Card, CardContent,
  Typography, Box, CircularProgress
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

function Register({ goToLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {

    if (!username || !password) {
      alert("Enter username & password");
      return;
    }

    setLoading(true);

    registerUser({
      username: username.trim(),
      password: password.trim()
    })
      .then(() => {
        alert("Registered successfully!");
        goToLogin();
      })
      .catch(() => alert("Registration failed"))
      .finally(() => setLoading(false));
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card sx={{ padding: 4, width: "100%", borderRadius: 3 }}>
          <CardContent>

            <Box textAlign="center" mb={2}>
              <PersonAddIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h5">Register</Typography>
            </Box>

            <TextField label="Username" fullWidth margin="normal"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />

            <TextField label="Password" type="password" fullWidth margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>

            <Button
              fullWidth
              sx={{ mt: 1 }}
              onClick={goToLogin}
            >
              Already have an account? Login
            </Button>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Register;