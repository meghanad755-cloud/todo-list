require('dotenv').config();
const express = require('express');
const RunServer = require("./database/Connection");
const cors = require('cors');
const todoRouter = require('./routes/TodoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Correct CORS setup for both localhost and hosted frontend
app.use(cors({
  origin: [
    "http://localhost:5173",                // local dev
    "https://todo-list-1-frntend.onrender.com" // deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ Connect to MongoDB
RunServer();

// ✅ Routes
app.use('/todolist', todoRouter);

app.get("/", (req, res) => {
  res.send("✅ Backend is running fine!");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
