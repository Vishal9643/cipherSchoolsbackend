import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/User.js";
import videoRoutes from "./routes/Video.js";
import commentRoutes from "./routes/Comment.js";
import authRoutes from "./routes/Auth.js";
const PORT = process.env.PORT || 8000;

const app = express();

dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

app.listen(PORT, () => {
  connect();
  console.log("Connected to server");
});
