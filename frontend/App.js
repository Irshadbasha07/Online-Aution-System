import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";

import {
  getItems, createItem, placeBid, deleteItem
} from "./services/api";

import {
  Container, TextField, Button, Card, CardContent,
  Typography, Grid
} from "@mui/material";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import "./App.css";

// 🔐 Extract role from JWT
function getRoleFromToken(token) {
  try {
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1])).role;
  } catch {
    return null;
  }
}

function App() {

  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [minutes, setMinutes] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(getRoleFromToken(token));
  const [updatedItemId, setUpdatedItemId] = useState(null);

  const [showRegister, setShowRegister] = useState(false);

  const BASE_URL = "http://localhost:8080";

  // 🔄 Load items after login
  useEffect(() => {
    if (token) {
      setRole(getRoleFromToken(token));
      loadItems();
    }
  }, [token]);

  const loadItems = () => {
    getItems(token)
      .then(res => setItems(res.data))
      .catch(() => alert("Failed to load auctions"));
  };

  // ⏱ Timer
  const getRemainingTime = (endTime) => {
    if (!endTime) return "No Timer";

    const diff = new Date(endTime) - new Date();

    if (diff <= 0) return "⛔ Ended";

    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    return `${m}m ${s}s`;
  };

  // 🔁 Refresh timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => [...prev]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ➕ CREATE AUCTION
  const handleCreate = () => {

    if (!title || !price || !minutes) {
      alert("Fill all fields");
      return;
    }

    const date = new Date(Date.now() + minutes * 60000);
    const endTime = date.toLocaleString("sv-SE").replace(" ", "T");

    createItem({
      title,
      description: "New Item",
      startingPrice: Number(price),
      endTime
    }, token)
      .then(() => {
        setTitle("");
        setPrice("");
        setMinutes("");
        loadItems();
      })
      .catch(() => alert("Create failed"));
  };

  // 💰 PLACE BID
  const handleBid = (id, endTime) => {

    if (new Date(endTime) < new Date()) {
      alert("Auction ended!");
      return;
    }

    const amount = prompt("Enter bid amount:");

    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Invalid amount");
      return;
    }

    placeBid(id, { amount: Number(amount) }, token)
      .catch(() => alert("Bid failed"));
  };

  // ❌ DELETE AUCTION
  const handleDelete = (id) => {
    deleteItem(id, token)
      .then(() => loadItems())
      .catch(() => alert("Delete failed"));
  };

  // 🔥 WEBSOCKET (REAL-TIME)
  useEffect(() => {

    if (!token) return;

    const socket = new SockJS(`${BASE_URL}/ws`);

    const stompClient = new Client({
      webSocketFactory: () => socket
    });

    stompClient.onConnect = () => {
      stompClient.subscribe("/topic/bids", (msg) => {

        const updated = JSON.parse(msg.body);

        setItems(prev =>
          prev.map(i => i.id === updated.id ? updated : i)
        );

        setUpdatedItemId(updated.id);

        setTimeout(() => setUpdatedItemId(null), 1500);
      });
    };

    stompClient.activate();

    return () => stompClient.deactivate();

  }, [token]);

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  // 🔐 AUTH UI SWITCH
  if (!token) {
    return showRegister ? (
      <Register goToLogin={() => setShowRegister(false)} />
    ) : (
      <Login
        setToken={setToken}
        goToRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <Container>

      <h1>Online Auction System</h1>

      <Typography>
        Logged in as: <b>{role}</b>
      </Typography>

      <Button color="error" onClick={handleLogout}>
        Logout
      </Button>

      {/* ADMIN PANEL */}
      {role === "ADMIN" && (
        <>
          <h2>Create Auction</h2>

          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            fullWidth
          />

          <TextField
            label="Duration (minutes)"
            value={minutes}
            onChange={e => setMinutes(e.target.value)}
            fullWidth
          />

          <Button onClick={handleCreate} variant="contained" sx={{ mt: 1 }}>
            Create
          </Button>
        </>
      )}

      <h2>Live Auctions</h2>

      <Grid container spacing={2}>
        {items.map(item => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card className={updatedItemId === item.id ? "highlight" : ""}>
              <CardContent>

                <Typography variant="h6">{item.title}</Typography>

                <Typography>
                  ⏱ {getRemainingTime(item.endTime)}
                </Typography>

                <Typography>
                  💰 Current Bid: ₹{item.currentBid}
                </Typography>

                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={() => handleBid(item.id, item.endTime)}
                >
                  Place Bid
                </Button>

                {role === "ADMIN" && (
                  <Button
                    color="error"
                    sx={{ mt: 1, ml: 1 }}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                )}

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}

export default App;