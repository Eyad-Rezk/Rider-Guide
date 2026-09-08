import express from "express";
const port = 3000;
const app = express();
import bikesRouter from "./routes/bikes";
import "./config/db";
import cors from "cors";
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:8080"] // Replace with your frontend URL
}));
app.use("/bikes", bikesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});