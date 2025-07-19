import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import discussionRoutes from "./routes/discussions.route.js"
import { connectDB } from "./lib/connectDB.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5100;


app.use(
  cors({
    origin: process.env.NODE_ENV === "development" ? "http://localhost:3002" : "https://voxance.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Define your routes here
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRoutes);
app.use("/api/discussion", discussionRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
