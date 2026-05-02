const axios = require("axios");

// 🔴 YOUR TOKEN (ALREADY FILLED)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWlzcmVlcmFta2FrYXJsYTIwMDZAZ21haWwuY29tIiwiZXhwIjoxNzc3NzAwMDEyLCJpYXQiOjE3Nzc2OTkxMTIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI0NTdhMDQzMi01NzI5LTQ5MzUtYmQ4Yi1iZDBlMTIyMTE1YTUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzcmVlcmFtIiwic3ViIjoiYjY4YzNiNjYtZmM4YS00NzQwLTg4YTgtNzNkNTQ3NDk4MzRjIn0sImVtYWlsIjoic2Fpc3JlZXJhbWtha2FybGEyMDA2QGdtYWlsLmNvbSIsIm5hbWUiOiJzcmVlcmFtIiwicm9sbE5vIjoicmEyMzExMDAzMDEwMDM3IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYjY4YzNiNjYtZmM4YS00NzQwLTg4YTgtNzNkNTQ3NDk4MzRjIiwiY2xpZW50U2VjcmV0Ijoid1BQVXBhVWFFcWVieEZLUSJ9.-Z3fNztfbPhiFmp3kOggau0xo7I8wiLNHNXZ0ULeBtA";

// Logging function
async function Log(stack, level, pkg, message) {
  try {
    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  } catch (err) {
    console.log("Log Error:", err.response?.data || err.message);
  }
}

// Fetch notifications
async function getNotifications() {
  try {
    await Log("backend", "info", "handler", "Fetching notifications");

    const res = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return res.data.notifications;
  } catch (err) {
    await Log("backend", "error", "handler", "Fetch failed");
    console.log(err.response?.data || err.message);
  }
}

// Priority logic
function getPriority(type) {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
}

// Main function
async function main() {
  console.log("Fetching notifications...\n");

  const data = await getNotifications();
  if (!data) return;

  const sorted = data.sort((a, b) => {
    const p1 = getPriority(a.Type);
    const p2 = getPriority(b.Type);

    if (p1 !== p2) return p2 - p1;

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  const top10 = sorted.slice(0, 10);

  console.log("===== TOP 10 NOTIFICATIONS =====\n");
  console.log(top10);

  await Log("backend", "info", "handler", "Top 10 displayed");
}

main();