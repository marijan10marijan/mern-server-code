import express from "express";
import cors from "cors";
import router from "./routes/records.js";

const PORT = process.env.PORT || 5050;
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use("/record", router);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
