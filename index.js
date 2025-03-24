import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5100;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Define your routes here
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
