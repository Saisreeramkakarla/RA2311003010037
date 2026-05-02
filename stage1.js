const axios = require("axios");

// 🔴 YOUR LATEST TOKEN (ALREADY FILLED)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWlzcmVlcmFta2FrYXJsYTIwMDZAZ21haWwuY29tIiwiZXhwIjoxNzc3NzAwODUzLCJpYXQiOjE3Nzc2OTk5NTMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiZjdjNTc0NC01YmUyLTQ4YjktYTdlMC1jNTBlMWY4YjJlZjEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzcmVlcmFtIiwic3ViIjoiYjY4YzNiNjYtZmM4YS00NzQwLTg4YTgtNzNkNTQ3NDk4MzRjIn0sImVtYWlsIjoic2Fpc3JlZXJhbWtha2FybGEyMDA2QGdtYWlsLmNvbSIsIm5hbWUiOiJzcmVlcmFtIiwicm9sbE5vIjoicmEyMzExMDAzMDEwMDM3IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYjY4YzNiNjYtZmM4YS00NzQwLTg4YTgtNzNkNTQ3NDk4MzRjIiwiY2xpZW50U2VjcmV0Ijoid1BQVXBhVWFFcWVieEZLUSJ9.-Ruv3laQ4BtrzvuNTq2liW1TbuALHznc3iYncfmNIqA";

// Priority mapping
const priority = {
  Placement: 3,
  Result: 2,
  Event: 1
};

// Main function
async function main() {
  try {
    console.log("Fetching notifications...\n");

    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    const notifications = response.data.notifications;

    // Sort logic
    notifications.sort((a, b) => {
      if (priority[b.Type] !== priority[a.Type]) {
        return priority[b.Type] - priority[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = notifications.slice(0, 10);

    console.log("=== TOP 10 NOTIFICATIONS ===\n");
    console.log(top10);

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
  }
}

main();