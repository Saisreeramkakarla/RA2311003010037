const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

// ✅ YOUR TOKEN (single line, no breaks)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWlzcmVlcmFta2FrYXJsYTIwMDZAZ21haWwuY29tIiwiZXhwIjoxNzc3NzAzNjg5LCJpYXQiOjE3Nzc3MDI3ODksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJhYTliNzdiNS1hYzBkLTQwMGEtOWY3Mi02MmRlOTM0NDJhMjQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzcmVlcmFtIiwic3ViIjoiYjY4YzNiNjYtZmM4YS00NzQwLTg4YTgtNzNkNTQ3NDk4MzRjIn0sImVtYWlsIjoic2Fpc3JlZXJhbWtha2FybGEyMDA2QGdtYWlsLmNvbSIsIm5hbWUiOiJzcmVlcmFtIiwicm9sbE5vIjoicmEyMzExMDAzMDEwMDM3IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYjY4YzNiNjYtZmM4YS00NzQwLTg4YTgtNzNkNTQ3NDk4MzRjIiwiY2xpZW50U2VjcmV0Ijoid1BQVXBhVWFFcWVieEZLUSJ9.38TJ0DEXlKkZxMvW5iEyf9iYkvtQtHpD6cwVfBzFSAc";

const priority = {
  Placement: 3,
  Result: 2,
  Event: 1
};

app.get("/notifications", async (req, res) => {
  try {
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    let data = response.data.notifications;

    // sort: priority → latest time
    data.sort((a, b) => {
      if (priority[b.Type] !== priority[a.Type]) {
        return priority[b.Type] - priority[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    res.json(data.slice(0, 10));
  } catch (err) {
    console.log("BACKEND ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});