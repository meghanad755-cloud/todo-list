require('dotenv').config();
const express = require('express');
const RunServer = require("./database/Connection");
const cors = require('cors');
const todoRouter = require('./routes/TodoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ enable CORS globally first
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ body parser
app.use(express.json());



// ✅ connect DB
RunServer();

// ✅ routes
app.use('/todolist', todoRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} port`);
});
