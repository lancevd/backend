import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/connectDB.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5100;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000" || "https://voxance.vercel.app",
    credentials: true,
  })
);

// Define your routes here
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
